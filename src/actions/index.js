import C from './types'
import axios from 'axios/index'

export const fetchCampaigns = () => async dispatch => {
  const res = await axios.get(`http://localhost:5000/campaigns`)
  dispatch({
    type: C.FETCH_CAMPAIGNS,
    payload: res.data
  })
}

export const activateCampaign = (id) => async dispatch => {
  await axios.post(`http://localhost:5000/campaigns/${id}/activate`)
  dispatch({
    type: C.ACTIVATE_CAMPAIGN,
    payload: id
  })
}

export const inactivateCampaign = (id) => async dispatch => {
  await axios.post(`http://localhost:5000/campaigns/${id}/inactivate`)
  dispatch({
    type: C.INACTIVATE_CAMPAIGN,
    payload: id
  })
}

export const fetchStats = (id) => async dispatch => {
  const res = await axios.get(`http://localhost:5000/campaigns/${id}/stats`)
  dispatch({
    type: C.FETCH_STATS,
    payload: res.data
  })
}