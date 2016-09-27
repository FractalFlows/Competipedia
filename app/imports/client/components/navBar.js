import { Template } from 'meteor/templating'
import { Modal } from '/imports/both/modalApi'
import _ from 'lodash'

Template.navBar.events({
  'click .js-sign-up'(event, template) {
    event.preventDefault()

    Modal.open('accountsModal', {
      state: 'signUp',
      subTemplate: 'signUp',
    })
  },
  'click .js-sign-in'(event, template) {
    event.preventDefault()

    Modal.open('accountsModal', {
      state: 'signIn',
      subTemplate: 'signIn',
    })
  },

  'click .js-change-password'(event, template) {
    event.preventDefault()

    Modal.open('accountsModal', {
      state: 'changePwd',
      subTemplate: 'changePwd',
    })
  },

  'click .js-logout'(event, template) {
    event.preventDefault()

    Meteor.logout()
    FlowRouter.go('/')
  },
})

Template.navBar.helpers({
  isFixed: () =>
    _.get(Template.instance(), 'data.isFixed') ? 'navbar-fixed-top' : '',
})
