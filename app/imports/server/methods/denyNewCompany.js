/**
 * Meteor method to confirm company
 */

import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import Companies from '/imports/both/collections/companies'
import buildValidatorEmail from './buildValidatorEmail'

Meteor.methods({
  denyNewCompany({companyId, userId}) {

    if (!Roles.userIsInRole(this.userId, ['admin', 'validator']) ||
        !companyId ||
        !userId) {
      throw new Meteor.Error(403, `You don't have access for this action`)
    }

    const emailOptions = buildValidatorEmail(userId, {
      view: 'generic',
      from: 'Competipedia <support@competipedia.io>',
      subject: `Company request denied`
    })

    emailOptions.data.title = 'Sorry! The company you added is not a valid company'
    emailOptions.data.content = `Thank you for trying out to add a new company to Competipedia.
      But this specific company does not satisfies our quality pattern.
      Thank you for your time,
    `

    Meteor.call('sendEmail', emailOptions)

  }
})