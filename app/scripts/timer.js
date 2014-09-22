'use strict';

var $ = require('jquery');
var howler = require('howler');

/**
 * Timer - A module for timer.
 * @module timer
 * @PublicMethod Init
 */

module.exports = (function () {

  var config = {
    urls: 'sound/StandUp.mp3',
    time: {hours: 10, minutes: 30}
  };

  var sound = new Howl({
    urls: [config.urls]
  });

  function Init() {
    var minutes = getParameterByName('minutes');
    var hours = getParameterByName('hours');
    if (!isNaN(minutes)) {
      config.time.minutes = minutes;

    }
    if (!isNaN(hours)) {
      config.time.hours = hours;
    }
    var now = new Date();
    var millisTillStandUp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), config.time.hours, config.time.minutes, 0, 0) - now;
    if (millisTillStandUp < 0) {
      millisTillStandUp += 86400000; // it's after stand up, try tomorrow.
    }

    setTimeout(function () {
      console.log("play sound");
      sound.play();
      Init();
    }, millisTillStandUp);
  }

  function getParameterByName(name) {
    //if (typeof(name) !== 'undefined') {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    var number = results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    number = parseInt(number, 10)
    return number;
    //}
  }

  return {
    Init: Init,
    config: config
  };
}());
