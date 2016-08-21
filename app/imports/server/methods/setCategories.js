import { Meteor } from 'meteor/meteor'
import Categories from '/imports/both/collections/categories'

const { categories } = Meteor.settings

Categories.remove({})

categories.map(category => Categories.insert({name: category}))
