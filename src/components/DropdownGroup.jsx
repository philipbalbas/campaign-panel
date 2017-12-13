import React, { Component } from 'react'
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as actions from '../actions'

class DropdownGroup extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  state = {
    dropdownOpen: false
  }

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  handleActivateCampaign = () => {
    this.props.activateCampaign(this.props.campaign.id)
  }

  handleInactivateCampaign = () => {
    this.props.inactivateCampaign(this.props.campaign.id)
  }

  handleStatsClick = id => {
    this.context.router.history.push(`/campaigns/${id}/stats`)
  }

  render() {
    const { campaign } = this.props
    return (
      <td>
        <ButtonDropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggleDropdown}
        >
          <DropdownToggle caret>Actions</DropdownToggle>
          <DropdownMenu>
            {campaign.status === 'Active' ? (
              <DropdownItem onClick={this.handleInactivateCampaign}>
                Inactivate
              </DropdownItem>
            ) : (
              <DropdownItem onClick={this.handleActivateCampaign}>
                Activate
              </DropdownItem>
            )}
            <DropdownItem onClick={() => this.handleStatsClick(campaign.id)}>
              Stats
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </td>
    )
  }
}

export default connect(null, actions)(DropdownGroup)
