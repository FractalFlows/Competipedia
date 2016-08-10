import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Modal } from '/imports/both/modalApi'

import _ from 'lodash'

Template.sideBar.events({
  'keyup .company-input'(event, template) {
    const company = event.currentTarget.value

    FlowRouter.setParams({company})
  },
  'click .js-new-competitor'() {
    if (!Meteor.userId()) {
      Modal.open('accountsModal', {
        subTemplate: 'signIn',
        state: 'signIn',
      })

      return
    }

    Modal.open('addNewCompanyModal')
  },
  'click .js-become-competitor'() {
    Modal.open('addValidatorModal')
  },
})

Template.sideBar.helpers({
  company: () => FlowRouter.getParam('company'),
  showBecomeValidator: () =>
    Meteor.user() && !_.get(Meteor.user(), 'profile.validator'),
})

Template.sideBar.onCreated(function() {
  const debouncedSearch = _.debounce(() => {
    const company = FlowRouter.getParam('company')
    this.data.loading.set(true)

    Meteor.callPromise('competitors.get', company)
    .then(list => this.data.listCompetitors.set(list))
    .catch(error => window.alert(error))
    .done(() => this.data.loading.set(false))

  }, 300)

  this.autorun(() => {
    FlowRouter.watchPathChange()
    debouncedSearch()
  })
})