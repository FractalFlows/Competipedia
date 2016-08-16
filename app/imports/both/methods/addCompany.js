/**
 * Meteor method to start the validator processs
 */

import Companies from '/imports/both/collections/companies'
import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import _ from 'lodash'

Meteor.methods({
  addCompany(doc) {
    Companies.schema.validate(doc)

    if (!this.userId) {
      throw new Meteor.Error(403, `You don't have access for this action`)
    }

    Companies.insert(doc)

    if (Roles.userIsInRole(this.userId, ['validator', 'admin'])) return

    const user = Meteor.user()
    const emailOptions = {
      view: 'newCompany',
      to: _.get(user, 'emails[0].address'),
      data: Object.assign({}, {
        profile: user.profile,
        company: doc,
      }),
      from: 'Competipedia <support@competipedia.io>',
      subject: 'User requested new company',
    }

    emailOptions.data.confirmUrl = Meteor.absoluteUrl(`confirm-company/${this.userId}`)
    emailOptions.data.denyUrl = Meteor.absoluteUrl(`deny-company/${this.userId}`)

    Meteor.call('sendEmail', emailOptions)
  }
})