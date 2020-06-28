/** @format */
import Reactotron from 'reactotron-react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import Sentry from 'sentry-expo'
import thunk from 'redux-thunk'
import reducers from '@redux/reducers'
import { connectConsoleToReactotron, Constants } from '@common'
import './../../ReactotronConfig'
const middleware = [
  thunk,
  // more middleware
]

let store = null
const configureStore = () => {
  if (__DEV__) {
    Sentry.enableInExpoDevelopment = true

    if (Constants.useReactotron) {
      store = createStore(
        reducers,
        {},
        compose(
          applyMiddleware(...middleware),
          Reactotron.createEnhancer()
        )
      )
      connectConsoleToReactotron()
    } else {
      const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
      store = composeEnhancers(applyMiddleware(...middleware))(createStore)(
        reducers
      )

      if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept(reducers, () => {
          const nextRootReducer = reducers
          store.replaceReducer(nextRootReducer)
        })
      }

      // show network react-native-debugger
      global.XMLHttpRequest = global.originalXMLHttpRequest
        ? global.originalXMLHttpRequest
        : global.XMLHttpRequest
      global.FormData = global.originalFormData
        ? global.originalFormData
        : global.FormData
    }
  } else {
    store = compose(applyMiddleware(...middleware))(createStore)(reducers)

    // Remove console
    console.log = function() {}
    console.info = function() {}
    console.warn = function() {}
    console.error = function() {}
    console.debug = function() {}
  }
  return store
}

export default configureStore()
