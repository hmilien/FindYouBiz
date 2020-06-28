/** @format */

export default class PostMyListing {
  constructor(post) {
    try {
      const {
        id,
        title,
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
      this.content = listing_data._job_description
        ? listing_data._job_description
        : ''
      this.date = date
      this.link = link
      this.type = type
      this.author = listing_data._job_author
      this.distance =
        typeof post.distance != 'undefined'
          ? Number(post.distance).toFixed(3)
          : ''

      this.gallery_images = []

      this.address_lat =
        typeof listing_data.geolocation_lat != 'undefined' &&
        listing_data.geolocation_lat
      this.address_long =
        typeof listing_data.geolocation_long != 'undefined' &&
        listing_data.geolocation_long

      this._embedded = _embedded
      this.link_to_product = link_to_product

      this.better_featured_image  = post.better_featured_image

      this.totalReview =
        comments_ratings && comments_ratings.totalReview
          ? comments_ratings.totalReview
          : ''
      this.totalRate =
        comments_ratings && comments_ratings.totalRate
          ? comments_ratings.totalRate
          : ''

      this.company_tagline = listing_data._company_name
        ? listing_data._company_name
        : ''
      this.job_location = listing_data._job_location
        ? listing_data._job_location
        : ''
      this.company_website = listing_data._job_website
        ? listing_data._job_website
        : ''
      this.job_hours = ''
      this.phone = listing_data._job_phone ? listing_data._job_phone : ''
      this.twitter = listing_data._company_twitter
        ? listing_data._company_twitter
        : ''
      this.displayAddress = listing_data._job_location
        ? listing_data._job_location
        : ''

      this.cost = cost.price != '' ? cost.merge : ''
      this.currency = typeof cost != 'undefined' ? cost.currency : ''
      this.job_listing_categories = pure_taxonomies.job_listing_category
      this.categories = pure_taxonomies['job_listing_category']
      this.group = ''
      this.costShow = cost
      this.listing_data = listing_data
      this.pure_taxonomies = pure_taxonomies
    } catch (e) {
      console.error(e)
    }
  }
}
