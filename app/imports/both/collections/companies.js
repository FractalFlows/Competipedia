import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import Categories from './categories'
import { Roles } from 'meteor/alanning:roles'

const Companies = new Mongo.Collection('companies')

Companies.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
})

Companies.schema = new SimpleSchema({
  createdAt: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isInsert) {
        return new Date()
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()}
      } else {
        this.unset()
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isUpdate) {
        return new Date()
      }
    },
    denyInsert: true,
  },
  name: {
    label: 'Company name',
    index: true,
    type: String,
    max: 150,
  },
  url: {
    label: 'Url',
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    max: 150,
  },
  location: {
    type: new SimpleSchema({
      address: {
        label: 'Address',
        type: String,
      },
      lat: {
        label: 'Latitude',
        type: Number,
        optional: true,
      },
      lng: {
        label: 'longitude',
        type: Number,
        optional: true,
      },
    }),
  },
  details: {
    label: 'Details',
    type: String,
    max: 1000,
    optional: true,
  },
  categories: {
    label: 'Categories',
    index: true,
    type: [String],
    autoform: {
      type: 'select2',
      options: () => setOptionsCategories(Categories.find().fetch()),
      afFieldInput: {
        multiple: true,
        select2Options: {
          placeholder: 'Add categories',
        }
      }
    },
  },
  isValid: {
    label: 'Is valid?',
    index: true,
    type: Boolean,
    optional: true,
    autoValue() {
      if (Roles.userIsInRole(this.userId, ['validator', 'admin'])) return true
      return false
    }
  },
})

/**
 * Helpers
 */

function setOptionsCategories (categories) {
  return categories.map(({name}) => ({ label:name , value:name }))
}

/**
 * Exports
 */

Companies.attachSchema(Companies.schema)
export default Companies