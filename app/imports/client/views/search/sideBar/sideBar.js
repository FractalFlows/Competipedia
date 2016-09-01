import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Modal } from '/imports/both/modalApi'
import { Meteor } from 'meteor/meteor'
import isNotLoggedIn from '/imports/client/lib/isNotLoggedIn'

import _ from 'lodash'
import denodeify from 'denodeify'

Template.sideBar.events({
  'keyup .js-company-input'(event, template) {
    const company = event.currentTarget.value

    FlowRouter.setParams({company})
  },
  'click .js-new-competitor'() {
    if (isNotLoggedIn()) return

    Modal.open('newCompetitorModal')
  },
  'click .js-request-competitor'() {
    if (isNotLoggedIn()) return

    Modal.open('requestCompetitorModal', {
      name: FlowRouter.getParam('company'),
    })
  },
  'click .js-become-validator'() {
    if (isNotLoggedIn()) return

    Modal.open('addValidatorModal')
  },
})

Template.sideBar.helpers({
  company: () => FlowRouter.getParam('company'),
})

Template.sideBar.onCreated(function() {
  const debouncedSearch = _.debounce(() => {
    const company = FlowRouter.getParam('company')
    const getCompetitors = denodeify(Meteor.call)

    this.data.loading.set(true)
    this.data.searchEmpty.set(_.isEmpty(company))

    getCompetitors('competitors.get', company)
    .then(list => this.data.listCompetitors.set(list))
    .catch(error => window.alert(error))
    .done(() => this.data.loading.set(false))
  }, 300)

  this.autorun(() => {
    FlowRouter.watchPathChange()
    debouncedSearch()
  })
})
