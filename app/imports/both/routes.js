import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

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
  action: () => BlazeLayout.render('actionLayout', { content: 'confirmValidatorUser'}),
})

FlowRouter.route('/deny-validator/:validatorUserId?', {
  name: 'denyValidatorUser',
  action: () => BlazeLayout.render('actionLayout', { content: 'denyValidatorUser'}),
})

FlowRouter.route('/confirm-company/:companyId?/:userId?', {
  name: 'confirmNewCompany',
  action: () => BlazeLayout.render('actionLayout', { content: 'confirmNewCompany'}),
})

FlowRouter.route('/deny-company/:companyId?/:userId?', {
  name: 'denyNewCompany',
  action: () => BlazeLayout.render('actionLayout', { content: 'denyNewCompany'}),
})

FlowRouter.route('/dashboard', {
  name: 'dashboard',
  action: () => BlazeLayout.render('actionLayout', { content: 'dashboard'}),
})

FlowRouter.notFound = {
  action: () => BlazeLayout.render('mainLayout', { content: 'home'}),
}

