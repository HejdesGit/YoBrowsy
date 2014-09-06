/**
 * Created by Johan on 2014-09-06.
 */
'use strict';

var $ = require('jquery');

/**
 * NAME
 * @module ModuleName
 * @PublicMethod PublicMethod
 * @return return
 */
module.exports = (function () {
  var button,
    min,
    max,
    random,
    randomTimeRetrieved,
    timeRetrieved;

  function Init() {
    button = $('.js-random__button');
    getLocalStorage();
    button.click(function () {
      getMaxMin();
      getRandomNumber();
      printRandomNumber();
      setLocalStorage();
    });
  }
  function getMaxMin() {
    min = parseInt($('.random__minutes--min').val(), 10);
    max = parseInt($('.random__minutes--max').val(), 10);
  }
  function getRandomNumber() {
    random = Math.floor(Math.random() * (max - min + 1) + min);
  }
  function printRandomNumber(){
    var clock = $('.clock').FlipClock(random*60, {
      language: 'sv',
      countdown: true,
      callbacks: {
        stop: function() {
          $('.message').html('Bra jobbat!')
        }
      }
    });
  }
  function getLocalStorage(){
    randomTimeRetrieved = localStorage.getItem('randomTime');
    timeRetrieved = localStorage.getItem('timeDate');
  }
  function setLocalStorage(){
    localStorage.setItem('randomTime', random);
    localStorage.setItem('timeDate', new Date());
  }
  return {
    Init: Init
  };
}());
