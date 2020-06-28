/** @format */

import { REHYDRATE, PURGE, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const configRoot = {
  key: 'root',
  storage,
  blacklist: ['config'],
}
import posts from './posts'
import categories from './categories'
import tags from './tags'
import bookmark from './bookmark'
import user from './user'
import comments from './comments'
import homeLayout from './homeLayout'
import toast from './toast'
import orders from './orders'
import map from './map'
import netInfo from './netInfo'
import skip from './skip'
import config from './config'
import listingTags from './listingTags'
import language from './language'
import carts from './carts'
import countries from './countries'
import payments from './payments'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['map', 'homeLayout', 'posts'],
}

// config ignore child blacklist redux-persist
// const mapPersistConfig = {
//   key: 'map',
//   storage,
//   blacklist: ['searchMarkers', 'isSearching', 'isFetching'],
// }

// const postsPersistConfig = {
//   key: 'posts',
//   storage,
//   blacklist: ['isSearching', 'isFetching', 'isFetchingSearch'],
// }

export default persistCombineReducers(rootPersistConfig, {
  posts,
  categories,
  tags,
  bookmark,
  user,
  comments,
  homeLayout,
  toast,
  orders,
  map,
  netInfo,
  skip,
  config,
  listingTags,
  language,
  carts,
  countries,
  payments,
})
