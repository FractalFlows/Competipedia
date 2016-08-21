import { Mongo } from 'meteor/mongo'

const Categories = new Mongo.Collection('categories')

Categories.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
})

Categories.schema = new SimpleSchema({
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
    label: 'Categories name',
    index: true,
    type: String,
    max: 150,
  },
})

Categories.attachSchema(Categories.schema)
export default Categories