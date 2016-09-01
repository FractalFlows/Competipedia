/**
 * Meteor method to start the validator processs
 */

import Companies from '/imports/both/collections/companies'
import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import { reCAPTCHA } from 'meteor/astrocoders:recaptcha'

Meteor.methods({
  addCompetitor({captchaData, requestCompetitors, doc}) {
    if (!this.userId) {
      throw new Meteor.Error(403, `You don't have access for this action`)
    }

    const captcha = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData)

    if (!captcha.success) {
      throw new Meteor.Error(403, `Reacaptcha error`)
    }

    const user = Meteor.user()
    const companyId = Companies.insert(doc)
    const to = Meteor.users.find({ roles: {$in: ['admin', 'validator']} })
      .map(user => user.emails[0].address)

    if (Roles.userIsInRole(this.userId, ['validator', 'admin'])) return

    if (!user.emails[0].verified) {
      throw new Meteor.Error(403, 'Please verify your email to continue this action')
    }

    const subject = requestCompetitors
      ? 'A new company was added and competitors are requested'
      : 'An user added a new company'
    const emailOptions = {
      to,
      subject,
      from: 'Competipedia <support@competipedia.io>',
      view: 'newCompany',
      data: {
        userEmail: user.emails[0].address,
        company: doc,
      },
    }

    emailOptions.data.confirmUrl = Meteor.absoluteUrl(`confirm-company/${companyId}/${user._id}`)
    emailOptions.data.denyUrl = Meteor.absoluteUrl(`deny-company/${companyId}/${user._id}`)

    Meteor.call('sendEmail', emailOptions)
  }
})
