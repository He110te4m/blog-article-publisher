import { type TreeDataProvider, TreeItem, TreeItemCollapsibleState, window } from 'vscode'
import { map } from 'fp-ts/Array'
import { getDomain } from '../../helpers/config/domain'
import { BlogModel } from '../../models/blog'
import type { Article } from '../../types/article'

const model = new BlogModel(getDomain())

export function registerArticleDataProvider() {
  return window.createTreeView('blog-article-publisher-list-view', {
    showCollapseAll: true,
    treeDataProvider: new ArticleDataProvider(),
  })
}

class ArticleDataProvider implements TreeDataProvider<ArticleItem> {
  getTreeItem(element: ArticleItem): MaybeAsync<TreeItem> {
    return element
  }

  getChildren(element?: ArticleItem): MaybeAsync<ArticleItem[]> {
    if (element) {
      return []
    }

    return model.getArticles()
      .then(map(createArticleItem))
  }
}

class ArticleItem extends TreeItem {
  viewItemType = 'article'

  constructor(
    public readonly label: string,
    public readonly collapsibleState: TreeItemCollapsibleState,
    public readonly article: Article,
  ) {
    super(label, collapsibleState)
  }
}

function createArticleItem(article: Article) {
  return new ArticleItem(article.title, TreeItemCollapsibleState.None, article)
}
