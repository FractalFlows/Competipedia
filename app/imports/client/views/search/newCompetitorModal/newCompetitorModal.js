import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import Companies from '/imports/both/collections/companies'
import { AutoForm } from 'meteor/aldeed:autoform'
import { Modal } from '/imports/both/modalApi'
import { Roles } from 'meteor/alanning:roles'
import toastr from 'toastr'
import _ from 'lodash'

Template.newCompetitorModal.events({
  'click .js-become-validator' () {
    Modal.open('addValidatorModal')
  },
})

Template.newCompetitorModal.helpers({
  schema: () => Companies.schema,
})

Template.newCompetitorModal.onCreated(function () {
  this.subscribe('categories')
})

Template.newCompetitorModal.onRendered(function () {
  this.$('[name="location.address"]').geocomplete({
    details: '#newCompetitorModal',
    detailsAttribute: 'data-geo',
  })
})

AutoForm.hooks({
  newCompetitorModal: {
    onSubmit(doc) {
      this.event.preventDefault()
      const { requestCompetitors = false } =
        _.get(Template.instance().parent(), 'data', {})
      const captchaData = grecaptcha.getResponse()



      Meteor.call('addCompetitor', { requestCompetitors, captchaData, doc },
      (error, result) => {
        if (error) {
          this.done(error)
        } else {
          this.done()
        }
      })
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
    onSuccess(formType, companyId) {
      grecaptcha.reset()

      if (Roles.userIsInRole(Meteor.userId(), ['validator', 'admin'])) {
        toastr.success('Company added successfully')
      } else {
        toastr.success('The company will be added shortly while we validate the provided company information')
      }
      Modal.close()
    }
  }
})
