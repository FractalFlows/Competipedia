import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import $ from 'jquery'

/**
 * Home Events
 */

Template.home.events({
  'submit .search'(event, template) {
    event.preventDefault()
    const company = template.$('.company-name').val()

    FlowRouter.go('search', {company})
  }
})