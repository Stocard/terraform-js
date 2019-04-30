import { copy } from 'fs-extra'
import * as assert from 'assert'
import { Terragrunt } from '../../dist/index'
import { createTmpDir, deleteDir } from '../helperFiles/helpers'

describe('Terragrunt applyAll', () => {
  const terragrunt = new Terragrunt()
  let tmpDir
  before(async () => {
    tmpDir = createTmpDir()
    await copy(`${__dirname}/../helperFiles/terragrunt`, `${tmpDir}`)
  })
  after(async () => {
    deleteDir(tmpDir)
  })
  it('Should apply new outputs and return it', async () => {
    await terragrunt.applyAll(`${tmpDir}`, { silent: true, autoApprove: true })
    const output = await terragrunt.getOutputKeys(`${tmpDir}`, { silent: true })
    assert.deepEqual(output, ['output'])
  })
})
