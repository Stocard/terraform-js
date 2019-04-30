import { copy } from 'fs-extra'
import { Terragrunt } from '../../dist/index'
import { createTmpDir, deleteDir } from '../helperFiles/helpers'

describe('Terragrunt planAll', () => {
  const terragrunt = new Terragrunt()
  let tmpDir
  before(async () => {
    tmpDir = createTmpDir()
    await copy(`${__dirname}/../helperFiles/terragrunt`,  `${tmpDir}`)
  })
  after(async () => {
    deleteDir(tmpDir)
  })
  it('Should plan', async () => {
    await terragrunt.planAll(`${tmpDir}`, { silent: false })
  })
})
