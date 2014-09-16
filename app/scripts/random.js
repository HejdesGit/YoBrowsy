'use strict';

var jQuery = require('jquery'),
  $ = jQuery,
  FlipClock = require('FlipClock');
/**
 * Random - A module for showing a randomized timer.
 * @module Random
 * @PublicMethod Init
 */

module.exports = (function () {
  var button,
    min,
    max,
    random,
    randomTimeRetrieved,
    timeRetrieved,
    secondsPast,
    randomTimeInSeconds;

  var config = {
    button: '.js-random__button',
    firebaseURL: 'https://fiery-torch-4818.firebaseio.com/'
  };

  function Init() {
    button = $(config.button);
    getLocalStorage();
    if (randomTimeRetrieved !== null) {
      var secondsPast = getSecondsPast();
      randomTimeInSeconds = randomTimeRetrieved * 60;
      if (randomTimeInSeconds > secondsPast) {
        displayTimeLeft();
      }
    }
    button.click(function () {
      event.preventDefault ? event.preventDefault() : event.returnValue = false;
      getMaxMin();
      getRandomNumber();
      displayRandomNumber();
      setLocalStorage();
      setTimeInFirebase();
    });
  }

  function setTimeInFirebase() {
    var firebaseURL = new Firebase(config.firebaseURL);
    var timeNow = new Date();
    var timeObject = {};
    timeObject[timeNow] = random;
    firebaseURL.child("StandUp/").update(timeObject);
  }

  function getSecondsPast() {
    var timeNow = new Date(),
      timeBefore = new Date(timeRetrieved),
      timeDifference = timeNow.getTime() - timeBefore.getTime();
    secondsPast = timeDifference / 1000;
    return secondsPast;
  }

  function getMaxMin() {
    min = parseInt($('.random_inputs__minutes--min').val(), 10);
    max = parseInt($('.random_inputs__minutes--max').val(), 10);
  }

  function getRandomNumber() {
    random = Math.floor(Math.random() * (max - min + 1) + min);
  }

  function displayTimeLeft() {
    var timeleft = randomTimeInSeconds - secondsPast;
    $('.clock').FlipClock(timeleft, {
      language: 'sv',
      countdown: true,
      callbacks: {
        stop: function () {
          $('.random_message__dispaly').html('Bra jobbat!');
        }
      }
    });
  }

  function displayRandomNumber() {
    $('.clock').FlipClock(random * 60, {
      language: 'sv',
      countdown: true,
      callbacks: {
        stop: function () {
          $('.random_message__dispaly').html('Bra jobbat!');
        }
      }
    });
  }

  function getLocalStorage() {
    randomTimeRetrieved = localStorage.getItem('randomTime');
    timeRetrieved = localStorage.getItem('timeDate');
  }

  function setLocalStorage() {
    localStorage.setItem('randomTime', random);
    localStorage.setItem('timeDate', new Date());
  }

  return {
    Init: Init,
    config: config
  };
}());
