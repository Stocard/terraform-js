import * as fs from 'fs'
import { Terraform } from '../../dist/index'
import { createTmpDir, deleteDir } from '../helperFiles/helpers'
import { equal } from 'assert'

describe('Terraform plan', () => {
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
    fs.copyFileSync(`${__dirname}/../helperFiles/local.tf`, `${tmpDir}/local.tf`)
    await terraform.init(tmpDir, { silent: true })
    const changes = await terraform.plan(`${tmpDir}`, { silent: true })
    equal(changes.addCount, 1)
    equal(changes.changeCount, 0)
    equal(changes.destroyCount, 0)
  })
})
