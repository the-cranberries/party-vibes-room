const Sequelize = require('sequelize')
const db = require('../db')

const PartyUser = db.define('partyUser', {
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['host', 'co-host', 'guest']]
    }
  },
})

module.exports = PartyUser
