import { Dimensions, StyleSheet } from 'react-native'
import { Config, Device, Constants, Color } from '@common'
const PAGE_WIDTH = Dimensions.get('window').width
const PAGE_HEIGHT = Dimensions.get('window').height

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Config.Board.enable ? Color.board.bgColor : Color.main,
  },
  linear: {
    zIndex: 9999,
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
    // fontFamily: 'baloo',
    fontFamily: Constants.fontFamilyLight,
  },
  desc: {
    fontSize: PAGE_WIDTH / 24,
    color: '#fff',
    backgroundColor: 'transparent',
    marginTop: 30,
    lineHeight: 25,
    textAlign: 'center',
    // fontFamily: 'varela',
    fontFamily: Constants.fontFamilyLight,
  },
  background: {
    width: PAGE_WIDTH,
    resizeMode: 'contain',
    position: 'absolute',
  },

  page: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT - 100,
    flex: 1,
    // backgroundColor: 'rgba(226, 76, 77, .8)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },

  icon: {
    marginTop: 10 * PAGE_HEIGHT / 100,
    width: 50 * PAGE_WIDTH / 100,
    height: 50 * PAGE_WIDTH / 100,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 40 * PAGE_WIDTH / 100,
    opacity: 0.9,
  },
  card: {
    position: 'absolute',
    margin: 30,
    left: PAGE_WIDTH / 16,
    top: 10 * PAGE_WIDTH / 100,
    right: 0,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 140,
  },

  dot: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0, .5)',
    width: 6,
    height: 6,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
  },

  dotActive: {
    backgroundColor: 'rgba(255, 244, 235, 1)',
    width: 9,
    height: 9,
    borderRadius: 6,
    marginLeft: 4,
    marginRight: 4,
  },

  wrapSkip: {
    // position: 'absolute',
    // right: 10,
    // bottom: 10,
    // zIndex: 9999,
    // ...Platform.select({
    //   android: {height: 18, width: 20, backgroundColor: 'red'}
    // })
    position: 'absolute',
    right: Device.isIphoneX ? 20 : 10,
    bottom: Device.isIphoneX ? 45 : 10 ,
    zIndex: 99999,
  },
  skip: {
    color: '#FFF',
  },
})
