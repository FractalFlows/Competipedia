import { Meteor } from 'meteor/meteor'
import { Companies } from '/imports/both/collections/companies'

Meteor.methods({
  'dev/createCompanies'(){
    const base = {
      isValid: true,
      categories: ['blade', 'blade design'],
    }

    [
      {
        ...base,
        name: 'Astrocoders',
        url: 'http://astrocoders.com',
        location: {
          address: 'Красная Площадь, Moscow'
          lat: '55.7539816',
          lng: '37.6208647',
        },
      },
      {
        ...base,
        name: 'Earthcoders',
        url: 'http://earthcoders.com',
        location: {
          address: 'Мавзолей В. И. Ленина, Moscow',
          lat: '55.753935',
          lng: '37.6208425',
        },
      },
      {
        ...base,
        name: 'Marscoders',
        url: 'http://marscoders.mars.com',
        location: {
          address: 'школа танцев МАРТЭ, Sushchevskaya ul., 21, Moskva',
          lat: '55.7824475',
          lng: '37.599259',
        },
      },
    ].forEach(company => {
      Companies.insert(company)
    })

    return true
  },
})
