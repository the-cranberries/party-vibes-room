const router = require('express').Router()
const {Party} = require('../db/models')
module.exports = router

// GET /api/party/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const party = await Party.findByPk(req.params.userId)
    res.json(party)
  } catch (err) {
    next(err)
  }
})
