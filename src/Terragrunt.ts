import { Base, ApplyOptions, ExecuteOptions, OutputOptions, DestroyOptions } from './Base'
import { SimpleOutputObject, OutputObject, TerraformMultipleOutput, TerraformSingleOutput, SimpleOutput, Output } from './Types'

class Terragrunt extends Base {
  constructor() {
    super('terragrunt', '--terragrunt-non-interactive')
    this.addTriggerWordForInteractiveMode('Are you sure you want to run \'terragrunt apply\' in each folder of the stack described above?')
    this.addTriggerWordForInteractiveMode('Are you sure you want to run \'terragrunt destroy\' in each folder of the stack described above?')
    this.addTriggerWordForInteractiveMode('Are you sure you want to run \'terragrunt plan\' in each folder of the stack described above?')
  }

  public async applyAll(path: string, options: ApplyOptions = {}) {
    await this.executeInteractive('apply-all', path, options)
  }
  public async destroyAll(path: string, options: DestroyOptions = {}) {
    await this.executeInteractive('destroy-all', path, options)
  }
  public async planAll(path: string, options: ExecuteOptions = {}) {
    await this.executeSync(path, 'plan-all', { silent: options.silent || false })
  }

  // public async outputAll(path: string, options: OutputOptions = {}): Promise<OutputObject[] | SimpleOutputObject[]> {
  //   // TODO add output function to filter, e.g. "databases_*"
  //   const parsedOptions = this.parseOutputOptions(options)
  //   const { stdout } = await this.executeSync(path, 'output-all -json', { silent: parsedOptions.silent })
  //   const outputs = <OutputObject[]>this.parseStdoutAsJson(stdout)
  //   if (parsedOptions.simple) {
  //     return outputs.map((output) => {
  //       const keys = Object.keys(output)
  //       const result = {}
  //       keys.forEach((key) => {
  //         result[key] = output[key].value
  //       })
  //       return result
  //     })
  //   }
  //   return outputs
  // }

  public async output(path: string, options: OutputOptions = {}): Promise<SimpleOutputObject | OutputObject> {
    const parsedOptions = this.parseOutputOptions(options)
    const { stdout } = await this.executeSync(path, 'output -json', { silent: parsedOptions.silent })
    const output = <TerraformMultipleOutput>JSON.parse(stdout)
    if (options.simple) {
      const keys = Object.keys(output)
      keys.forEach((key) => {
        delete output[key].sensitive
        delete output[key].type
      })
    }
    return output
  }

  public async outputValue(path: string, value: string, options: OutputOptions = {}): Promise<SimpleOutput | Output> {
    const parsedOptions = this.parseOutputOptions(options)
    const { stdout } = await this.executeSync(path, `output -json ${value}`, { silent: parsedOptions.silent })
    const output = <TerraformSingleOutput>JSON.parse(stdout)
    if (parsedOptions.simple) {
      return output.value
    }
    return output
  }

  public async getOutputKeys(path: string, options: ExecuteOptions = {}): Promise<string[]> {
    const { stdout } = await this.executeSync(path, 'output -json', { silent: options.silent || true })
    const output = JSON.parse(stdout)
    return Object.keys(output)
  }

  // private parseStdoutAsJson(stdoutOutput: string): OutputObject[] {
  //   const withoutWhitespace = stdoutOutput.replace(/\s/gi, '')
  //   const withCommas = withoutWhitespace.replace(/\}\{/gi, '},{').trim()
  //   let json = []
  //   try {
  //     json = JSON.parse(`[${withCommas}]`)
  //   } catch (e) {
  //     console.log('Could not json parse', `[${withCommas}]`)
  //   }
  //   return json
  // }
}

export { Terragrunt }
