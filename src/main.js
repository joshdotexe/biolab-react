import React, { Component, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// const Home = lazy(() => import('./home.js'));
// const ChemistryPage = lazy(() => import('./components/chemistry-elements/chemistry-page.js'));
import Home from './home.js';
import ChemistryPage from './components/chemistry-elements/chemistry-page.js';
class Main extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/chemistry' component={ChemistryPage} />
          </Switch>
        </Suspense>
      </Router>
    )
  }
}

export default Main;