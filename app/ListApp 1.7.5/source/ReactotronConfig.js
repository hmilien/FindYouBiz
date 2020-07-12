/** @format */

import Reactotron from './node_modules/reactotron-react-native';
import { reactotronRedux as reduxPlugin } from './node_modules/reactotron-redux';
import Constants from './node_modules/expo-constants';

console.disableYellowBox = true;

if (Constants.isDevice) {
//   // test on real device: change to your local config
  Reactotron.configure({ name: 'ListApp', host: '192.168.34.126' })
} else {
  Reactotron.configure({ name: 'ListApp' })
}
Reactotron.useReactNative({
  asyncStorage: { ignore: ['secret'] },
})

Reactotron.use(reduxPlugin())

if (__DEV__) {
  Reactotron.connect()
  Reactotron.clear()
}
console.tron = Reactotron
