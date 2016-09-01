import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Modal } from '/imports/both/modalApi'
import isNotLoggedIn from '/imports/client/lib/isNotLoggedIn'

Template.emptySearch.events({
  'click .js-add-request-competitor'() {
    if (isNotLoggedIn()) return

    Modal.open('newCompetitorModal', {
      name: FlowRouter.getParam('company'),
      requestCompetitors: true,
    })
  },
})
