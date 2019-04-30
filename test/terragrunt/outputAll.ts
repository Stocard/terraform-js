// import { copy } from 'fs-extra'
// import * as assert from 'assert'
// import { Terragrunt } from '../../dist/index'
// import { createTmpDir, deleteDir } from '../helperFiles/helpers'

// describe.skip('Terragrunt outputAll', () => {
//   const terragrunt = new Terragrunt()
//   let tmpDir
//   before(async () => {
//     tmpDir = createTmpDir()
//     await copy(`${__dirname}/../../terragrunt`, `${tmpDir}`)
//   })
//   after(async () => {
//     deleteDir(tmpDir)
//   })
//   it('Should return all outputs', async () => {
//     const actualOutput = await terragrunt.outputAll(`${tmpDir}`, { silent: true, simple: false })
//     const expectation = [
//       {
//         output:
//         {
//           sensitive: false,
//           type: 'string',
//           value: '/Users/martinwentzel/Documents/Stocard/terragrunt/terragrunt/foo.bar'
//         }
//       },
//       {
//         output_1: { sensitive: false, type: 'string', value: '1' },
//         output_3: { sensitive: false, type: 'string', value: '3' }
//       },
//       { output_3: { sensitive: false, type: 'string', value: '3' } }]
//     assert.deepEqual(actualOutput, expectation)
//   })
//   it('Should return all outputs in a simplified manner', async () => {
//     const actualOutput = await terragrunt.outputAll(`${tmpDir}`, { silent: true, simple: true })
//     const expectation = [
//       {
//         output: '/Users/martinwentzel/Documents/Stocard/terragrunt/terragrunt/foo.bar'
//       },
//       {
//         output_1: '1',
//         output_3: '3'
//       },
//       { output_3: '3' }]
//     assert.deepEqual(actualOutput, expectation)
//   })
// })
