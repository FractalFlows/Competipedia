import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Roles } from 'meteor/alanning:roles'

Meteor.methods({
  'dev/createUsers'(){
    [
      {
        email: 'admin@gmail.com',
        firstName: 'Admin',
        lastName: 'Surname',
        roles: ['admin'],
      },

      {
        email: 'normal-user@gmail.com',
        firstName: 'User',
        lastName: 'Simple',
      }
    ].forEach(user => {
      const userId = Accounts.createUser({
        email: user.email,
        password: 'password',
        profile: {
          firstName: user.firstName,
          lastName: user.lastName,
        },
      })

      if(!user.roles) return
      Roles.addUsersToRoles(userId, user.roles)
    })
  }
})
