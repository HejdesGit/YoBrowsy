'use strict';


/**
 * Week - A module for showing week number.
 * @module week
 * @PublicMethod Init
 */

module.exports = (function () {
  function Init() {
    getWeek();
  }


  function getWeek() {
    Date.prototype.getWeek = function () {
      var onejan = new Date(this.getFullYear(), 0, 1);
      return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    };

    var weekNumber = (new Date()).getWeek();

    var dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var now = new Date();
    console.log(weekNumber);
  }

  return {
    Init: Init
  };
}());
