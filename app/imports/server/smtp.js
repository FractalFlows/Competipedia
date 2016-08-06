import { Meteor } from 'meteor/meteor'

const {username, password, server, port} = Meteor.settings

process.env.MAIL_URL = `smtp://${username}:${password}@${server}:587`

