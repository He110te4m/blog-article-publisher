import { commands, window } from 'vscode'
import { commandNames } from '../const'
import type { Plugin } from '../types/plugin'

function register() {
  return commands.registerCommand(commandNames.create, () => {
    window.showInformationMessage('on Article create')
  })
}

const pluginExports: Plugin = {
  register,
}

export default pluginExports
