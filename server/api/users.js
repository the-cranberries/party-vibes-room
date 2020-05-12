const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

// const isHost = (req, reqs, next) => {
//   if (!req.user.isHost) {
//     const err = new Error('Not Allowed')
//     err.status = 401
//     return next(err)
//   } next()
// }

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// // POST /api/users
// router.post('/', async (req, res, next) => {
//   try {
//     const user = await User.create()
//     res.json(user)
//   } catch (err) {
//     next(err)
//   }
// })

// // PUT /api/users/:id
// router.put('/:id', async (req, res, next) => {
//   try {
//     await User.update(req.body, {
//       where: {
//         id: req.params.id
//       }
//     })
//     res.json(res.body)
//   } catch (err) {
//     next(err)
//   }
// })

// // DELETE /api/users/:id
// router.delete('/', async (req, res, next) => {
//   try {

//   } catch (err) {
//     next(err)
//   }
// })
