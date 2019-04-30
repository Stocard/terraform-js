import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as rimraf from 'rimraf'

const createTmpDir = () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'terraform-'))
  return tmpDir
}

const deleteDir = (path) => {
  rimraf.sync(path)
}

export { createTmpDir, deleteDir }
