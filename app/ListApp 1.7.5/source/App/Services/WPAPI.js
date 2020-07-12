/** @format */

import WPAPI from 'wpapi'
import { AppConfig, Constants, warn } from '@common'
var wpApi = new WPAPI({
  endpoint: AppConfig.Website.url + '/wp-json',
})
const { Theme } = AppConfig
var namespace = 'wp/v2' // use the WP API namespace
var namespaceConfig = 'inspireui/v1' // use the WP API namespace
var namespaceListing = 'listing/v1' // use the WP API namespace
var namespaceGetTags = 'tags/v1' // use the WP API for get Tags
var namespaceSearch = 'search/v1' // use the WP API for get Tags
wpApi.getJobListing = wpApi.registerRoute(namespace, '/job_listing/(?P<id>)', {
  params: [
    'per_page',
    'page',
    'before',
    'after',
    'author',
    'include',
    'exclude',
    'job_listing_category',
    'job-categories',
    'job_listing_type',
    'region',
    'case27_job_listing_tags',
    'job_listing_region',
    'tag',
    'search',
    'limit',
    'status',
  ],
})

wpApi.getPhotos = wpApi.registerRoute(namespace, '/media/(?P<id>)', {
  params: ['per_page', 'page', 'status', 'media_type', 'mime_type'],
})

wpApi.getJobListingCategory = wpApi.registerRoute(
  namespace,
  `/job_listing_category/(?P<id>)`,
  {
    params: ['per_page', 'page', 'status', 'parent', 'hide_empty'],
  }
)

wpApi.getRating = wpApi.registerRoute(namespace, '/getRating/(?P<id>)')

wpApi.posts = wpApi.registerRoute(namespace, '/posts/(?P<id>)', {
  params: [
    'search',
    'per_page',
    'page',
    'before',
    'after',
    'author',
    'include',
    'exclude',
    'categories',
    'status',
  ],
})

wpApi.getListingTool = wpApi.registerRoute(namespaceListing, '/job_listing', {
  params: ['per_page', 'status', 'page', 'type', 'limit'],
})

//for myListing link
wpApi.getCase27ListingTags = wpApi.registerRoute(
  namespaceListing,
  '/case27_job_listing_tags'
)
wpApi.getAllCategories = wpApi.registerRoute(
  namespace,
  '/job_listing_category',
  {
    params: ['hide_empty', 'per_page'],
  }
)
wpApi.getCase27ListingTypes = wpApi.registerRoute(
  namespace,
  '/case27_listing_type'
)
wpApi.getFilter = wpApi.registerRoute(namespaceSearch, '/job_listing', {
  params: [
    'search', // by keyword
    'page',
    'tags', //for myListing
    'categories',
    'type', //for myListing
    'regions', //for listify
    'typeListable', // for listable
    'limit',
    'status',
    'author',
  ],
})

wpApi.getFilterNearest = wpApi.registerRoute(namespaceSearch, '/job_listing', {
  params: ['isGetLocate', 'lat', 'long'],
})
//for listify link
wpApi.getAllRegions = wpApi.registerRoute(namespace, '/job_listing_region')

//for mylisting
wpApi.getSingleRegion = wpApi.registerRoute(namespace, '/region')
//for listable, jobify
wpApi.getTypes = wpApi.registerRoute(namespace, '/job_listing_type')

wpApi.getConfig = wpApi.registerRoute(namespaceConfig, '/config')

export default wpApi
