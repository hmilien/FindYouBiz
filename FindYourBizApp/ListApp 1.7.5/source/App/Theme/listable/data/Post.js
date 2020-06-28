/** @format */

export default class Post {
  constructor(post) {
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

    try {
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
        typeof listing_data._main_image !== 'undefined'
          ? listing_data._main_image
          : []
      this.better_featured_image = {
        media_details: {
          sizes:
            typeof post.better_featured_image != 'undefined' &&
            post.better_featured_image != null
              ? post.better_featured_image.media_details.sizes
              : {}, // set sizes is empty
        },
      }

      this.address_lat =
        typeof listing_data.geolocation_lat != 'undefined'
          ? listing_data.geolocation_lat
          : 0
      this.address_long =
        typeof listing_data.geolocation_long != 'undefined'
          ? listing_data.geolocation_long
          : 0

      this._embedded = _embedded
      this.link_to_product =
        typeof listing_data._products != 'undefined' &&
        listing_data._products.length > 0
          ? listing_data._products
          : null

      this.totalReview = comments_ratings.totalReview
      this.totalRate = comments_ratings.totalRate

      this.company_tagline = listing_data._company_tagline
      this.job_location = listing_data._job_location
      this.company_website = listing_data._company_website
      this.job_hours = listing_data._job_hours
      this.phone = listing_data._company_phone
      this.twitter = listing_data._company_twitter
      this.displayAddress = listing_data._job_location
        ? listing_data._job_location
        : ''

      this.cost = cost !== null && cost.price != '' ? cost.merge : ''

      this.categories = post.job_listing_category
      this.listing_data = listing_data
      this.pure_taxonomies = pure_taxonomies

      // console.warn(['this listable', this])
    } catch (e) {
      console.error(e.message)
    }
  }
}
