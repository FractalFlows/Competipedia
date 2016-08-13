import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Meteor } from 'meteor/meteor'

Template.denyValidatorUser.onCreated(function() {
  const validatorUserId = FlowRouter.getParam('validatorUserId')
  Meteor.call('denyValidatorUser', validatorUserId)
})