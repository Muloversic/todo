import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NativeRouter } from 'react-router-native'
import { Provider } from 'react-redux'
import store from './src/store/store'

import App from './src/App'

const mainApp = () => (
  <NativeRouter>
    <SafeAreaProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SafeAreaProvider>
  </NativeRouter>
)

export default mainApp
