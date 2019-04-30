import * as fs from 'fs'
import * as assert from 'assert'
import { Terraform } from '../../dist/index'
import { createTmpDir, deleteDir } from '../helperFiles/helpers'

describe('Terraform getOutputKeys', () => {
  const terraform = new Terraform()
  let tmpDir
  before(async () => {
    tmpDir = createTmpDir()
    fs.copyFileSync(`${__dirname}/../helperFiles/getOutputKeys.tfstate`, `${tmpDir}/terraform.tfstate`)
  })
  after(async () => {
    deleteDir(tmpDir)
  })
  it('Should return both output keys', async () => {
    const keys = await terraform.getOutputKeys(`${tmpDir}`)
    assert.deepEqual(keys, ['output_1', 'output_3'])
  })
})
