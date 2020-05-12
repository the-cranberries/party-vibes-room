const Sequelize = require('sequelize')
const db = require('../db')

const PartyUser = db.define('partyUser', {
  isHost : {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
})

module.exports = PartyUser
