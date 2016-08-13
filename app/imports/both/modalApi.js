import { Template } from 'meteor/templating'
import { AccountsTemplates } from 'meteor/useraccounts:core'
import $ from 'jquery'
import _ from 'lodash'

export const Modal = {
  views: [],
  open(templateName, data) {
    AccountsTemplates.avoidRedirect = true

    const template = Template[templateName]
    const subTemplate = _.get(data, 'subTemplate')
    const view = Blaze.renderWithData(template, data, $('body').get(0))

    view.templateName = templateName
    view.subTemplate = subTemplate
    this.views.push(view)

    const modalSelector = subTemplate ?
      `.modal.${templateName}.${subTemplate}` :
      `.modal.${templateName}`

    $(modalSelector).modal('show')

    $(modalSelector).on('hide.bs.modal', () => {
      Blaze.remove(this.views.pop())
    })

    $(modalSelector).on('hidden.bs.modal', () => {
      AccountsTemplates.clearState()
      AccountsTemplates.avoidRedirect = false
    })


  },

  close() {
    if (this.views.length) {
      const lastView = this.views[this.views.length - 1];
      const templateName = lastView.templateName;
      const subTemplate = lastView.subTemplate;

      const modalSelector = subTemplate ?
        `.modal.${templateName}.${subTemplate}` :
        `.modal.${templateName}`

      $('body').find(modalSelector).modal('hide')
    }
  },

  closeByName({templateName, subTemplate}) {
    const modalSelector = subTemplate ?
      `.modal.${templateName}.${subTemplate}` :
      `.modal.${templateName}`

    $('body').find(modalSelector).modal('hide')
  },
};