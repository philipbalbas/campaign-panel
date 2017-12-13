import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { loadState, saveState } from './localStorage'
import reducers from './reducers'
import registerServiceWorker from './registerServiceWorker'

const persistedState = loadState()

const store = createStore(
  reducers,
  persistedState,
  composeWithDevTools(applyMiddleware(reduxThunk))
)

store.subscribe(() => {
  saveState(store.getState())
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
