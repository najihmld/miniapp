import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Main from './pages/Main'
import Login from './pages/Login'
import Register from './pages/Register'
import Post from './pages/Post'
import Dashboard from './pages/Dashboard'

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route path='/' exact render={(props) => (<Main{...props}/>)} />
          <Route path='/login' render={(props) => (<Login{...props}/>)} />
          <Route path='/register' render={(props) => (<Register{...props}/>)} />
          <Route path='/post' render={(props) => (<Post{...props}/>)} />
          <Route path='/dashboard' render={(props) => (<Dashboard{...props}/>)} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;