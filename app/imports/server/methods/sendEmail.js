import { Meteor } from 'meteor/meteor'
import { Email } from 'meteor/email'
import handlebars from 'handlebars'
import fs from 'fs'

Meteor.methods({
  'sendEmail'({to, from, subject, view, data}) {
    this.unblock()

    const path = Assets.absoluteFilePath(`emailViews/${view}.hbs`)
    const source = fs.readFileSync(path, 'utf8')
    const template = handlebars.compile(source)
    const html = template(data)

    Email.send({
      to,
      from,
      subject,
      html,
    }, () => console.log('Email sent!'))
  }
})
