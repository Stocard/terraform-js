import { copy } from 'fs-extra'
import * as assert from 'assert'
import { Terragrunt } from '../../dist/index'
import { createTmpDir, deleteDir } from '../helperFiles/helpers'

describe('Terragrunt getOutputKeys', () => {
  const terragrunt = new Terragrunt()
  let tmpDir
  before(async () => {
    tmpDir = createTmpDir()
    await copy(`${__dirname}/../helperFiles/terragrunt`,  `${tmpDir}`)
  })
  after(async () => {
    deleteDir(tmpDir)
  })
  it('Should return both output keys', async () => {
    const keys = await terragrunt.getOutputKeys(`${tmpDir}/first`)
    assert.deepEqual(keys, ['output_1', 'output_3'])
  })
})
