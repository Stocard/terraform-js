import { copy } from 'fs-extra'
import * as assert from 'assert'
import { Terragrunt } from '../../dist/index'
import { createTmpDir, deleteDir } from '../helperFiles/helpers'

describe('Terragrunt output', () => {
  const terragrunt = new Terragrunt()
  let tmpDir
  before(async () => {
    tmpDir = createTmpDir()
    await copy(`${__dirname}/../helperFiles/terragrunt`,  `${tmpDir}`)
  })
  after(async () => {
    deleteDir(tmpDir)
  })
  it('Should return full output of a directory', async () => {
    const value = await terragrunt.output(`${tmpDir}/first`, { silent: true, simple: false })
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
    const value = await terragrunt.output(`${tmpDir}/first`, { silent: true, simple: true })
    assert.deepEqual(value, { output_1: { value: '1' }, output_3: { value: 3 } })
  })
})
