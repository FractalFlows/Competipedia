/**
 * Meteor method to start the validator processs
 */

import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import buildValidatorEmail from './buildValidatorEmail'

Meteor.methods({
  addValidatorUser(doc) {
    Meteor.users.schema.validate(doc)

    if (!this.userId) {
      throw new Meteor.Error(403, `You don't have access for this action`)
    }

    Meteor.users.update(this.userId, {$set: doc})

    const emailOptions = buildValidatorEmail(this.userId, {
      view: 'newValidator',
      from: 'Competipedia <support@competipedia.io>',
      subject: 'User request to be validator',
    })

    emailOptions.data.confirmUrl = Meteor.absoluteUrl(`confirm-validator/${this.userId}`)
    emailOptions.data.denyUrl = Meteor.absoluteUrl(`deny-validator/${this.userId}`)

    Meteor.call('sendEmail', emailOptions)
  }
})