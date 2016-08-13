/**
 * Meteor method to confirm validator
 */

import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import _ from 'lodash'
import buildValidatorEmail from './buildValidatorEmail'

Meteor.methods({
  confirmValidatorUser(validatorUserId) {

    if (!Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error(403, `You don't have access for this action`)
    }

    Roles.addUsersToRoles(validatorUserId, 'validator')

    const emailOptions = buildValidatorEmail(validatorUserId, {
      view: 'confirmValidator',
      from: 'Competipedia <support@competipedia.io>',
      subject: 'Congratulations! You just become a validator for Competipedia',
    })

    emailOptions.data.title = 'Thank you for being a validator'
    emailOptions.data.content = `You got approved by our team.
      Now you can help us validate competitors companies.
      Thank you,
    `

    Meteor.call('sendEmail', emailOptions)
  }
})