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
      grecaptcha.reset()
    },
    onSuccess() {
      grecaptcha.reset()
      toastr.success('You just requested a new competitor successfuly!')
      Modal.close()
    }
  }
})


