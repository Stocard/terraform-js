# JS-Terraform

A TypeScript/JavaScript wrapper around Terraform and Terragrunt. Fully Promise-based.

* [Installation](#installation)
* [Terraform](#terraform)
* [Terragrunt](#terragrunt)

## Installation

```sh
$ npm install js-terraform
```
or

```sh
$ yarn add js-terraform
```

## Terraform

Create a new `Terraform` instance:
```js
const terraform = new Terraform()
```

### Functions

#### `init(path: string, options: ExecuteOptions): Promise<void>`

Executes `terraform init` on the given `path`.

Options: [ExecuteOptions](#ExecuteOptions): `silent` defaults to `true`

#### `plan(path: string, options: ExecuteOptions): Promise<ResourceCounts>`

Executes `terraform plan` on the given `path`. Returns [ResourceCounts](#ResourceCounts).

Options: [ExecuteOptions](#ExecuteOptions): `silent` defaults to `true`

#### `destroy(path: string, options: DestroyOptions): Promise<ResourceCounts>`
Executes `terraform destroy` on the given `path`. Returns [ResourceCounts](#ResourceCounts).

Options: [DestroyOptions](#InteractiveOptions): `silent` defaults to `false`, `autoApprove` defaults to `false`

#### `apply(path: string, options: ApplyOptions): Promise<ResourceCounts>`

Executes `terraform apply` on the given `path`. Returns an `ResourceCounts` object with information how many resources were added, changed or destroyed.

Options: [ApplyOptions](#InteractiveOptions): `silent` defaults to `false`, `autoApprove` defaults to `false`

#### `getOutputKeys(path: string, options: ExecuteOptions) Promise<string[]>`

Executes `terraform output -json` on the given `path` and returns the keys. E.g. when you have two outputs 
  ```hcl
  output "output_1" {
    value = "1"
  }
  output "output_2" {
    value = "2"
  }
  ```

  the function would return `['output_1', 'output_2]`
  
Options: [ExecuteOptions](#ExecuteOptions): `silent` defaults to `true`

#### `outputValue(path: string, value: string, options: OutputOptions) Promise<SimpleOutput | Output>`

Executes `terraform output -json ${value}` on the given `path` and returns the value. E.g. for
  ```hcl
  output "output_1" {
    value = "1"
  }
  ```

  the function would return `{'output_1': 1}` (when `simple: true`) or 

  ```js
  output_1: {
        sensitive: false,
        type: 'string',
        value: '1'
    }
  ```
  when `simple: false`

Options: [OutputOptions](#OutputOptions): `silent` defaults to `true`, `simple` defaults to `true`

#### `outputValue(path: string,options: OutputOptions) Promise<SimpleOutput | Output>`

Executes `terraform output -json` on the given `path` and returns the values. E.g. for
  ```hcl
  output "output_1" {
    value = "1"
  }
  output "output_2" {
    value = "2"
  }
  ```

  the function would return `{'output_1': 1, 'output_2': 2}` (`simple: true`) or 

  ```js
  output_1: {
        sensitive: false,
        type: 'string',
        value: '1'
    },
    output_2: {
        sensitive: false,
        type: 'string',
        value: '3'
    }
  ```

  when `simple: false`

Options: [OutputOptions](#OutputOptions): `silent` defaults to `true`, `simple` defaults to `true`



## Terragrunt

Create a new `Terragrunt` instance:
```js
const terragrunt = new Terragrunt()
```

### `applyAll(path: string, options: ApplyOptions = {}): Promise<void>`

Executes `terragrunt apply` on the given `path`. Returns void.

Options: [ApplyOptions](#InteractiveOptions): `silent` defaults to `false`, `autoApprove` defaults to `false`

### `destroyAll(path: string, options: DestroyOptions = {}): Promise<void>`

Executes `terragrunt destroy` on the given `path`. Returns void.

Options: [DestroyOptions](#InteractiveOptions): `silent` defaults to `false`, `autoApprove` defaults to `false`

### `planAll(path: string, options: ExecuteOptions = {}): Promise<void>`

Executes `terragrunt destroy` on the given `path`. Returns void.

Options: [ExecuteOptions](#ExecuteOptions): `silent` defaults to `false`

### `output`

Same signature and options as the `Terraform.output` function, except that it uses `terragrunt`

### `outputValue`

Same signature and options as the `Terraform.outputValue` function, except that it uses `terragrunt`

### `getOutputKeys`

Same signature and options as the `Terraform.getOutputKeys` function, except that it uses `terragrunt`

## Types

#### ExecuteOptions

```ts
interface ExecuteOptions {
  silent?: boolean
}
```

#### OutputOptions

```ts
interface OutputOptions {
  silent?: boolean
  simple?: boolean
}
```


#### InteractiveOptions

```ts
interface InteractiveOptions {
  autoApprove?: boolean
  silent?: boolean
}
```
`DestroyOptions` and `ApplyOptions` are an alias for `InteractiveOptions`

#### ResourceCounts
```js
type ResourceCounts = {
  addCount: number
  changeCount: number
  destroyCount: number
}
```
Information how many resources are added, changed or destroyed. 

## Silent mode

Many functions have the possibility to be executed in silent mode by passing a `silent` flag in the options object. If `silent: true` no output is passed to any logger nor the output streams (more on that below)! 

The default depends on the function, please read the documentation carefully!

## Custom loggers

There are two different ways of "logging", the `logger` and `outputStreams`

* `logger`: Is used for any `terraform`/`terragrunt` function which does not need any interactive input (`plan`, `output`..). The default logger is `console.log`. You can pass a custom logger by calling `setLogger` for, e.g. writing data to a file. But be careful, `silent` must be `true` when you use custom logger and want to get the output

* `outputStreams` (`out` and `err`): Are used for any `terraform`/`terragrunt` function which needs input by the user (`apply`, `destroy`...) The default streams are `process.stderr` and `process.stdout`
