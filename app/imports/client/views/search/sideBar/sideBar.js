import { Template } from 'meteor/templating'

Template.sideBar.helpers({
  item() {
    return [
      {
        text: 'Filter',
        items: [
          {text: 'by continent', icon: 'fa-globe', id:'filter'},
          {text: 'by country', icon: 'fa-globe', id:'filter'},
          {text: 'by city', icon: 'fa-globe', id:'filter'},
          {text: 'by village', icon: 'fa-globe', id:'filter'},
          {text: 'Geolocate me!', icon: 'fa-globe', id:'filter'},
        ],
      }
    ]
  }
})