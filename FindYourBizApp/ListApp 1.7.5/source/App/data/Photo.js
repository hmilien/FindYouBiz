import { warn } from '@common'

export default class Photo {
  constructor(photo) {
    const { post, title, media_details } = photo

    try {
      this.id = post

      this.title = title.rendered

      this.better_featured_image = {
        media_details: media_details,
      }
    } catch (e) {
      warn(e.message)
    }
  }
}
