import { Meteor } from 'meteor/meteor'
import { Modal } from '/imports/both/modalApi'
import toastr from 'toastr'

export default function() {
  if (!Meteor.userId()) {
    Modal.open('accountsModal', {
      subTemplate: 'signIn',
      state: 'signIn',
    })

    return true
  }

  if (!Meteor.user().emails[0].verified) {
    toastr.warning('Please validate your email before proceeding')
    return true
  }
}
