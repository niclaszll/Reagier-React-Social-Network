import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode'
import { Provider } from 'react-redux'
import axios from 'axios'
import themeFile from './util/theme'

// Redux
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'

// Components
import Navbar from './components/layout/Navbar'
import AuthRoute from './util/AuthRoute'

// Pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import user from './pages/user'

const theme = createMuiTheme(themeFile)

axios.defaults.baseURL = 'https://your-url-here.cloudfunctions.net/api'

const token = localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = 'login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common.Authorization = token
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/users/:handle" component={user} />
                <Route exact path="/users/:handle/post/:postId" component={user} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </ThemeProvider>
  )
}

export default App
