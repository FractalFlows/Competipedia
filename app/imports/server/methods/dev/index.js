import { Meteor } from 'meteor/meteor'
import { resetDatabase } from 'meteor/xolvio:cleaner'
import './createUsers'

Meteor.methods({
  'dev/resetDatabase'(){
    resetDatabase()
  }
})
