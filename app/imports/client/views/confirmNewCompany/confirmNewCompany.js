import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Meteor } from 'meteor/meteor'

Template.confirmNewCompany.onCreated(function() {
  const companyId = FlowRouter.getParam('companyId')
  const userId = FlowRouter.getParam('userId')
  Meteor.call('confirmNewCompany', {companyId, userId})
})