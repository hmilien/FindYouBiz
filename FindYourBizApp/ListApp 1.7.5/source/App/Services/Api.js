import WordpressApi from './WordpressApi'
import { AppConfig } from '@common'

var Api = new WordpressApi({
  url: AppConfig.Website.url,
  logo: '',
})

export default Api
