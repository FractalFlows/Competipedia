import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export default new SimpleSchema({
  name: {
    label: 'Request competitors to',
    type: String,
  },
  description: {
    label: 'Details',
    type: String,
  },
  captchaData: {
    type: String,
  }
})