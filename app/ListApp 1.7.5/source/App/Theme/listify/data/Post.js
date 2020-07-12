/** @format */

export default class PostListify {
  constructor(post) {
    try {
      const {
        id,
        title,
        content,
        date,
        _embedded,
        link_to_product,
        comments_ratings,
        listing_data,
        cost,
        link,
        type,
        pure_taxonomies,
      } = post
      this.id = id
      this.title = title
      this.content = content.rendered
      this.date = date
      this.type = type
      this.link = link
      this.distance =
        typeof post.distance != 'undefined'
          ? Number(post.distance).toFixed(3)
          : ''

      this.gallery_images =
        typeof listing_data._gallery_images != 'undefined' &&
        listing_data._gallery_images != ''
          ? listing_data._gallery_images
          : []
      this.better_featured_image = post.better_featured_image

      this.address_lat =
        typeof listing_data.geolocation_lat != 'undefined'
          ? listing_data.geolocation_lat
          : ''
      this.address_long =
        typeof listing_data.geolocation_long != 'undefined'
          ? listing_data.geolocation_long
          : ''

      this._embedded = _embedded
      this.link_to_product = link_to_product

      this.totalReview = comments_ratings.totalReview
      this.totalRate = comments_ratings.totalRate

      this.company_tagline = listing_data._company_tagline
        ? listing_data._company_tagline
        : ''
      this.job_location = listing_data._job_location
        ? listing_data._job_location
        : ''
      this.company_website = listing_data._company_website
        ? listing_data._company_website
        : ''
      this.job_hours = ''
      this.phone = listing_data._company_phone
        ? listing_data._company_phone
        : ''
      this.twitter = listing_data._company_twitter
        ? listing_data._company_twitter
        : ''
      this.displayAddress = listing_data._job_location
        ? listing_data._job_location
        : ''

      this.cost = cost.price != '' ? cost.merge : ''
      this.job_listing_categories = pure_taxonomies.job_listing_category
      this.categories = post.job_listing_category
      this.listing_data = listing_data
      this.pure_taxonomies = pure_taxonomies

      // console.warn(post)
    } catch (e) {
      console.error(e.message)
    }
  }
}
