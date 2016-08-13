import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'
import { Roles } from 'meteor/alanning:roles'
import { Meteor } from 'meteor/meteor'

FlowRouter.route('/', {
  name: 'home',
  action: () => BlazeLayout.render('mainLayout', { content: 'home'}),
})

FlowRouter.route('/search/:company?', {
  name: 'search',
  action: () => BlazeLayout.render('mainLayout', { content: 'search'}),
})

FlowRouter.route('/confirm-validator/:validatorUserId?', {
  name: 'confirmValidatorUser',
  action: () => BlazeLayout.render('validatorsLayout', { content: 'confirmValidatorUser'}),
})

FlowRouter.route('/deny-validator/:validatorUserId?', {
  name: 'denyValidatorUser',
  action: () => BlazeLayout.render('validatorsLayout', { content: 'denyValidatorUser'}),
})

FlowRouter.notFound = {
  action: () => BlazeLayout.render('mainLayout', { content: 'home'}),
}

