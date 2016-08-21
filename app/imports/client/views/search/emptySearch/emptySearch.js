import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Modal } from '/imports/both/modalApi'
import { Meteor } from 'meteor/meteor'

Template.emptySearch.events({
  'click .js-request-competitor'() {

    Modal.open('requestCompetitorModal', {
      name: FlowRouter.getParam('company'),
    })
  },
})