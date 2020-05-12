const Sequelize = require('sequelize')
const db = require('../db')

const Party = db.define('party', {
  accessCode: {
    type: Sequelize.STRING,

  },
  startTime: {
    type: Sequelize.TIME,
  },
  endTime: {
    type: Sequelize.TIME,
  }
})

module.exports = Party
