import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

Template.search.helpers({
  searchEmpty: () => Template.instance().searchEmpty,
  searchEmptyGet: () => Template.instance().searchEmpty.get(),

  loading: () => Template.instance().loading,
  loadingGet: () => Template.instance().loading.get(),

  listCompetitors: () => Template.instance().listCompetitors,
  listCompetitorsGet: () => Template.instance().listCompetitors.get(),

  isValid() {
    return this.isValid ? 'green-tick' : 'red-tick'
  }
})

Template.search.onCreated(function() {
  this.loading = new ReactiveVar(true)
  this.listCompetitors = new ReactiveVar([])
  this.searchEmpty = new ReactiveVar(true)
})