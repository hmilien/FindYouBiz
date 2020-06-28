/** @format */
import AppConfig from './AppConfig.json'
const {mainColorTheme, tabbar, tabbarTint, tabbarColor} = AppConfig.MainColor;

'use strict'
export default {
  main: mainColorTheme, 
  tabbar: tabbar,
  tabbarTint: tabbarTint, 
  tabbarColor: tabbarColor,
  

  calendars: {
    dayNum: '#000',
    dayText: '#000',
    selectBackground: 'rgba(0,0, 0, .2)',
    today: '#E04F3C',
    dot: '#000',
    textColor: '#FFF',
    monthTextColor: '#000',
  },
  map: {
    marker: '#000',
    markerActive: 'red',
    defaultPinColor: 'red',
    loading: mainColorTheme,
  },
  starRating: '#ffb900',
  activeReview: 'rgba(239, 108, 0, 1)',
  text: '#333333',
  background: '#fff',
  searchButton: 'rgba(0, 0, 0, .5)', 
  board: {
    bgColor: 'rgba(0, 0, 0, .5)', 
  },
  countComment: '#F13434', 
  error: '#F13434',
  backButton: {
    button: 'rgba(0, 0, 0, .8)',
    text: '#FFF',
  },
  spin: '#333333',
  time: '#aaaaaa',
  title: '#333333',
  appColor: mainColorTheme,
  //postDetail
  reserveText: '#FFF',
  reserveArrow: '#FFF',
  // cart
  TabActive: mainColorTheme,
  TabDeActive: 'white',
  TabActiveText: '#333',
  TabText: '#333',
  BuyNowButton: mainColorTheme,
  OutOfStockButton: '#a44',
  lightGrey: 'rgba(247, 248, 250, 1)',
  stepActive: mainColorTheme,
  stepInActive: 'rgba(207, 212, 216, 0.8)',
  blackTextPrimary: 'rgba(0,0,0,1)',
  blackTextSecondary: 'rgba(0,0,0,0.5)',
  blackTextDisable: 'rgba(0,0,0,0.3)',
  attributes: {
    black: '#333',
    red: '#DF3737',
    green: '#2AB5B3',
    blue: '#38B1E7',
    yellow: '#FDF12C',
  },
  colors: [
    '#43C59E',
    '#14453D',
    '#7A4419',
    '#515A47',
    '#3CDBD3',
    '#7DCE82',
    '#8A84E2',
    '#84AFE6',
    '#AFAFDC',
    '#DB5A42',
    '#AC7B84',
    '#373F51',
    '#DAA49A',
  ],
}
