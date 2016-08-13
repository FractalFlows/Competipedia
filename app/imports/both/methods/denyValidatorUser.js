/**
 * Meteor method to confirm validator
 */

import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import _ from 'lodash'
import buildValidatorEmail from './buildValidatorEmail'

Meteor.methods({
  denyValidatorUser(validatorUserId) {

    if (!Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error(403, `You don't have access for this action`)
    }

    const emailOptions = buildValidatorEmail(validatorUserId, {
      view: 'denyValidator',
      from: 'Competipedia <support@competipedia.io>',
      subject: `Competipedia validator request denied`
    })

    emailOptions.data.title = 'Sorry your profile does not match for a validator'
    emailOptions.data.content = `Thank you for trying out to become a validator but unfortunately it's not possible right now.
      Your profile is saved and whenever another spot open you will be analysed.
      Thank you,
    `

    Meteor.call('sendEmail', emailOptions)

  }
})