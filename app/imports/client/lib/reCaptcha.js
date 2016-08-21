import { reCAPTCHA } from 'meteor/altapp:recaptcha'

const { reCAPTCHAPublicKey } = Meteor.settings.public

reCAPTCHA.config({
  publickey: reCAPTCHAPublicKey,
  hl: 'en_us',
})