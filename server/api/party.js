const router = require('express').Router()
const { Party } = require('../db/models')
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

///users/:userId/parties
//change the route to users api party

//update user to users and party to parties


//So when you scale to more than one party at a time… I’m assuming you’re going to want to access a specific party via a “/parties” resource/route
//   /parties/:accessToken