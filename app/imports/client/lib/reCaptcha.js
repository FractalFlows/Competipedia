import { reCAPTCHA } from 'meteor/astrocoders:recaptcha'

const { reCAPTCHAPublicKey } = Meteor.settings.public

reCAPTCHA.config({
  publickey: reCAPTCHAPublicKey,
  hl: 'en_us',
})