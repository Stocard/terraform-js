import * as fs from 'fs'
import * as assert from 'assert'
import { Terraform } from '../../dist/index'
import { createTmpDir, deleteDir } from '../helperFiles/helpers'

describe('Terraform destroy', () => {
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
  it('Should destroy everything', async () => {
    const changes = await terraform.destroy(`${tmpDir}`, { silent: true, autoApprove: true })
    assert.equal(changes.destroyCount, 0)
    assert.equal(changes.addCount, 0)
    assert.equal(changes.changeCount, 0)
    const output = await terraform.getOutputKeys(`${tmpDir}`, { silent: true })
    assert.deepEqual(output, [])
  })
})
