UI.registerHelper("there_is", function(value){
  return this.hasOwnProperty(value)
});

let vect = () => Session.get('vect')

Template.NavbarHeader.helpers({
  type_template() {
    console.log(this);
    if (this.type === "doi") {return "DOI_Title"}
    return "DefaultTitle"
  },
});


Template.DOI_Navbar.helpers({
  publication: function(){
    let publi = URI.findOne({doi: this.doi});
    if ( typeof publi == "undefined" ) {
      Meteor.call('register', doi=this.doi);
      return {title: 'loading ...'}
    } else {return publi}},
});


function find_in_menu(id) {
  var item = menu.map(function(e){
    if (e.id == id) return e;
    if (e.hasOwnProperty('items')) {
      // We do the same for the nested items
      return e.items.map(e2 => (e2.id == id)? e2: undefined)
                    .filter(e3 => e3)[0]
    }
  }).filter(e4 => e4)[0];
  return item
}

Template.Menubar.helpers({
  item: () => menu,
  url: () => null,
});


Template.Menubar.events({
  "click .navbar_link": function(event, template){
      event.preventDefault();
      // Get the corresponding item in the menu array
      let item = find_in_menu(event.target.id);
      item.vect = Session.get('vect');
      console.log('you clicked on this',item);
      // Update the modal with its content
      Session.set('modalcontext', item);
      // Show the modal
      $('#modal').modal('show');
  }
});


/* Side menu */

var Sidemenu = [
  {text: "Add", items: [
    Meteor.elements.competitor,
  ],},
  // {text: "Popularize", items: [
  //   Meteor.elements.keyword,
  // ],},
  {text: "Request", items: [
//    {text: "To the Oracles", separator: false},
//    {text: "New validation"},
//    {text: "To the Users", separator: true},
    Meteor.elements.requestnew,
  ]},
  {text: "Filter", items: [
    {text: "by continent", icon: "fa-globe", id:"filter"},
    {text: "by country", icon: "fa-globe", id:"filter"},
    {text: "by city", icon: "fa-globe", id:"filter"},
    {text: "by village", icon: "fa-globe", id:"filter"},
    {text: "Geolocate me!", icon: "fa-globe", id:"filter"}
  ],}
];




function find_in_Sidemenu(id) {
  var item = Sidemenu.map(function(e){
    if (e.id == id) return e;
    if (e.hasOwnProperty('items')) {
      // We do the same for the nested items
      return e.items.map(e2 => (e2.id == id)? e2: undefined)
                    .filter(e3 => e3)[0]
    }
  }).filter(e4 => e4)[0];
  return item
}


Template.SideMenubar_main.helpers({
  item: () => Sidemenu,
  url: () => null,
});


Template.SideMenubar_main.events({
  "click .sidebar_link": function(event, template){
      event.preventDefault();
      // Get the corresponding item in the menu array
      let item = find_in_Sidemenu(event.target.id);
      item.vect = Session.get('vect');
      console.log('you clicked on this',item);
      // Update the modal with its content
      Session.set('modalcontext', item);
      // Show the modal
      $('#modal').modal('show');
  }
});
