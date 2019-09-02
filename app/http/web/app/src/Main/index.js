import React, { Component } from 'react';
import { Switch, Route, } from 'react-router-dom'

import Login from '../Login'
import Home from '../Home'
import AddTrip from '../AddTrip'
import CitySearch from '../CitySearch'

class Main extends Component {
  render() {
    return (
      <main>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/addtrip" component={AddTrip} />
            <Route exact path="/search" component={CitySearch} />
          </Switch>
      </main>
    );
  }
}

export default Main;
