import type { Disposable } from 'vscode'

declare global {
  export type DisposeFn = () => Disposable
}

export {}
