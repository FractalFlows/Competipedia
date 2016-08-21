import { Meteor } from 'meteor/meteor'
import Categories from '/imports/both/collections/categories'

Meteor.publish('categories', function() {
  return Categories.find()
})