const Sequelize = require('sequelize')
const db = require('../db')

const Party = db.define('party', {
  accessCode: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  scheduleDate: {
    type: Sequelize.DATE,
  },
  startTime: { // how to get time & date from now to later???
    type: Sequelize.TIME,
  },
  endTime: {
    type: Sequelize.TIME,
  },
})

module.exports = Party
