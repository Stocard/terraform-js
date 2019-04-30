import * as fs from 'fs'
import * as assert from 'assert'
import { Terraform } from '../../dist/index'
import { createTmpDir, deleteDir } from '../helperFiles/helpers'

describe('Terraform outputValue', () => {
  const terraform = new Terraform()
  let tmpDir
  before(async () => {
    tmpDir = createTmpDir()
    fs.copyFileSync(`${__dirname}/../helperFiles/getOutputKeys.tfstate`, `${tmpDir}/terraform.tfstate`)
  })
  after(async () => {
    deleteDir(tmpDir)
  })
  it('Should return full output of a value', async () => {
    const value = await terraform.outputValue(`${tmpDir}`, 'output_1', { silent: true, simple: false })
    assert.deepEqual(value, {
      sensitive: false,
      type: 'string',
      value: '1'
    })
  })
  it('Should return simple output of a value', async () => {
    const value = await terraform.outputValue(`${tmpDir}`, 'output_1', { silent: true, simple: true })
    assert.deepEqual(value, '1')
  })
})
