import { Meteor } from 'meteor/meteor'

Meteor.methods({
  'competitors.get'(company) {
    check({company}, {
      company: String,
    })

    const company = Companies.findOne({name: company})

    if (!company) return []

    return Companies.find({categories: {$in: company.categories}}).fetch()
  }
})