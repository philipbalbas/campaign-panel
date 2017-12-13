import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'

import data from './data.json'

const app = express()
app.use(cors())

const port = 5000

app.get(`/campaigns`, (req, res) => {
  res.send(data.campaigns)
})

app.post(`/campaigns/:id/activate`, (req, res) => {
  let result
  data.campaigns.map(campaign => {
     if (Number(req.params.id) === campaign.id) {
       campaign.status = "Active"
       result = campaign
     }
  })
  fs.writeFileSync(path.resolve(__dirname, `data.json`), JSON.stringify(data))
  res.send(result)
})

app.post(`/campaigns/:id/inactivate`, (req, res) => {
  let result
  data.campaigns.map(campaign => {
    if (Number(req.params.id) === campaign.id) {
      campaign.status = "Inactive"
      result = campaign
    }
  })
  fs.writeFileSync(path.resolve(__dirname, `data.json`), JSON.stringify(data))
  res.send(result)
})

app.get(`/campaigns/:id/stats`, (req, res) => {
  let result
  data.stats.map(stat => {
    if (Number(req.params.id) === stat.id) {
      result = stat
    }
  })

  res.send(result.stats)
})

app.listen(port, () => console.log(`server running in port ${port}`))

