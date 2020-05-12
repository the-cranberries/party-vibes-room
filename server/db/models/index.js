const User = require('./user')
const Party = require('./party')
const PartyUser = require('./party-user')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Party.belongsTo(User)
User.hasMany(Party)
User.belongsToMany(Party, {through: PartyUser})
Party.belongsToMany(User, {through: PartyUser})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Party,
  PartyUser
}
