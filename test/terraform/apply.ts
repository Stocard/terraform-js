import * as fs from 'fs'
import * as assert from 'assert'
import { Terraform } from '../../dist/index'
import { createTmpDir, deleteDir } from '../helperFiles/helpers'

describe('Terraform apply', () => {
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
  it('Should apply new outputs and return it', async () => {
    await terraform.apply(`${tmpDir}`, { silent: true })
    const output = await terraform.getOutputKeys(`${tmpDir}`, { silent: true })
    assert.deepEqual(output, ['output_2'])
  })
  it('Should apply the changes', async () => {
    fs.copyFileSync(`${__dirname}/../helperFiles/local.tf`, `${tmpDir}/local.tf`)
    await terraform.init(tmpDir, { silent: true })
    const changes = await terraform.apply(`${tmpDir}`, { silent: true, autoApprove: true })
    assert.equal(changes.addCount, 1)
    assert.equal(changes.changeCount, 0)
    assert.equal(changes.destroyCount, 0)
  })
})
