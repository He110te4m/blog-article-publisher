import { resolve } from 'path'
import { sync as glob } from 'glob'
import { Disposable } from 'vscode'
import type { CommonJSPlugin, Plugin } from '../../types/plugin'

export async function register(basedir: string, filter: (filename: string) => boolean = () => true) {
  const plugins: (Plugin & CommonJSPlugin)[] = glob('*.js', {
    cwd: basedir,
  })
    .filter(filter)
    .map(filename => require(resolve(basedir, filename)))

  return Promise.all(plugins.map((module) => {
    const moduleRegisterFn = module?.register || module?.default?.register
    if (typeof moduleRegisterFn === 'function') {
      return moduleRegisterFn()
    }

    return Promise.resolve(new Disposable(() => {}))
  }))
}
