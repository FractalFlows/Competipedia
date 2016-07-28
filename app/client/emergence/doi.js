Meteor.subscribe("uri");
Meteor.subscribe("events");

Session.setDefault("events", []);

Session.setDefault("DOI", undefined);

UI.registerHelper("equals", (a, b) => (a == b));
UI.registerHelper('formatTime', c =>  moment(c).format('MM/DD/YYYY, hh:mm'));
UI.registerHelper('shortSHA', sha => sha.slice(0, 5));
UI.registerHelper("not_undefined", val => !val);
UI.registerHelper("undefined", val => (typeof val === "undefined"));
UI.registerHelper("stringify", val => JSON.stringify(val, {indent: true}))


Template.DOI_Summary.helpers({
  summaries: function() {}, //{ return URI.findOne({doi:this.doi}).summaries },
  edit: function() {return get.Session("edit_summary") === this.id},
});

Template.DOI_Summary.events({
  "click #add_new_summary": function(event, template){
    let summaries = URI.findOne({doi:this.doi}).summaries;
    if (summaries) {
      summaries.append({text: "", author: Meteor.user().username, id: summaries.length+1})
    } else {
      let summaries = [{text: "", author: Meteor.user().username, id: 1}];
    }
    URI.update({doi}, {$set:{summaries}})
    Session.set("edit_summary", summaries.length);
    console.log("new summary", summaries)
  }
});

Template.DOI_Citations.helpers({
  citation: [{names: "Rethore et al.", year: 2013},
             {names: "Abdallah et al.", year: 2013}],
});

Template.DOI_CitedBy.helpers({
  citation: [{names: "Rethore et al.", year: 2013},
             {names: "Abdallah et al.", year: 2013}],
});


Template.DOI_Related.helpers({
  event: function() {
    return Events.find({doi: this.doi}, {sort:{created_at:-1}})},
  checked: function() {
    return Session.get("checked_git_repo_"+this.origine.user+'_'+this.origine.repo);
  },
  supported: val => (['PushEvent', 'IssueEvent'].indexOf(val) > -1),
});

Template.DOI_Related.events({
  "click .rest-call": function(event, template){
      Meteor.call('populate', this.doi);
  },
});

Template.DOI_pdf.helpers({
  src: function() {
    let uri = URI.findOne({doi: this.doi})
    return !uri? "" : uri.hasOwnProperty('pdf_src')? uri.pdf_src: ""
  },
});

Template.DOI_pdf.events({
  "click .get_pdf": function(event, template){
    console.log('in DOIpdf client');
      Meteor.call('scihub', this.doi);
  },
});


Template.Relationships.helpers({
  relationship: () => {
    console.log(this.doi);
    return [
      Meteor.elements.competitor,
      Meteor.elements.model,
    ]},
  item: function(_id){
    var rel = Relationships.find({type:_id, doi:Session.get("DOI")});
    console.log('item', _id, Session.get("DOI"), rel, this);
    return rel
  },
  item_text: function(){return this[this.type]},
});
