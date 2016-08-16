import { Meteor } from 'meteor/meteor'
import Companies from '/imports/both/collections/companies'

Meteor.methods({
  'competitors.get'(name) {
    const company = Companies.findOne({name: { $regex: RegExp(name, 'i')}})

    if (!company) return []

    const { _id, categories } = company

    return Companies.find({
      _id: {$ne: _id},
      categories: {$in: categories},
      isValid: true,
    }).fetch()
  }
})