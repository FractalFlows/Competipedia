import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

Template.addValidatorModal.helpers({
  schema: () => Meteor.users.schema,
})