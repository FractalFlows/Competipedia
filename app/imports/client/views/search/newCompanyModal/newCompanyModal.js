import { Template } from 'meteor/templating'
import Companies from '/imports/both/collections/companies'

Template.newCompanyModal.helpers({
  schema: () => Companies.schema,
})
