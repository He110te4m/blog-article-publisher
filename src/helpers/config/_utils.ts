import { workspace } from 'vscode'

export function getConfig<T>(section: string, defaultValue: T): T {
  const config = workspace.getConfiguration('blog-article-publisher')

  return config.get(section, defaultValue)
}
