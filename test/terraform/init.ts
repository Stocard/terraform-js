import * as fs from 'fs'
import { Terraform } from '../../dist/index'
import { createTmpDir, deleteDir } from '../helperFiles/helpers'
import { Logger } from '../helpers/Logger'
import * as assert from 'assert'

describe('Terraform init', () => {
  const terraform = new Terraform()
  let tmpDir
  before(async () => {
    tmpDir = createTmpDir()
    fs.copyFileSync(`${__dirname}/../helperFiles/getOutputKeys.tfstate`, `${tmpDir}/terraform.tfstate`)
    fs.copyFileSync(`${__dirname}/../helperFiles/output_single.tf`, `${tmpDir}/output.tf`)
  })
  after(async () => {
    deleteDir(tmpDir)
  })
  it('Should plan', async () => {
    await terraform.plan(`${tmpDir}`, { silent: true })
  })
  it('Should plan with changes', async () => {
    const logger = new Logger()
    terraform.setLogger(logger.getLogger())
    fs.copyFileSync(`${__dirname}/../helperFiles/local.tf`, `${tmpDir}/local.tf`)
    await terraform.init(tmpDir, { silent: false })
    assert.ok(logger.accumulatedText.includes('Initializing provider plugins...'))
    assert.ok(logger.accumulatedText.includes('Terraform has been successfully initialized!'))
    await terraform.plan(`${tmpDir}`, { silent: true })
  })
})
