import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Letterbox from './pages/Letterbox'
import CreateBox from './components/CreateBox/create-box.component'
import Header from './components/Header/header.component'

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/box/new" exact component={CreateBox} />
      <Route path="/:boxId" exact component={Letterbox} />
    </Switch>
  </Router>
)

export default App;
