import faker from 'faker'
import dateFns from 'date-fns'
import fs from 'fs'
import path from 'path'

let data

function randomStatus() {
  const rand = Math.round(Math.random())
  return rand ? 'Active' : 'Inactive'
}

function statsMaker() {
  const dates = dateFns
    .eachDay(faker.date.past(), faker.date.recent())
    .slice(0, 10)
  return dates.map(date => {
    return {
      date: dateFns.format(date, 'YYYY-MM-DD'),
      impressions: Math.floor(Math.random() * 101000) + 1000,
      clicks: Math.floor(Math.random() * 1000) + 50
    }
  })
}

function statsGenerator(num) {
  let id = 1
  let stats = []
  for (let i = 0; i < num; i++) {
    stats.push({
      id,
      stats: statsMaker()
    })
    id += 1
  }
  return stats
}

function campaignGenerator(num) {
  let id = 1
  let campaigns = []
  for (let i = 0; i < num; i++) {
    const daily_budget = faker.commerce.price()
    const multiplier = Math.floor(Math.random() * 16) + 6
    const stats = statsMaker()
    console.log(`stat`, stats)
    campaigns.push({
      id,
      status: randomStatus(),
      name: `${faker.commerce.productAdjective()} ${faker.commerce.productName()} Campaign`,
      total_budget: (daily_budget * multiplier).toFixed(2),
      daily_budget
    })
    id += 1
  }
  return campaigns
}

data = { campaigns: campaignGenerator(10), stats: statsGenerator(10) }

fs.appendFileSync(path.resolve(__dirname, `data.json`), JSON.stringify(data))
