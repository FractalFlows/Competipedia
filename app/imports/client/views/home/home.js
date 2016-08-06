import { Template } from 'meteor/templating'
import $ from 'jquery'

/**
 * Home Events
 */

/**
 * Home Hooks
 */

Template.home.onRendered(function() {
  $(".subtltType").typed({
    strings: ["on the <em>Blockchain!</em>"],
    startDelay: 50,              // time before typing starts
    typeSpeed: 50, // typing speed
    backDelay: 500, // pause before backspacing
    loop: true, // loop on or off (true or false)
    loopCount: false, // number of loops, false = infinite
    contentType: 'html', // or 'text'
    showCursor: true,
    cursorChar: "|",
    callback: function(){ } // call function after typing is done
  });

  $(".actionsType").typed({
    strings: ["<em>Track </em>","<em>Share </em>",
    "<em>Discover </em>","<em>Review </em>"],
    startDelay: 1000,              // time before typing starts
    typeSpeed: 50, // typing speed
    backDelay: 5000, // pause before backspacing
    loop: true, // loop on or off (true or false)
    loopCount: false, // number of loops, false = infinite
    contentType: 'html', // or 'text'
    showCursor: true,
    cursorChar: "|",
    callback: function(){ } // call function after typing is done
  });

  $("#typed").typed({
    stringsElement: $('#typed-strings'),
    startDelay: 50,              // time before typing starts
    typeSpeed: 50, // typing speed
    backDelay: 750, // pause before backspacing
    loop: true, // loop on or off (true or false)
    loopCount: false, // number of loops, false = infinite
    contentType: 'html', // or 'text'
    showCursor: true,
    cursorChar: "|",
    callback: function(){ } // call function after typing is done
  });

});
