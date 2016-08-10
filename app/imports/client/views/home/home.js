import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import $ from 'jquery'

/**
 * Home Events
 */

Template.home.events({
  'submit .search'(event, template) {
    event.preventDefault()
    const company = template.$('.company-name').val()

    FlowRouter.go('search', {company})
  }
})

/**
 * Home Hooks
 */

Template.home.onRendered(function() {
  $(".subtltType").typed({
    strings: ["Have you ever thought in the possibility to find new competitors?"],
    startDelay: 50,              // time before typing starts
    typeSpeed: 50, // typing speed
    backDelay: 500, // pause before backspacing
    loop: true, // loop on or off (true or false)
    loopCount: false, // number of loops, false = infinite
    contentType: 'html', // or 'text'
    showCursor: true,
    cursorChar: "|",
    callback: function(){ } // call function after typing is done
  })
})
