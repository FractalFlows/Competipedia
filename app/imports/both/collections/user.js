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
  profile: {
    type: Object
  },
  'profile.firstName': {
    label:'First name',
    type: String,
    optional: true,
    custom() {
      if (this.userId && !this.value) return 'required'
    }
  },

  'profile.lastName': {
    label:'Last name',
    type: String,
    optional: true,
    custom() {
      if (this.userId && !this.value) return 'required'
    }
  },

  'profile.phone': {
    label:'Phone number',
    type: String,
    optional: true,
    custom() {
      if (this.userId && !this.value) return 'required'
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

  'profile.validator': {
    label:'validator',
    type: Boolean,
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