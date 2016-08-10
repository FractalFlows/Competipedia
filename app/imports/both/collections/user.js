import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

Meteor.users.schema = new SimpleSchema({
  updatedAt: {
    type: Date,
    autoValue() {
      if (this.isUpdate) return new Date()
    },
    denyInsert: true,
    optional: true,
  },
  username: {
    label: 'Username',
    type: String,
    optional: true,
  },
  emails: {
    type: [Object],
    optional: true
  },
  'emails.$.address': {
    label: 'Email',
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  'emails.$.verified': {
    type: Boolean,
    optional: true
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: Object
  },
  'profile.firstName': {
    label:'First name',
    type: String,
    custom() {
      if (this.userId) return 'required'
      return null
    }
  },

  'profile.lastName': {
    label:'Last name',
    type: String,
    custom() {
      console.log(this);
      if (this.userId) return 'required'
      return null
    }
  },

  'profile.phone': {
    label:'Phone number',
    type: String,
    custom() {
      if (this.userId) return 'required'
      return null
    }
  },

  'profile.description': {
    label: 'Description (optional)',
    type: String,
    optional: true
  },

  'profile.facebook': {
    label:'Link facebook',
    type: String,
    optional: true
  },

  'profile.website': {
    label:'Website',
    type: String,
    optional: true
  },

  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: [String],
    optional: true
  },
})

Meteor.users.attachSchema(Meteor.users.schema)