import { Meteor } from 'meteor/meteor'
import { Email } from 'meteor/email'
import handlebars from 'handlebars'
import fs from 'fs'

Meteor.methods({
  'sendEmail'({to, from, subject, view, data}) {
    this.unblock()

    console.log("Email sent!");

    const base = process.env.PWD
    const path = `${base}/imports/server/views/${view}.hbs`
    const source = fs.readFileSync(path,'utf8')
    const template = handlebars.compile(source)
    const html = template(data)

    Email.send({
      to,
      from,
      subject,
      html,
    })
  }
})
