import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './Header'
import CampaignsPage from './CampaignsPage'
import StatsPage from './StatsPage'

class Dashboard extends Component {

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={CampaignsPage} />
          <Route path="/campaigns/:id/stats" component={StatsPage} />
        </Switch>
      </div>
    )
  }
}

export default (Dashboard)
