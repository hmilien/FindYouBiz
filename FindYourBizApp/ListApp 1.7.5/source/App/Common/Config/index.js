/** @format */
import Constants from '../Constants'
import Languages from '../Languages'
import Images from '../Images'

import { Theme } from '../AppConfig.json'
import Listable from './Listable'
import MyListing from './MyListing'
import MyHome from './MyHome'
import Listify from './Listify'
import Jobify from './Jobify'

let Config = MyListing

if (Theme == 'listable') {
  Config = Listable
} else if (Theme == 'listify') {
  Config = Listify
} else if (Theme == 'myHome') {
  Config = MyHome
} else if (Theme == 'jobify') {
  Config = Jobify
}

const extraConfig = {
  // default language from the Languages.js file
  Language: 'en',

  // Enable Booking feature
  Booking: {
    enable: true,
  },

  PostImage: {
    small: 'thumbnail',
    medium: 'medium',
    large: 'large',
    full: 'full',
  },

  ProductSize: {
    enable: true,
  },

  // left menu layout style
  LeftMenuStyle: Constants.LeftMenu.overlay,

  // Exclude the parent category that not show on the app, empty is mean nothing
  excludeCategories: [1],

  // Default animate for tabbar
  tabBarAnimate: Constants.Animate.zoomIn,

  // option to show Status bar (true/false)
  showStatusBar: false,

  // Default layout for category (true/false)
  CategoryListView: true,

  // The delta value for map zooming
  map: {
    LATITUDE_DELTA: 0.22,
    LATITUDE_DELTA_USER: 0.0922,
  },

  // Crash report setting, refer more here - https://docs.expo.io/versions/latest/guides/using-sentry#content
  crashReport: {
    enable: false,
    // sentryCode: 'https://36c95a8c996b467fbfd78a8d95d4d29a:afc9d2165a6446808f51abd43de20c17@sentry.io/1191149',
  },

  // Custom the background color for Onboarding
  Board: {
    enable: false,
  },

  // One Signal setting, only valid after eject(detach) the project
  OneSignal: {
    appId: 'd69d4b4d-e92b-4adb-a914-fe3b2eb4da42',
  },

  // Firebase Push Notification setting
  PushNotification: {
    saveTokens:
      // 'https://us-central1-listapp-mobile.cloudfunctions.net/saveTokens',
      'https://exp.host/--/api/v2/push/send',
  },

  // Sub Categories in Categories Screen
  // false if you want to show the categories with parent = 0 (level 1)
  Categories: {
    showSub: false,
    showAll: true,
  },

  // Date time picker setting
  // Reference that link https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPInternational/LanguageandLocaleIDs/LanguageandLocaleIDs.html
  DateTimePicker: {
    Locale: 'en',
  },

  // Background Chat screen setting
  Chat: {
    defaultBg: Images.defaultBgChat,
    opacityBg: 0.3,
  },

  /**
   * Dynamic setting for the UserProfile screen
   */
  userProfileMenu: [
    {
      label: Languages.userProfileContact,
      routeName: 'customPage',
      params: {
        id: 2976,
        title: 'userProfileContact',
      },
    },

    {
      label: Languages.userProfileAbout,
      routeName: 'customPage',
      params: {
        url: 'http://inspireui.com',
      },
    },
  ],

  // config paypal
  PayPal: {
    sandBoxMode: true,
    clientID:
      'ATeT4ckTzYyxo8IQ9n-d4JOmJX9c-gJqqW9CKKKhN45lHow40SdGtKNpQKg2ASnkGsYTxh83GK6wAlBh',
    secretKey:
      'EHLLoxewn3KhndDE3SzgdgJ6KGCIcGJzGEWgZJDQ7r8Qt4OmneaT5Dq6lyfPhxGDVRZNCubPsAsdbOml',
  },

  // List of support Payment Gateway
  Payments: {
    cod: require('images/payment_logo/cash_on_delivery.png'),
    paypal: require('images/payment_logo/PayPal.png'),
    // stripe: require(''images/payment_logo/stripe.png'),
  },

  // Shipping setting for the Payment
  shipping: {
    visible: false,
    time: {
      free_shipping: '4 - 7 Days',
      flat_rate: '1 - 4 Days',
      local_pickup: '1 - 4 Days',
    },
  },

  /**
   * Google map config
   */
  Google: {
    mapApi: 'AIzaSyDa-_B3CLlOHWG33nQMeuMjLu0pO3PdHzo',
    searchCountry: 'gb',

    Analytic: {
      enable: false,
      TrackingId: 'UA-126748701-1',
    },
  },

  HomeCategories: [
    {
      category: 28 , //103, //28, //54
      image: Images.imageCategories.drink, // image for categoryLinks component
      icon: Images.imageCategoriesIcons.drink, // icon for categoryIcons componets
      iconTrans: Images.imageCatesTransparent.drink, // icon for categoryShadow componets
      colors: ['#4facfe', '#00f2fe'],
    },
    {
      category: 73, //108, // 42, // 27
      image: Images.imageCategories.chicken,
      icon: Images.imageCategoriesIcons.chicken,
      iconTrans: Images.imageCatesTransparent.chicken,
      colors: ['#43e97b', '#38f9d7'],
    },
    {
      category: 29, //90, // 29, //61
      image: Images.imageCategories.deserts,
      icon: Images.imageCategoriesIcons.deserts,
      iconTrans: Images.imageCatesTransparent.deserts,
      colors: ['#fa709a', '#fee140'],
    },
    {
      category: 37, //141, //37, // 25
      image: Images.imageCategories.salads,
      icon: Images.imageCategoriesIcons.salads,
      iconTrans: Images.imageCatesTransparent.salads,
      colors: ['#7F00FF', '#E100FF'],
    },
    {
      category: 63, // 128, // 38, //78
      image: Images.imageCategories.smoothies,
      icon: Images.imageCategoriesIcons.smoothies,
      iconTrans: Images.imageCatesTransparent.smoothies,
      colors: ['#30cfd0', '#330867'],
    },
    {
      category: 65, // 107, // 42, //24
      image: Images.imageCategories.pasta,
      icon: Images.imageCategoriesIcons.pasta,
      iconTrans: Images.imageCatesTransparent.pasta,
      colors: ['#30cfd0', '#330867'],
    },
    {
      category: 77, //139, //43, //26
      image: Images.imageCategories['health-care'],
      icon: Images.imageCategoriesIcons['health-care'],
      iconTrans: Images.imageCatesTransparent['health-care'],
      colors: ['#30cfd0', '#330867'],
    },
    {
      category: 53, // 105, // //53, //89
      image: Images.imageCategories['kids-menu'],
      icon: Images.imageCategoriesIcons['kids-menu'],
      iconTrans: Images.imageCatesTransparent['kids-menu'],
      colors: ['#30cfd0', '#330867'],
    },
  ],

  // set status to get listing
  PostStatus: 'publish', //'draft'
}

export default Object.assign(Config, extraConfig)
