/** @format */

export default class PostMyListing {
  constructor(post) {
    try {
      const {
        id,
        title,
        date,
        _embedded,
        comments_ratings,
        listing_data,
        cost,
        link,
        type,
        author,
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
      this.author = author
      this.distance =
        typeof post.distance != 'undefined'
          ? Number(post.distance).toFixed(3)
          : ''

      this.better_featured_image = post.better_featured_image

      this.address_lat =
        typeof listing_data.geolocation_lat !== 'undefined' &&
        listing_data.geolocation_lat
      this.address_long =
        typeof listing_data.geolocation_long != 'undefined' &&
        listing_data.geolocation_long

      this.country =
        typeof listing_data.geolocation_country_long != 'undefined' &&
        listing_data.geolocation_country_long != ''
          ? listing_data.geolocation_country_long
          : ''

      this._embedded = _embedded
      this.link_to_product =
        typeof listing_data._select_products != 'undefined' &&
        listing_data._select_products != null &&
        listing_data._select_products.length > 0
          ? listing_data._select_products
          : null

      this.totalReview =
        comments_ratings && comments_ratings.totalReview
          ? comments_ratings.totalReview
          : ''
      this.totalRate =
        comments_ratings && comments_ratings.totalRate
          ? comments_ratings.totalRate
          : ''

      this.company_tagline = listing_data._job_tagline
        ? listing_data._job_tagline
        : ''
      this.location = listing_data._job_location
        ? listing_data._job_location
        : ''
      this.company_website = listing_data._job_website
        ? listing_data._job_website
        : ''
      this.job_hours = '' //post._job_hours
      this.phone = listing_data._job_phone ? listing_data._job_phone : ''
      this.twitter = ''
      if (
        typeof listing_data._link != 'undefined' &&
        listing_data._links.length != 0
      )
        listing_data._links.map((item, index) => {
          item.network == 'Twitter' ? (this.twitter = item.url) : ''
        })

      this.displayAddress = listing_data._job_location
        ? listing_data._job_location
        : ''
      this.gallery_images =
        typeof listing_data._job_gallery != 'undefined'
          ? listing_data._job_gallery
          : []
      this.cost = cost.price != '' ? cost.merge : ''
      this.currency = typeof cost != 'undefined' ? cost.currency : ''
      this.job_listing_categories = pure_taxonomies.job_listing_category
      this.categories = pure_taxonomies['job_listing_category']
      this.group = listing_data._case27_listing_type
      this.costShow =
        typeof post.listing_data._price !== 'undefined'
          ? post.listing_data._price + ' ' + post.cost.currency
          : ''
      this.listing_data = listing_data
      this.pure_taxonomies = pure_taxonomies

      // console.warn(['success post', this])
    } catch (e) {
      console.error(['err mylisting construct', e])
    }
  }
}
