import { Meteor } from 'meteor/meteor'
import { resetDatabase } from 'meteor/xolvio:cleaner'
import './createUsers'
import './createCompanies'

Meteor.methods({
  'dev/resetDatabase'(){
    resetDatabase()
  }
})
