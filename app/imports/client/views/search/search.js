import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

Template.search.helpers({
  loading: () => Template.instance().loading,
  listCompetitors: () => Template.instance().listCompetitors,
  companies: () => Template.instance().listCompetitors.get(),
})

Template.search.onCreated(function() {
  this.loading = new ReactiveVar(true)
  this.listCompetitors = new ReactiveVar([])
})