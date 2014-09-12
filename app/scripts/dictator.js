'use strict';

var $ = require('jquery'),
  Firebase = require("firebase");

/**
 * Dictator - A module for showing a who's the dictator.
 * @module dictator
 * @PublicMethod Init
 */

module.exports = (function () {
  var button,
    dictatorWeek,
    dictatorName,
    myFirebaseRef;

  var config = {
    firebaseURL: 'https://fiery-torch-4818.firebaseio.com/'
  };

  function Init() {
    myFirebaseRef = new Firebase(config.firebaseURL);
    button = $('.js-dictator__button');
    //readAllFromFirebase();
    readSingleFromFirebase();
    button.click(function () {
      addDictotor();
      writeToFireBase();
    });
  }

  function addDictotor() {
    dictatorWeek = parseInt($('.dictator__week input').val(), 10);
    dictatorName = $('.dictator__name input').val();
  }

  function writeToFireBase() {
    myFirebaseRef.child("dictator/" + dictatorName).set({
      week: dictatorWeek
    });
  }

  function readAllFromFirebase() {
    myFirebaseRef.child("dictator").on('value', function (snapshot) {
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code);
    });
  }

  function readSingleFromFirebase() {
    myFirebaseRef.child("dictator").on('child_added', function (snapshot) {
      var snapshotValue = snapshot.val(),
        snapshotName = snapshot.name();
      console.log("Name:" + snapshotName + " Week:" + snapshotValue.week);
      $('.dictator_output__list').append('<li><input id="' + snapshotName + '" type="checkbox"><label for="' + snapshotName + '">' + 'Namn:' + snapshotName +' Vecka:'+ snapshotValue.week + '</label></li>');
    });
  }

  return {
    Init: Init,
    config: config
  };
}());
