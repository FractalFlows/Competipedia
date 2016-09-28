import { Meteor } from 'meteor/meteor'
import Companies from '/imports/both/collections/companies'

Meteor.methods({
  'competitors.get'(name) {
    const company = Companies.findOne({
      name: {$regex: RegExp(name, 'i')},
      isValid: true,
    })

    if (!company) return []

    const { _id, categories } = company

    return Companies.find({
      _id: {$ne: _id},
      categories: {$in: categories},
      isValid: true,
    }).fetch()
  },

  'competitors.getAll'(){
    return Companies
      .find({
        isValid: true,
      }, {
        fields: {
          name: 1,
          categories: 1,
        },
      })
      .map(company => ({
        name: company.name,
        categories: company.categories,
        competitors: Meteor.call('competitors.get', company.name),
      }))
  }
})
