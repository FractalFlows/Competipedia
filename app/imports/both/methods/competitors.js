import { Meteor } from 'meteor/meteor'

Meteor.methods({
  'competitors.get'(name) {
    const company = Companies.findOne({name})

    if (!company) return []

    return Companies.find({categories: {$in: company.categories}}).fetch()
  }
})