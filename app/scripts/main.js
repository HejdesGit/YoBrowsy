/**
 * scripts/main.js
 *
 * This is the starting point for your application.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';
require('jquery');
window.jQuery = require('jquery');
window.jquery = require('jquery');
require('FlipClock');
var random = require('./random');

random.Init();
