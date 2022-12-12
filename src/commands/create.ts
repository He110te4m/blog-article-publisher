import type { Plugin } from 'src/types/plugin'
import { commands, window } from 'vscode'
import { commandNames } from '../const'

export const register: Plugin['register'] = () => {
  return commands.registerCommand(commandNames.create, () => {
    window.showInformationMessage('on Article create')
  })
}
