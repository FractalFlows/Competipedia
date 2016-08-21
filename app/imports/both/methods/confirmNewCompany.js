/**
 * Meteor method to confirm company
 */

import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import Companies from '/imports/both/collections/companies'
import buildValidatorEmail from './buildValidatorEmail'

Meteor.methods({
  confirmNewCompany({companyId, userId}) {

    if (!Roles.userIsInRole(this.userId, ['admin', 'validator']) ||
        !companyId ||
        !userId) {
      throw new Meteor.Error(403, `You don't have access for this action`)
    }

    Companies.update(companyId, {$set: {isValid: true}})

    const emailOptions = buildValidatorEmail(userId, {
      view: 'generic',
      from: 'Competipedia <support@competipedia.io>',
      subject: `Company request accepted!`
    })

    emailOptions.data.title = 'Thank you for adding a new company to Competipedia'
    emailOptions.data.content = `We are really glad you are helping us keep Competipedia
      Updated with the newest companies and competitors of the market.
      Thank you for your time,
    `

    Meteor.call('sendEmail', emailOptions)

  }
})