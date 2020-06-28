import { warn } from '@common'

export default class News {
  constructor(post) {
    const {
      id,
      title,
      content,
      excerpt,
      _embedded,
      type,
      better_featured_image,
    } = post

    try {
      this.id = id
      this.title = title
      this.content = content.rendered
      this.excerpt = excerpt.rendered
      this.type = type

      this.better_featured_image = better_featured_image
      this._embedded = _embedded
    } catch (e) {
      warn(e.message)
    }
  }
}
