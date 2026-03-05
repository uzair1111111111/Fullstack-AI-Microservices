// import React from 'react'
// import ReactDOM from 'react-dom/client'

// import { Provider } from 'react-redux'
// import { store } from './store/store'

// import App from './App'
// import { AuthProvider } from 'react-oauth2-code-pkce'
// import { authConfig } from './authConfig'

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//   <AuthProvider authConfig={authConfig}>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </AuthProvider>,
// )
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { store } from './store/store'

import App from './App'
// AuthProvider ko filhal comment kar diya taake redirect na ho
// import { AuthProvider } from 'react-oauth2-code-pkce' 

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
      <App />
    </Provider>
)