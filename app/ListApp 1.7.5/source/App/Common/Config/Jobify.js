/** @format */

import Constants from '../Constants'
import Languages from '../Languages'
import Images from '../Images'
const {
  listing,
  map,
  categoryIcons,
  categoryShadow,
  circleCategory,
  news,
} = Constants.Components

const Config = {
  /**
   * Enable=false: load dynamic from the Wordpress by using the ListApp Manager plugin
   * Enable=true: use below setting
   */
  Local: {
    enable: true,
    /**
     * The main layout app homepage
     *    1: Horizontal Layout which is loaded the below HorizonLayout
     *    2: Vertical Layout which is used below verticalLayout
     *    3: Mansory layout
     */
    homeLayout: 1,
    verticalLayout: 2,

    /**
     * HorizonLayout: show the horizontal layout config, show as the default homepage
     *    - component: kind of components(listing, map, news)
     *    - typeId: the type id from Listing blog, from Admin site click Listing/Types/edit the type and get tags_id from the browser URL
     *    - categoryListingId: the category id
     *    - row: the number of row support on the list, default is one row
     *    - paging: blog per page from swiping, default is false
     *    - layout: support 8 kind of layouts: banner, twoColumn, threeColumn, threeColumnHigh, list, listRight, card, flexColumn
     *      (flexColumn is flexible column layout that you can config both width & height)
     * Banner: option to show the banner home page, default visible is true
     */

    BannerHeader: {
      image: require('@images/banner/banner2.jpg'),
      enable: true,
      large: false,
      showLeftMenu: false,
    },
    horizontalLayout: [
      {
        component: listing,
        imageBanner: require('@images/banner-image/banner1.png'),
        layout: Constants.Layout.bannerImage,
        height: 130,
        column: 2,
        categoryListingId: '41',
      },
      {
        component: listing,
        imageBanner: require('@images/banner-image/banner2.png'),
        layout: Constants.Layout.bannerImage,
        height: 130,
        column: 2,
        category: '41',
      },
      {
        component: listing,
        imageBanner: require('@images/banner-image/banner3.png'),
        layout: Constants.Layout.bannerImage,
        height: 130,
        column: 2,
        category: '41',
      },
      {
        component: listing,
        imageBanner: require('@images/banner-image/banner4.png'),
        layout: Constants.Layout.bannerImage,
        height: 130,
        column: 2,
        category: '41',
      },
      {
        component: listing,
        name: 'Design Jobs',
        layout: Constants.Layout.cardTrend,
        paging: true,
        categoryListingId: '41',
      },
    ],
    // VerticalLayout: {
    //   name: 'Recent experiences',
    //   layout: Constants.Layout.twoColumn,
    // },
    /**
     * Left menu menu items setting
     */
    menu: [
      {
        route: 'home',
        name: 'explore',
      },
      {
        route: 'setting',
        name: 'setting',
      },
      {
        route: 'customPage',
        params: {
          title: 'contact',
          url: 'http://jobify.inspireui.com/pricing/',
        },
        name: 'contact',
      },
      {
        route: 'customPage',
        params: {
          id: 54,
          title: 'aboutus',
          url: '',
        },
        name: 'aboutus',
        icon: 'assignment',
      },
      {
        route: 'login',
        name: 'login',
      },
    ],

    /**
     * Common Color for the app setting
     * To change other color, please change from Color.js
     */
    color: {
      mainColorTheme: '#000000',
      tabbar: '#ffffff',
      tabbarTint: '#3bc651',
      tabbarColor: '#929292',
    },

    /**
     *    General config for the app
     *    Firebase: Config to store user Favorites location
     *    Facebook: config for Facebook ads
     *    AdMob: config for Admob ads
     */
    general: {
      Firebase: {
        apiKey: 'AIzaSyB8PGdpIjVrK32UvCdDkDhKCFCRofnJs9g',
        authDomain: 'listapp-mobile.firebaseapp.com',
        databaseURL: 'https://listapp-mobile.firebaseio.com',
        storageBucket: 'listapp-mobile.appspot.com',
        messagingSenderId: '1008301626030',
        readlaterTable: 'list_readlater',
      },
      Facebook: {
        visible: true,
        adPlacementID: '1809822172592320_2299594716948394',
        logInID: '1809822172592320',
        sizeAds: 'standard', // standard, large
      },
      AdMob: {
        visible: true,
        deviceID: 'pub-2101182411274198',
        unitID: 'ca-app-pub-2101182411274198/8802887662',
        unitInterstitial: 'ca-app-pub-2101182411274198/7326078867',
        isShowInterstital: true,
      },
    },
  },

  /**
   * Dynamic Listing Detail Setting, we can use this setting to control the Layout from Listing Detaul screen
   */
  ListingData: [
    {
      section: 'Description',
      type: 'description',
      icon: Images.icons.iconDes,
    },
    {
      section: 'Location',
      type: 'map',
      icon: Images.icons.iconLocation,
    },
    {
      section: 'Table',
      type: 'data',
      icon: Images.icons.iconTable,
      data: [
        {
          key: '_type',
          name: 'Type',
        },
        {
          key: '_area',
          name: 'Area',
          unit: 'sq ft',
        },
        {
          key: '_rooms',
          name: 'Rooms',
        },
        {
          key: '_bathrooms',
          name: 'Bathrooms',
        },
        {
          key: '_beds',
          name: 'Beds',
        },
        {
          key: '_price-per-day',
          name: 'Price Per Day',
        },
        {
          key: '_job_duration',
          name: 'Job Duration',
          unit: 's',
        },
        {
          key: '_job_expires',
          name: 'Job Expire',
        },
      ],
    },
    {
      section: 'Categories',
      type: 'category',
      icon: Images.icons.iconTable,
    },
    {
      section: 'Tags',
      type: 'tag',
      icon: Images.icons.iconTable,
    },
    {
      section: 'Regions',
      type: 'region',
      icon: Images.icons.iconTable,
    },

    {
      section: Languages.relatedPost,
      type: 'related',
      icon: Images.icons.iconTable,
    },
    {
      section: '',
      type: 'admob',
      icon: Images.icons.iconTag,
    },
    {
      section: '',
      type: 'adface',
      icon: Images.icons.iconTag,
    },

    {
      section: 'Contact Us',
      type: 'contact',
      icon: Images.icons.iconTag,
    },
  ],

  // add more fields for add new listing
  PostNewListing: [
    {
      name: 'Website',
      key: '_job_website',
    },
    {
      name: 'Phone',
      key: '_job_phone',
    },
    {
      name: 'Email',
      key: '_job_email',
    },
  ],
}

export default Config
