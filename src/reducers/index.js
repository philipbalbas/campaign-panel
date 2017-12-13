import { combineReducers } from 'redux'

import C from '../actions/types'

const campaigns = (state = [], action) => {
  const updatedCampaigns = [...state]
  switch (action.type) {
    case C.FETCH_CAMPAIGNS:
      return action.payload
    case C.ACTIVATE_CAMPAIGN:
      return updatedCampaigns.map(campaign => {
        if (campaign.id === action.payload) {
          campaign.status = 'Active'
        }
        return campaign
      })
    case C.INACTIVATE_CAMPAIGN:
      return updatedCampaigns.map(campaign => {
        if (campaign.id === action.payload) {
          campaign.status = 'Inactive'
        }
        return campaign
      })
    default:
      return state
  }
}

const stats = (state = [], action) => {
  return action.type === C.FETCH_STATS ? action.payload : state
}

export default combineReducers({
  campaigns,
  stats
})
