import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LineChart, XAxis, YAxis, Line, Tooltip, CartesianGrid } from 'recharts'
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  ButtonDropdown,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap'
import PropTypes from 'prop-types'

import * as actions from '../actions'

class StatsPage extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    dropdownOpen: false
  }

  componentDidMount() {
    this.props.fetchStats(this.props.match.params.id)
  }

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  handleCampaignButtonClick = () => {
    this.context.router.history.push(`/`)
  }

  handleChangeCampaignClick = id => {
    this.props.fetchStats(id)
    this.context.router.history.push(`/campaigns/${id}/stats`)
  }

  render() {
    if (this.props.campaigns.length > 0) {
      const { name } = this.props.campaigns.find(
        campaign => campaign.id === Number(this.props.match.params.id)
      )

      return (
        <Container>
          <Row>
            <Col>
              <h1>{name}</h1>
            </Col>
            <Col>
              <ButtonGroup>
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggleDropdown}
                >
                  <DropdownToggle caret>Change Campaign</DropdownToggle>
                  <DropdownMenu>
                    {this.props.campaigns.map(campaign => (
                      <DropdownItem
                        key={campaign.id}
                        onClick={() =>
                          this.handleChangeCampaignClick(campaign.id)
                        }
                      >
                        {campaign.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
                <Button color="light" onClick={this.handleCampaignButtonClick}>
                  All Campaigns
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          <LineChart width={900} height={250} data={this.props.stats}>
            <XAxis
              dataKey="date"
              type="category"
              tick={{ fontSize: '75%' }}
              interval={0}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: '75%' }}
              tickLine={false}
              axisLine={false}
            />
            <CartesianGrid vertical={false} />
            <Tooltip />
            <Line dataKey="impressions" type="monotone" stroke="blue" />
          </LineChart>
        </Container>
      )
    } else {
      return <h1>Loading</h1>
    }
  }
}

function mapDispatchToProps({ stats, campaigns }) {
  return { stats, campaigns }
}

export default connect(mapDispatchToProps, actions)(StatsPage)
