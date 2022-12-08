import { type ExtensionContext, commands, window } from 'vscode'

export function activate(context: ExtensionContext) {
  globalThis.console.log('Congratulations, your extension "vscode-extension-template" is now active!')

  const disposable = commands.registerCommand('vscode-extension-template.helloWorld', () => {
    window.showInformationMessage('Hello World from vscode-extension-template!')
  })

  context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() { }
