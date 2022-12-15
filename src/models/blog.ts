import axios from 'axios'
import type { Article } from '../types/article'

export class BlogModel {
  #domain: string
  #path = 'blog/articles/list.json'
  #articles: Article[] = []

  constructor(domain: string) {
    this.#domain = domain
  }

  async getArticles(isIgnoreCache = false) {
    if (isIgnoreCache || this.#articles.length) {
      const articles: Article[] = await load(this.#domain, this.#path)
      this.#articles = articles ?? this.#articles
    }

    return this.#articles
  }
}

function load(domain: string, path: string) {
  const uri = formatUri(domain, path)

  return axios.get(uri).then(({ data }) => data)
}

function formatUri(domain: string, path: string) {
  const formattedDomain = domain.endsWith('/') ? domain.slice(0, -1) : domain
  const formattedPath = path.startsWith('/') ? path : `/${path}`

  return formattedDomain + formattedPath
}
