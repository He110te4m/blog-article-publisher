import { type ExtensionContext, commands, window } from 'vscode'

export function activate(context: ExtensionContext) {
  globalThis.console.log('Congratulations, your extension "blog-article-publisher" is now active!')

  const disposable = commands.registerCommand('blog-article-publisher.helloWorld', () => {
    window.showInformationMessage('Hello World from blog-article-publisher!')
  })

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() { }
