import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import Letterbox from './pages/Letterbox'

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/:sessionId" exact component={Letterbox} />
    </Switch>
  </Router>
)

export default App;
