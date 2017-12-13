import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, Container } from 'reactstrap'
import { Link } from 'react-router-dom'

import DropdownGroup from './DropdownGroup'
import * as actions from '../actions'

class CampaignsList extends Component {
  componentDidMount() {
    this.props.fetchCampaigns()
  }

  render() {
    const { campaigns } = this.props
    return (
      <Container>
        <Table bordered>
          <thead>
            <tr>
              <th scope="col">Status</th>
              <th scope="col">Name</th>
              <th scope="col">Daily Budget</th>
              <th scope="col">Total Budget</th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length > 0 &&
              campaigns.map(campaign => {
                return (
                  <tr key={`${campaign.id}`}>
                    <td>
                      <span
                        className={`badge ${
                          campaign.status === 'Active'
                            ? 'badge-primary'
                            : 'badge-secondary'
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td>{campaign.name}</td>
                    <td>$ {campaign.daily_budget}</td>
                    <td>$ {campaign.total_budget}</td>
                    <DropdownGroup campaign={campaign} />
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </Container>
    )
  }
}

function mapDispatchToProps({ campaigns }) {
  return { campaigns }
}

export default connect(mapDispatchToProps, actions)(CampaignsList)
