import { EasySearch } from 'meteor/easy:search'
import Companies from './collections/companies'

export const easySearchGetCompanies = new EasySearch.Index({
  name: 'getCompanies',
  collection: Companies,
  fields: ['categories'],
  engine: new EasySearch.MongoDB(),
})