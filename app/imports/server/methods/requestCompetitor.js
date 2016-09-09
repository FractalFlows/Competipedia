/**
 * Meteor method to warn
 */

import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import { reCAPTCHA } from 'meteor/astrocoders:recaptcha'

import requestCompetitorSchema from '/imports/both/schemas/requestCompetitor'

Meteor.methods({
  requestCompetitor(doc) {
    requestCompetitorSchema.validate(doc)

    if (!this.userId) {
      throw new Meteor.Error(403, `You don't have access for this action`)
    }

    const captcha = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, doc.captchaData)
    const { emails } = Meteor.users.findOne(this.userId)

    if (!captcha.success) {
      throw new Meteor.Error(403, `Reacaptcha error`)
    }

    if (!emails[0].verified) {
      throw new Meteor.Error(403, 'Please verify your email to continue this action')
    }



    const emailOptions = {
      view: 'requestCompetitor',
      from: 'Competipedia <support@competipedia.io>',
      subject: 'User requested new competitor',
      to: Meteor.users.find({roles: {$in: ['admin', 'validator']}})
        .map(user => user.emails[0].address),
      data: {
        doc,
        title: 'User requested new competitor',
        content: `Hello! Check out the company a user needs competitors.
        Please help fill this gap in our system.
        We count on you`,
        email: `${emails[0].address}`,
      },
    }

    Meteor.call('sendEmail', emailOptions)
  }
})