import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const Companies = new Mongo.Collection('companies')

Companies.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
})

Companies.schema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()}
      } else {
        this.unset()
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue() {
      if (this.isUpdate) {
        return new Date()
      }
    },
    denyInsert: true,
    optional: true,
  },
  name: {
    label: 'Company name',
    type: String,
    max: 150,
  },
  url: {
    label: 'Url',
    type: String,
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
      },
      lng: {
        label: 'longitude',
        type: Number,
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
    type: [String],
  },
})

Companies.attachSchema(Companies.schema)

export default Companies