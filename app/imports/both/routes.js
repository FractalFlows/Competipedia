import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

FlowRouter.route('/', {
  name: 'home',
  action: () => BlazeLayout.render('mainLayout', { content: 'home'}),
})

FlowRouter.route('/about', {
  name: 'about',
  action: () => BlazeLayout.render('mainLayout', { content: 'about'}),
})

FlowRouter.route('/search/:company', {
  name: 'search',
  action: () => BlazeLayout.render('mainLayout', { content: 'search'}),
})
