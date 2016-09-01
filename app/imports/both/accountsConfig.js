import { AccountsTemplates } from 'meteor/useraccounts:core'
import { Meteor } from 'meteor/meteor'
import { Modal } from '/imports/both/modalApi'
import _ from 'lodash'
import toastr from 'toastr'

AccountsTemplates.configure({
  // Behavior
  confirmPassword: true,
  enablePasswordChange: true,
  overrideLoginErrors: true,
  sendVerificationEmail: true,
  lowercaseUsername: true,
  focusFirstInput: true,

  // Appearance
  showForgotPasswordLink: true,
  showLabels: false,
  showPlaceholders: true,
  showResendVerificationEmailLink: false,

  // Template
  defaultLayout: 'accountsLayout',
  defaultLayoutRegions: {},
  defaultContentRegion: 'content',

  onSubmitHook: (error, state) => {
    if (error) return

    if (state === 'signUp') {
      toastr.warning('Please access the email we just sent you and click in the link to verify your account')
    }

    if (state === 'signUp' && _.get(Meteor.user(), 'profile.validator')) {
      Modal.close({
        templateName: 'accountsModal',
        subTemplate: 'signUp',
      })

      Modal.open('addValidatorModal')

      return
    }

    Modal.close()
  },

})

AccountsTemplates.addField({
  _id: 'validator',
  type: 'checkbox',
  displayName: 'Be a validator and help us check if companies are real',
})

AccountsTemplates.configureRoute('signIn')
AccountsTemplates.configureRoute('signUp')
AccountsTemplates.configureRoute('enrollAccount')
AccountsTemplates.configureRoute('verifyEmail')
AccountsTemplates.configureRoute('resendVerificationEmail')
AccountsTemplates.configureRoute('changePwd')
AccountsTemplates.configureRoute('forgotPwd')
AccountsTemplates.configureRoute('resetPwd')
