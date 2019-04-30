import * as fs from 'fs'
import * as assert from 'assert'
import { Terraform } from '../../dist/index'
import { createTmpDir, deleteDir } from '../helperFiles/helpers'

describe('Terraform output', () => {
  const terraform = new Terraform()
  let tmpDir
  before(async () => {
    tmpDir = createTmpDir()
    fs.copyFileSync(`${__dirname}/../helperFiles/getOutputKeys.tfstate`, `${tmpDir}/terraform.tfstate`)
  })
  after(async () => {
    deleteDir(tmpDir)
  })
  it('Should return full output of a directory', async () => {
    const value = await terraform.output(`${tmpDir}`, { silent: true, simple: false })
    assert.deepEqual(value, {
      output_1: {
        sensitive: false,
        type: 'string',
        value: '1'
      },
      output_3: {
        sensitive: false,
        type: 'string',
        value: '3'
      }
    })
  })
  it('Should return simple output of a directory', async () => {
    const value = await terraform.output(`${tmpDir}`, { silent: true, simple: true })
    assert.deepEqual(value, { output_1: '1', output_3: '3' })
  })
})
