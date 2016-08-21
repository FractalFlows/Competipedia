import { Template } from 'meteor/templating'
import Companies from '/imports/both/collections/companies'
import { AutoForm } from 'meteor/aldeed:autoform'
import { Modal } from '/imports/both/modalApi'
import toastr from 'toastr'

Template.newCompanyModal.helpers({
  schema: () => Companies.schema,
})

Template.newCompanyModal.onCreated(function() {
  this.subscribe('categories')
})

Template.newCompanyModal.onRendered(function() {
  this.$('[name="location.address"]').geocomplete({
    details: '#newCompanyModal',
    detailsAttribute: 'data-geo',
  })
})

AutoForm.hooks({
  newCompanyModal: {
    onSuccess() {
      toastr.success('Company add with success!')
      Modal.close()
    }
  }
})


