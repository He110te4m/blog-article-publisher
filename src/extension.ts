import { resolve } from 'path'
import { type ExtensionContext } from 'vscode'
import { register } from './helpers/plugin/register'

export async function activate(context: ExtensionContext) {
  const commandDisposables = await register(resolve(__dirname, 'commands'))
  context.subscriptions.push(...commandDisposables)
}

// this method is called when your extension is deactivated
export function deactivate() { }
