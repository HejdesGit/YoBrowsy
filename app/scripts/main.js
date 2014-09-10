/**
 * scripts/main.js
 *
 * This is the starting point for your application.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';
var random = require('./random');
var dictator = require('./dictator');
var week = require('./week');
var card = require('./card');

random.Init();
dictator.Init();
week.Init();
card.Init();
