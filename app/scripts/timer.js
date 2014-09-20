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
    urls: 'sound/StandUp.mp3'
  };

  var sound = new Howl({
    urls: [config.urls]
  });

  function Init() {
    var now = new Date();
    var millisTillStandUp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 52, 0, 0) - now;
    if (millisTillStandUp < 0) {
      millisTillStandUp += 86400000; // it's after stand up, try tomorrow.
    }

    setTimeout(function () {
      console.log("play sound");
      sound.play();
      Init();
    }, millisTillStandUp);
  }
  return {
    Init: Init,
    config: config
  };
}());
