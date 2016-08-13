import { Mongo } from 'meteor/mongo'

const Categories = new Mongo.Collection('categories')

Categories.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
})

export default Categories