import { copy } from 'fs-extra'
import * as assert from 'assert'
import { Terragrunt } from '../../dist/index'
import { createTmpDir, deleteDir } from '../helperFiles/helpers'

describe('Terragrunt outputValue', () => {
  const terragrunt = new Terragrunt()
  let tmpDir
  before(async () => {
    tmpDir = createTmpDir()
    await copy(`${__dirname}/../helperFiles/terragrunt`, `${tmpDir}`)
  })
  after(async () => {
    deleteDir(tmpDir)
  })
  it('Should return full output of a value', async () => {
    const value = await terragrunt.outputValue(`${tmpDir}/first`, 'output_1', { silent: true, simple: false })
    assert.deepEqual(value, {
      sensitive: false,
      type: 'string',
      value: '1'
    })
  })
  it('Should return simple output of a value', async () => {
    const value = await terragrunt.outputValue(`${tmpDir}/first`, 'output_1', { silent: true, simple: true })
    assert.deepEqual(value, '1')
  })
})
