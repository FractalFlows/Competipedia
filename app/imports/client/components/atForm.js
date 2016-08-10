import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Modal } from '/imports/both/modalApi'

Template.atForm.events({
  'click #at-signIn'(event, template) {
    event.preventDefault()

    Modal.closeByName({
      templateName: 'accountsModal',
      subTemplate: 'signUp',
    })

    Modal.open('accountsModal', {
      state: 'signIn',
      subTemplate: 'signIn',
    })

  },
  'click #at-signUp'(event, template) {
    event.preventDefault()

    Modal.closeByName({
      templateName: 'accountsModal',
      subTemplate: 'signIn',
    })

    Modal.closeByName({
      templateName: 'accountsModal',
      subTemplate: 'forgotPwd',
    })

    Modal.open('accountsModal', {
      state: 'signUp',
      subTemplate: 'signUp',
    })
  },

  'click #at-forgotPwd'(event, template) {
    event.preventDefault()

    Modal.closeByName({
      templateName: 'accountsModal',
      subTemplate: 'signIn',
    })

    Modal.open('accountsModal', {
      state: 'forgotPwd',
      subTemplate: 'forgotPwd',
    })
  },
})