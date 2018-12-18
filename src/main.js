import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home.js'
import ChemistryPage from './components/chemistry-elements/chemistry-page.js'
class Main extends Component {
  render(){
    return (
    <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/chemistry' component={ChemistryPage}/>
        </Switch>
      </main>
    )
  }
}

export default Main;