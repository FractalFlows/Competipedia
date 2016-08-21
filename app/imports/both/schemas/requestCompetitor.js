import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export default new SimpleSchema({
  name: {
    label: 'Company name',
    type: String,
  },
  description: {
    label: 'Describe what this company does so we can find it competitors',
    type: String,
  },
  captchaData: {
    type: String,
  }
})