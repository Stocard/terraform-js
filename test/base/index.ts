import { Base } from '../../src/Base'
import * as fs from 'fs'
import * as assert from 'assert'
import { createTmpDir, deleteDir } from '../helperFiles/helpers'
import { Logger } from '../helpers/Logger'

class TempClass extends Base {
  async silentOutput(path: string) {
    await this.executeSync(path, 'output', { silent: true })
  }
  async verboseOutput(path: string) {
    await this.executeSync(path, 'output', { silent: false })
  }
  async silentPlan(path: string) {
    await this.executeInteractive('plan', path, { silent: true })
  }
  async verbosePlan(path: string) {
    await this.executeInteractive('plan', path, { silent: false })
  }
}

describe('Base', () => {
  let logger: Logger
  let tmpDir: string
  before(() => {
    logger = new Logger()
    tmpDir = createTmpDir()
  })
  after(() => {
    deleteDir(tmpDir)
  })
  describe('executeSync', () => {
    let base: TempClass
    before(async () => {
      fs.copyFileSync(`${__dirname}/../helperFiles/getOutputKeys.tfstate`, `${tmpDir}/terraform.tfstate`)
      base = new TempClass('terraform', 'approve')
      base.setLogger(logger.getLogger())
    })
    describe('in silent mode', () => {
      it('Should return both output keys', async () => {
        await base.silentOutput(`${tmpDir}`)
        assert(true)
      })
      it('and return no output', () => {
        assert.equal(logger.accumulatedText.length, 0)
      })
    })
    describe('in non-silent mode', () => {
      before(async () => {
        logger.accumulatedText = ''
      })
      it('Should return both output keys', async () => {
        await base.verboseOutput(`${tmpDir}`)
        assert(true)
      })
      it('and return no output', () => {
        assert.equal(logger.accumulatedText.length, 26)
      })
    })
  })
  describe('executeInteractive', () => {
    let base: TempClass
    before(async () => {
      fs.copyFileSync(`${__dirname}/../helperFiles/getOutputKeys.tfstate`, `${tmpDir}/terraform.tfstate`)
      fs.copyFileSync(`${__dirname}/../helperFiles/output_single.tf`, `${tmpDir}/output.tf`)
      base = new TempClass('terraform', 'approve')
      const { stdout, stderr } = logger.getStdLoggers()
      base.setOutStreams(stdout, stderr)
    })
    describe('in silent mode', () => {
      before(async () => {
        logger.accumulatedStdErrText = ''
        logger.accumulatedStdOutText = ''
      })
      it('Should plan', async () => {
        await base.silentPlan(`${tmpDir}`)
        assert(true)
      })
      it('and return no output', () => {
        assert.equal(logger.accumulatedStdErrText.length, 0)
        assert.equal(logger.accumulatedStdOutText.length, 0)
      })
    })
    describe('in non-silent mode', () => {
      before(async () => {
        logger.accumulatedStdErrText = ''
        logger.accumulatedStdOutText = ''
      })
      it('Should plan', async () => {
        await base.verbosePlan(`${tmpDir}`)
        assert(true)
      })
      it('and return no output', () => {
        assert.equal(logger.accumulatedStdErrText.length, 0)
        assert.equal(logger.accumulatedStdOutText.length, 502)
      })
    })
  })
})
