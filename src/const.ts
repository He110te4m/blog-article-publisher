import { genNameByID } from './helpers/generators/id'

export const extensionID = 'blog-article-publisher'

export const extensionName = genNameByID(extensionID)

export const commandNames = {
  create: formatCommandName('create'),
  update: formatCommandName('update'),
  list: formatCommandName('list'),
}

function formatCommandName(command: string) {
  return `${extensionID}.${command}`
}
