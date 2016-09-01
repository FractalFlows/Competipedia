import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { AutoForm } from 'meteor/aldeed:autoform'
import toastr from 'toastr'

import { Modal } from '/imports/both/modalApi'
import  requestCompetitorSchema from '/imports/both/schemas/requestCompetitor'

Template.requestCompetitorModal.helpers({
  schema: () => requestCompetitorSchema,
})

AutoForm.hooks({
  requestCompetitorModal: {
    before: {
      method(doc) {
        doc.captchaData = grecaptcha.getResponse()
        this.result(doc)
      }
    },
    onError(type, error) {
      if (error && error.reason === 'Reacaptcha error') {
        toastr.error('Oh noes, you seems a robot!')
      }

      if (error && error.reason) {
        toastr.error(error.reason)
      }

      grecaptcha.reset()
    },
    onSuccess() {
      grecaptcha.reset()
      if (Roles.userIsInRole(this.userId, ['validator', 'admin'])) {
        toastr.success('You requested a new competitor successfully')
      } else {
        toastr.success('Thank you for your request, we will get back to you shortly')
      }
      Modal.close()
    }
  }
})


