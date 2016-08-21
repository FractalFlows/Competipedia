/**
 * Meteor method to start the validator processs
 */

import Companies from '/imports/both/collections/companies'
import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'

Meteor.methods({
  addCompany(doc) {
    Companies.schema.validate(doc)

    if (!this.userId) {
      throw new Meteor.Error(403, `You don't have access for this action`)
    }

    const companyId = Companies.insert(doc)

    if (Roles.userIsInRole(this.userId, ['validator', 'admin'])) return

    const user = Meteor.user()
    const to = Meteor.users.find({roles: {$in: ['admin', 'validator']} })
      .map(user => user.emails[0].address)

    const emailOptions = {
      to,
      view: 'newCompany',
      data: Object.assign({}, {
        userEmail: user.emails[0].address,
        company: doc,
      }),
      from: 'Competipedia <support@competipedia.io>',
      subject: 'User requested new company',
    }

    emailOptions.data.confirmUrl = Meteor.absoluteUrl(`confirm-company/${companyId}/${user._id}`)
    emailOptions.data.denyUrl = Meteor.absoluteUrl(`deny-company/${companyId}/${user._id}`)

    Meteor.call('sendEmail', emailOptions)
  }
})