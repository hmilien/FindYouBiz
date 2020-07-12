/** @format */

export default class Category {
  constructor(cate) {
    const { id, count, name, slug, taxonomy, parent, term_image } = cate

    try {
      this.id = id
      this.count = count
      this.name = name
      this.slug = slug
      this.taxonomy = taxonomy
      this.parent = parent
      this.image = term_image ? term_image : null
    } catch (e) {
      console.error(['err construct cate', e.message])
    }
    // warn(this)
  }
}
