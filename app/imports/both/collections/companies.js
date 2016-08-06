import { Mongo } from 'meteor/mongo'

const Companies = new Mongo.Collection('companies')

Companies.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
})

export default Companies