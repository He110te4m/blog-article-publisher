import { resolve } from 'path'
import { sync as glob } from 'glob'
import { Disposable } from 'vscode'
import { filter, map } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import type { CommonJSPlugin, Plugin } from '../../types/plugin'

type PluginModule = Partial<Plugin & CommonJSPlugin>
type RegisterFilterFn = Fn<boolean, [string]>

const defaultFilterFn: RegisterFilterFn = () => true

export async function register(basedir: string, filterFn: RegisterFilterFn = defaultFilterFn) {
  const pluginFiles = glob('*.js', {
    cwd: basedir,
  })

  const plugins: PluginModule[] = pipe(
    pluginFiles,
    filter(filterFn),
    map(importModule(basedir)),
  )

  return Promise.all(pipe(
    plugins,
    map(makePluginRegister()),
  ))
}

function importModule(basedir: string) {
  return (filename: string) => require(resolve(basedir, filename))
}

function makePluginRegister() {
  return (module?: PluginModule) => {
    const moduleRegisterFn = module?.register ?? module?.default?.register
    return typeof moduleRegisterFn === 'function' ? moduleRegisterFn() : Promise.resolve(createEmptyDispose())
  }
}

function createEmptyDispose() {
  return new Disposable(() => {})
}
