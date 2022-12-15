import { resolve } from 'path'
import { type ExtensionContext } from 'vscode'
import { registerArticleDataProvider } from './providers/data/article'
import { register } from './helpers/plugin/register'

export async function activate(context: ExtensionContext) {
  const commandDisposables = await register(resolve(__dirname, 'commands'))

  context.subscriptions.push(
    ...commandDisposables,
    registerArticleDataProvider(),
  )
}

// this method is called when your extension is deactivated
export function deactivate() { }
