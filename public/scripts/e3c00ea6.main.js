(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
;__browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/*! FlipClock 2014-08-25 */
var Base=function(){};Base.extend=function(a,b){"use strict";var c=Base.prototype.extend;Base._prototyping=!0;var d=new this;c.call(d,a),d.base=function(){},delete Base._prototyping;var e=d.constructor,f=d.constructor=function(){if(!Base._prototyping)if(this._constructing||this.constructor==f)this._constructing=!0,e.apply(this,arguments),delete this._constructing;else if(null!==arguments[0])return(arguments[0].extend||c).call(arguments[0],d)};return f.ancestor=this,f.extend=this.extend,f.forEach=this.forEach,f.implement=this.implement,f.prototype=d,f.toString=this.toString,f.valueOf=function(a){return"object"==a?f:e.valueOf()},c.call(f,b),"function"==typeof f.init&&f.init(),f},Base.prototype={extend:function(a,b){if(arguments.length>1){var c=this[a];if(c&&"function"==typeof b&&(!c.valueOf||c.valueOf()!=b.valueOf())&&/\bbase\b/.test(b)){var d=b.valueOf();b=function(){var a=this.base||Base.prototype.base;this.base=c;var b=d.apply(this,arguments);return this.base=a,b},b.valueOf=function(a){return"object"==a?b:d},b.toString=Base.toString}this[a]=b}else if(a){var e=Base.prototype.extend;Base._prototyping||"function"==typeof this||(e=this.extend||e);for(var f={toSource:null},g=["constructor","toString","valueOf"],h=Base._prototyping?0:1;i=g[h++];)a[i]!=f[i]&&e.call(this,i,a[i]);for(var i in a)f[i]||e.call(this,i,a[i])}return this}},Base=Base.extend({constructor:function(){this.extend(arguments[0])}},{ancestor:Object,version:"1.1",forEach:function(a,b,c){for(var d in a)void 0===this.prototype[d]&&b.call(c,a[d],d,a)},implement:function(){for(var a=0;a<arguments.length;a++)"function"==typeof arguments[a]?arguments[a](this.prototype):this.prototype.extend(arguments[a]);return this},toString:function(){return String(this.valueOf())}});var FlipClock;!function(a){"use strict";FlipClock=function(a,b,c){return"object"==typeof b&&(c=b,b=0),new FlipClock.Factory(a,b,c)},FlipClock.Lang={},FlipClock.Base=Base.extend({buildDate:"2014-06-03",version:"0.5.5",constructor:function(b,c){"object"!=typeof b&&(b={}),"object"!=typeof c&&(c={}),this.setOptions(a.extend(!0,{},b,c))},callback:function(a){if("function"==typeof a){for(var b=[],c=1;c<=arguments.length;c++)arguments[c]&&b.push(arguments[c]);a.apply(this,b)}},log:function(a){window.console&&console.log&&console.log(a)},getOption:function(a){return this[a]?this[a]:!1},getOptions:function(){return this},setOption:function(a,b){this[a]=b},setOptions:function(a){for(var b in a)"undefined"!=typeof a[b]&&this.setOption(b,a[b])}})}(jQuery),function(a){"use strict";FlipClock.Face=FlipClock.Base.extend({dividers:[],factory:!1,lists:[],constructor:function(a,b){this.dividers=[],this.lists=[],this.base(b),this.factory=a},build:function(){},createDivider:function(b,c,d){"boolean"!=typeof c&&c||(d=c,c=b);var e=['<span class="'+this.factory.classes.dot+' top"></span>','<span class="'+this.factory.classes.dot+' bottom"></span>'].join("");d&&(e=""),b=this.factory.localize(b);var f=['<span class="'+this.factory.classes.divider+" "+(c?c:"").toLowerCase()+'">','<span class="'+this.factory.classes.label+'">'+(b?b:"")+"</span>",e,"</span>"];return a(f.join(""))},createList:function(a,b){"object"==typeof a&&(b=a,a=0);var c=new FlipClock.List(this.factory,a,b);return this.lists.push(c),c},reset:function(){this.factory.time=new FlipClock.Time(this.factor,this.factory.original?Math.round(this.factory.original):0),this.flip(this.factory.original,!1)},addDigit:function(a){var b=this.createList(a,{classes:{active:this.factory.classes.active,before:this.factory.classes.before,flip:this.factory.classes.flip}});b.$el.append(this.factory.lists[this.factory.lists.length-1].$obj)},start:function(){},stop:function(){},autoIncrement:function(){this.factory.time.time instanceof Date||(this.factory.countdown?this.decrement():this.increment())},increment:function(){this.factory.time.addSecond()},decrement:function(){0==this.factory.time.getTimeSeconds()?this.factory.stop():this.factory.time.subSecond()},flip:function(b,c){var d=this;a.each(b,function(a,b){var e=d.lists[a];e?(c||b==e.digit||e.play(),e.select(b)):d.addDigit(b)})}})}(jQuery),function(a){"use strict";FlipClock.Factory=FlipClock.Base.extend({autoStart:!0,callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},classes:{active:"flip-clock-active",before:"flip-clock-before",divider:"flip-clock-divider",dot:"flip-clock-dot",label:"flip-clock-label",flip:"flip",play:"play",wrapper:"flip-clock-wrapper"},clockFace:"HourlyCounter",countdown:!1,defaultClockFace:"HourlyCounter",defaultLanguage:"english",language:"english",lang:!1,original:!1,face:!0,running:!1,time:!1,timer:!1,lists:[],$el:!1,$wrapper:!1,constructor:function(b,c,d){d||(d={}),this.lists=[],this.running=!1,this.base(d),this.$el=a(b).addClass(this.classes.wrapper),this.$wrapper=this.$el,this.original=c instanceof Date?c:c?Math.round(c):0,this.time=new FlipClock.Time(this,this.original,{minimumDigits:d.minimumDigits?d.minimumDigits:0,animationRate:d.animationRate?d.animationRate:1e3}),this.timer=new FlipClock.Timer(this,d),this.lang=this.loadLanguage(this.language),this.face=this.loadClockFace(this.clockFace,d),this.autoStart&&this.start()},loadClockFace:function(a,b){var c,d="Face";return a=a.ucfirst()+d,c=FlipClock[a]?new FlipClock[a](this,b):new FlipClock[this.defaultClockFace+d](this,b),c.build(),c},loadLanguage:function(a){var b;return b=FlipClock.Lang[a.ucfirst()]?FlipClock.Lang[a.ucfirst()]:FlipClock.Lang[a]?FlipClock.Lang[a]:FlipClock.Lang[this.defaultLanguage]},localize:function(a,b){var c=this.lang;if(!a)return null;var d=a.toLowerCase();return"object"==typeof b&&(c=b),c&&c[d]?c[d]:a},start:function(a){var b=this;b.running||b.countdown&&!(b.countdown&&b.time.time>0)?b.log("Trying to start timer when countdown already at 0"):(b.face.start(b.time),b.timer.start(function(){b.flip(),"function"==typeof a&&a()}))},stop:function(a){this.face.stop(),this.timer.stop(a);for(var b in this.lists)this.lists.hasOwnProperty(b)&&this.lists[b].stop()},reset:function(a){this.timer.reset(a),this.face.reset()},setTime:function(a){this.time.time=a,this.flip(!0)},getTime:function(){return this.time},setCountdown:function(a){var b=this.running;this.countdown=a?!0:!1,b&&(this.stop(),this.start())},flip:function(a){this.face.flip(!1,a)}})}(jQuery),function(a){"use strict";FlipClock.List=FlipClock.Base.extend({digit:0,classes:{active:"flip-clock-active",before:"flip-clock-before",flip:"flip"},factory:!1,$el:!1,$obj:!1,items:[],lastDigit:0,minimumDigits:0,constructor:function(a,b){this.factory=a,this.digit=b,this.lastDigit=b,this.$el=this.createList(),this.$wrapper=this.$el,b>0&&this.select(b),this.factory.$el.append(this.$el)},select:function(a){if("undefined"==typeof a?a=this.digit:this.digit=a,this.digit!=this.lastDigit){var b=this.$el.find("."+this.classes.before).removeClass(this.classes.before);this.$el.find("."+this.classes.active).removeClass(this.classes.active).addClass(this.classes.before),this.appendListItem(this.classes.active,this.digit),b.remove(),this.lastDigit=this.digit}},play:function(){this.$el.addClass(this.factory.classes.play)},stop:function(){var a=this;setTimeout(function(){a.$el.removeClass(a.factory.classes.play)},this.factory.timer.interval)},createListItem:function(a,b){return['<li class="'+(a?a:"")+'">','<a href="#">','<div class="up">','<div class="shadow"></div>','<div class="inn">'+(b?b:"")+"</div>","</div>",'<div class="down">','<div class="shadow"></div>','<div class="inn">'+(b?b:"")+"</div>","</div>","</a>","</li>"].join("")},appendListItem:function(a,b){var c=this.createListItem(a,b);this.$el.append(c)},createList:function(){var b=this.getPrevDigit()?this.getPrevDigit():this.digit,c=a(['<ul class="'+this.classes.flip+" "+(this.factory.running?this.factory.classes.play:"")+'">',this.createListItem(this.classes.before,b),this.createListItem(this.classes.active,this.digit),"</ul>"].join(""));return c},getNextDigit:function(){return 9==this.digit?0:this.digit+1},getPrevDigit:function(){return 0==this.digit?9:this.digit-1}})}(jQuery),function(a){"use strict";String.prototype.ucfirst=function(){return this.substr(0,1).toUpperCase()+this.substr(1)},a.fn.FlipClock=function(b,c){return"object"==typeof b&&(c=b,b=0),new FlipClock(a(this),b,c)},a.fn.flipClock=function(b,c){return a.fn.FlipClock(b,c)}}(jQuery),function(a){"use strict";FlipClock.Time=FlipClock.Base.extend({time:0,factory:!1,minimumDigits:0,constructor:function(a,b,c){this.base(c),this.factory=a,b&&(this.time=b)},convertDigitsToArray:function(a){var b=[];a=a.toString();for(var c=0;c<a.length;c++)a[c].match(/^\d*$/g)&&b.push(a[c]);return b},digit:function(a){var b=this.toString(),c=b.length;return b[c-a]?b[c-a]:!1},digitize:function(b){var c=[];if(a.each(b,function(a,b){b=b.toString(),1==b.length&&(b="0"+b);for(var d=0;d<b.length;d++)c.push(b.charAt(d))}),c.length>this.minimumDigits&&(this.minimumDigits=c.length),this.minimumDigits>c.length)for(var d=c.length;d<this.minimumDigits;d++)c.unshift("0");return c},getDayCounter:function(a){var b=[this.getDays(),this.getHours(!0),this.getMinutes(!0)];return a&&b.push(this.getSeconds(!0)),this.digitize(b)},getDays:function(a){var b=this.getTimeSeconds()/60/60/24;return a&&(b%=7),Math.floor(b)},getHourCounter:function(){var a=this.digitize([this.getHours(),this.getMinutes(!0),this.getSeconds(!0)]);return a},getHourly:function(){return this.getHourCounter()},getHours:function(a){var b=this.getTimeSeconds()/60/60;return a&&(b%=24),Math.floor(b)},getMilitaryTime:function(){var a=new Date,b=this.digitize([a.getHours(),a.getMinutes(),a.getSeconds()]);return b},getMinutes:function(a){var b=this.getTimeSeconds()/60;return a&&(b%=60),Math.floor(b)},getMinuteCounter:function(){var a=this.digitize([this.getMinutes(),this.getSeconds(!0)]);return a},getTimeSeconds:function(){return this.time instanceof Date?this.factory.countdown?((new Date).getTime()>this.time.getTime()&&this.factory.stop(),Math.max(this.time.getTime()/1e3-(new Date).getTime()/1e3,0)):(new Date).getTime()/1e3-this.time.getTime()/1e3:this.time},getSeconds:function(a){var b=this.getTimeSeconds();return a&&(60==b?b=0:b%=60),Math.ceil(b)},getTime:function(){var a=new Date,b=a.getHours(),c=this.digitize([b>12?b-12:0===b?12:b,a.getMinutes(),a.getSeconds()]);return c},getWeeks:function(){var a=this.getTimeSeconds()/60/60/24/7;return mod&&(a%=52),Math.floor(a)},removeLeadingZeros:function(b,c){var d=0,e=[];return a.each(c,function(a){b>a?d+=parseInt(c[a],10):e.push(c[a])}),0===d?e:c},addSeconds:function(a){this.time+=a},addSecond:function(){this.addSeconds(1)},subSeconds:function(a){this.time-=a},subSecond:function(){this.subSeconds(1)},toString:function(){return this.getTimeSeconds().toString()}})}(jQuery),function(){"use strict";FlipClock.Timer=FlipClock.Base.extend({callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},count:0,factory:!1,interval:1e3,animationRate:1e3,constructor:function(a,b){this.base(b),this.factory=a,this.callback(this.callbacks.init),this.callback(this.callbacks.create)},getElapsed:function(){return this.count*this.interval},getElapsedTime:function(){return new Date(this.time+this.getElapsed())},reset:function(a){clearInterval(this.timer),this.count=0,this._setInterval(a),this.callback(this.callbacks.reset)},start:function(a){this.factory.running=!0,this._createTimer(a),this.callback(this.callbacks.start)},stop:function(a){this.factory.running=!1,this._clearInterval(a),this.callback(this.callbacks.stop),this.callback(a)},_clearInterval:function(){clearInterval(this.timer)},_createTimer:function(a){this._setInterval(a)},_destroyTimer:function(a){this._clearInterval(),this.timer=!1,this.callback(a),this.callback(this.callbacks.destroy)},_interval:function(a){this.callback(this.callbacks.interval),this.callback(a),this.count++},_setInterval:function(a){var b=this;b._interval(a),b.timer=setInterval(function(){b._interval(a)},this.interval)}})}(jQuery),function(a){FlipClock.TwentyFourHourClockFace=FlipClock.Face.extend({constructor:function(a,b){a.countdown=!1,this.base(a,b)},build:function(b){var c=this,d=this.factory.$el.find("ul");b=b?b:this.factory.time.time||this.factory.time.getMilitaryTime(),b.length>d.length&&a.each(b,function(a,b){c.factory.lists.push(c.createList(b))}),this.dividers.push(this.createDivider()),this.dividers.push(this.createDivider()),a(this.dividers[0]).insertBefore(this.factory.lists[this.factory.lists.length-2].$el),a(this.dividers[1]).insertBefore(this.factory.lists[this.factory.lists.length-4].$el),this.autoStart&&this.start()},flip:function(a,b){a=a?a:this.factory.time.getMilitaryTime(),this.base(a,b)}})}(jQuery),function(a){FlipClock.CounterFace=FlipClock.Face.extend({minimumDigits:2,constructor:function(a,b){a.autoStart=b.autoStart?!0:!1,a.increment=function(){a.countdown=!1,a.setTime(a.getTime().getTimeSeconds()+1)},a.decrement=function(){a.countdown=!0;var b=a.getTime().getTimeSeconds();b>0&&a.setTime(b-1)},a.setValue=function(b){a.setTime(b)},a.setCounter=function(b){a.setTime(b)},this.base(a,b)},build:function(){var b=this,c=this.factory.$el.find("ul"),d=[],e=this.factory.getTime().digitize([this.factory.getTime().time]);e.length>c.length&&a.each(e,function(a,c){var e=b.createList(c,{minimumDigits:b.minimumDigits});e.select(c),d.push(e)}),a.each(d,function(a,b){b.play()}),this.factory.lists=d},flip:function(a,b){a||(a=this.factory.getTime().digitize([this.factory.getTime().time])),this.autoStart&&this.autoIncrement(),this.base(a,b)},reset:function(){this.factory.time=new FlipClock.Time(this.factor,this.factory.original?Math.round(this.factory.original):0),this.flip()}})}(jQuery),function(a){FlipClock.DailyCounterFace=FlipClock.Face.extend({showSeconds:!0,constructor:function(a,b){this.base(a,b)},build:function(b,c){var d=this,e=this.factory.$el.find("ul"),f=[],g=0;c=c?c:this.factory.time.getDayCounter(this.showSeconds),c.length>e.length&&a.each(c,function(a,b){f.push(d.createList(b))}),this.factory.lists=f,this.showSeconds?a(this.createDivider("Seconds")).insertBefore(this.factory.lists[this.factory.lists.length-2].$el):g=2,a(this.createDivider("Minutes")).insertBefore(this.factory.lists[this.factory.lists.length-4+g].$el),a(this.createDivider("Hours")).insertBefore(this.factory.lists[this.factory.lists.length-6+g].$el),a(this.createDivider("Days",!0)).insertBefore(this.factory.lists[0].$el),this.autoStart&&this.start()},flip:function(a,b){a||(a=this.factory.time.getDayCounter(this.showSeconds)),this.autoIncrement(),this.base(a,b)}})}(jQuery),function(a){FlipClock.HourlyCounterFace=FlipClock.Face.extend({constructor:function(a,b){this.base(a,b)},build:function(b,c){var d=this,e=this.factory.$el.find("ul"),f=[];c=c?c:this.factory.time.getHourCounter(),c.length>e.length&&a.each(c,function(a,b){f.push(d.createList(b))}),this.factory.lists=f,a(this.createDivider("Seconds")).insertBefore(this.factory.lists[this.factory.lists.length-2].$el),a(this.createDivider("Minutes")).insertBefore(this.factory.lists[this.factory.lists.length-4].$el),b||a(this.createDivider("Hours",!0)).insertBefore(this.factory.lists[0].$el),this.autoStart&&this.start()},flip:function(a,b){a||(a=this.factory.time.getHourCounter()),this.autoIncrement(),this.base(a,b)}})}(jQuery),function(){FlipClock.MinuteCounterFace=FlipClock.HourlyCounterFace.extend({clearExcessDigits:!1,constructor:function(a,b){this.base(a,b)},build:function(){this.base(!0,this.factory.time.getMinuteCounter())},flip:function(a,b){a||(a=this.factory.time.getMinuteCounter()),this.base(a,b)}})}(jQuery),function(a){FlipClock.TwelveHourClockFace=FlipClock.TwentyFourHourClockFace.extend({meridium:!1,meridiumText:"AM",build:function(b){b=b?b:this.factory.time.time?this.factory.time.time:this.factory.time.getTime(),this.base(b),this.meridiumText=this._isPM()?"PM":"AM",this.meridium=a(['<ul class="flip-clock-meridium">',"<li>",'<a href="#">'+this.meridiumText+"</a>","</li>","</ul>"].join("")),this.meridium.insertAfter(this.factory.lists[this.factory.lists.length-1].$el)},flip:function(a,b){this.meridiumText!=this._getMeridium()&&(this.meridiumText=this._getMeridium(),this.meridium.find("a").html(this.meridiumText)),this.base(this.factory.time.getTime(),b)},_getMeridium:function(){return(new Date).getHours()>=12?"PM":"AM"},_isPM:function(){return"PM"==this._getMeridium()?!0:!1}})}(jQuery),function(){FlipClock.Lang.Arabic={years:"سنوات",months:"شهور",days:"أيام",hours:"ساعات",minutes:"دقائق",seconds:"ثواني"},FlipClock.Lang.ar=FlipClock.Lang.Arabic,FlipClock.Lang["ar-ar"]=FlipClock.Lang.Arabic,FlipClock.Lang.arabic=FlipClock.Lang.Arabic}(jQuery),function(){FlipClock.Lang.Danish={years:"År",months:"Måneder",days:"Dage",hours:"Timer",minutes:"Minutter",seconds:"Sekunder"},FlipClock.Lang.da=FlipClock.Lang.Danish,FlipClock.Lang["da-dk"]=FlipClock.Lang.Danish,FlipClock.Lang.danish=FlipClock.Lang.Danish}(jQuery),function(){FlipClock.Lang.German={years:"Jahre",months:"Monate",days:"Tage",hours:"Stunden",minutes:"Minuten",seconds:"Sekunden"},FlipClock.Lang.de=FlipClock.Lang.German,FlipClock.Lang["de-de"]=FlipClock.Lang.German,FlipClock.Lang.german=FlipClock.Lang.German}(jQuery),function(){FlipClock.Lang.English={years:"Years",months:"Months",days:"Days",hours:"Hours",minutes:"Minutes",seconds:"Seconds"},FlipClock.Lang.en=FlipClock.Lang.English,FlipClock.Lang["en-us"]=FlipClock.Lang.English,FlipClock.Lang.english=FlipClock.Lang.English}(jQuery),function(){FlipClock.Lang.Spanish={years:"A&#241;os",months:"Meses",days:"D&#205;as",hours:"Horas",minutes:"Minutos",seconds:"Segundo"},FlipClock.Lang.es=FlipClock.Lang.Spanish,FlipClock.Lang["es-es"]=FlipClock.Lang.Spanish,FlipClock.Lang.spanish=FlipClock.Lang.Spanish}(jQuery),function(){FlipClock.Lang.Finnish={years:"Vuotta",months:"Kuukautta",days:"Päivää",hours:"Tuntia",minutes:"Minuuttia",seconds:"Sekuntia"},FlipClock.Lang.fi=FlipClock.Lang.Finnish,FlipClock.Lang["fi-fi"]=FlipClock.Lang.Finnish,FlipClock.Lang.finnish=FlipClock.Lang.Finnish}(jQuery),function(){FlipClock.Lang.French={years:"Ans",months:"Mois",days:"Jours",hours:"Heures",minutes:"Minutes",seconds:"Secondes"},FlipClock.Lang.fr=FlipClock.Lang.French,FlipClock.Lang["fr-ca"]=FlipClock.Lang.French,FlipClock.Lang.french=FlipClock.Lang.French}(jQuery),function(){FlipClock.Lang.Italian={years:"Anni",months:"Mesi",days:"Giorni",hours:"Ore",minutes:"Minuti",seconds:"Secondi"},FlipClock.Lang.it=FlipClock.Lang.Italian,FlipClock.Lang["it-it"]=FlipClock.Lang.Italian,FlipClock.Lang.italian=FlipClock.Lang.Italian}(jQuery),function(){FlipClock.Lang.Latvian={years:"Gadi",months:"Mēneši",days:"Dienas",hours:"Stundas",minutes:"Minūtes",seconds:"Sekundes"},FlipClock.Lang.lv=FlipClock.Lang.Latvian,FlipClock.Lang["lv-lv"]=FlipClock.Lang.Latvian,FlipClock.Lang.latvian=FlipClock.Lang.Latvian}(jQuery),function(){FlipClock.Lang.Dutch={years:"Jaren",months:"Maanden",days:"Dagen",hours:"Uren",minutes:"Minuten",seconds:"Seconden"},FlipClock.Lang.nl=FlipClock.Lang.Dutch,FlipClock.Lang["nl-be"]=FlipClock.Lang.Dutch,FlipClock.Lang.dutch=FlipClock.Lang.Dutch}(jQuery),function(){FlipClock.Lang.Norwegian={years:"År",months:"Måneder",days:"Dager",hours:"Timer",minutes:"Minutter",seconds:"Sekunder"},FlipClock.Lang.no=FlipClock.Lang.Norwegian,FlipClock.Lang.nb=FlipClock.Lang.Norwegian,FlipClock.Lang["no-nb"]=FlipClock.Lang.Norwegian,FlipClock.Lang.norwegian=FlipClock.Lang.Norwegian}(jQuery),function(){FlipClock.Lang.Portuguese={years:"Anos",months:"Meses",days:"Dias",hours:"Horas",minutes:"Minutos",seconds:"Segundos"},FlipClock.Lang.pt=FlipClock.Lang.Portuguese,FlipClock.Lang["pt-br"]=FlipClock.Lang.Portuguese,FlipClock.Lang.portuguese=FlipClock.Lang.Portuguese}(jQuery),function(){FlipClock.Lang.Russian={years:"лет",months:"месяцев",days:"дней",hours:"часов",minutes:"минут",seconds:"секунд"},FlipClock.Lang.ru=FlipClock.Lang.Russian,FlipClock.Lang["ru-ru"]=FlipClock.Lang.Russian,FlipClock.Lang.russian=FlipClock.Lang.Russian}(jQuery),function(){FlipClock.Lang.Swedish={years:"År",months:"Månader",days:"Dagar",hours:"Timmar",minutes:"Minuter",seconds:"Sekunder"},FlipClock.Lang.sv=FlipClock.Lang.Swedish,FlipClock.Lang["sv-se"]=FlipClock.Lang.Swedish,FlipClock.Lang.swedish=FlipClock.Lang.Swedish}(jQuery);
; browserify_shim__define__module__export__(typeof FlipClock != "undefined" ? FlipClock : window.FlipClock);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
//http://codepen.io/FelipeMartinin/pen/sAtvD

'use strict';
var $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

module.exports = (function () {
  function Init() {
    bind();
  }

  function bind() {
    $('.goFlip').on("click", function () {
      $('.aboutMe').toggleClass('rotate-3d');
      $('.card-back').toggleClass('z-up');
    });
  }

  return {
    Init: Init
  };
}());

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
'use strict';

var $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null),
  Firebase = require("firebase"),
  Week = require("./week");

/**
 * Dictator - A module for showing a who's the dictator.
 * @module dictator
 * @PublicMethod Init
 */

module.exports = (function () {
  var button,
    dictatorNumber,
    dictatorName,
    firebaseURL,
    startWeek,
    dictators,
    currentDictator;

  var config = {
    firebaseURL: 'https://fiery-torch-4818.firebaseio.com/'
  };

  function Init() {
    firebaseURL = new Firebase(config.firebaseURL);
    button = $('.js-dictator__button');
    getDictatorsFromFirebase();
    getStartWeek();
    firebaseURL.once('value', function (snap) {
      //console.log('initial data loaded!', Object.keys(snap.val()).length === count);
      getCurrentDictator();
    });

    readSingleFromFirebase();
    button.click(function (event) {
      event.preventDefault ? event.preventDefault() : event.returnValue = false;
      addDictotor();
      writeToFireBase();
    });
  }

  function addDictotor() {
    dictatorNumber = parseInt($('.dictator__number input').val(), 10);
    dictatorName = $('.dictator__name input').val();
  }

  function writeToFireBase() {
    var dictator = {};
    dictator[dictatorNumber] = dictatorName;
    firebaseURL.child("dictator/").update(dictator);
  }

  function getDictatorsFromFirebase() {
    firebaseURL.child("dictator").on('value', function (snapshot) {
      dictators = snapshot.val();
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code);
    });
  }

  function getStartWeek() {
    firebaseURL.child("StartWeek").on('value', function (snapshot) {
      startWeek = snapshot.val();
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code);
    });
  }

  function getCurrentDictator() {
    var curWeek = Week.getWeek();
    var weekFromStart = curWeek - startWeek;
    var maxDictator = 10;
    var currentNumber = weekFromStart % maxDictator;
    currentDictator = dictators[currentNumber];
    $('.currentDictator').text(currentDictator);
  }

  function readSingleFromFirebase() {
    firebaseURL.child("dictator").on('child_added', function (snapshot) {
      var snapshotValue = snapshot.val(),
        snapshotName = snapshot.name();
      $('.dictator_output__list').append('<li><label>' + '#: ' + snapshotName + ' Namn: ' + snapshotValue + '</label></li>');
    });
  }

  return {
    Init: Init,
    config: config
  };
}());

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./week":7,"firebase":8}],4:[function(require,module,exports){
/**
 * scripts/main.js
 *
 * This is the starting point for your application.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';
var random = require('./random');
var dictator = require('./dictator');
var card = require('./card');
var time = require('./timer');

random.Init();
dictator.Init();
card.Init();
time.Init();

},{"./card":2,"./dictator":3,"./random":5,"./timer":6}],5:[function(require,module,exports){
(function (global){
'use strict';

var jQuery = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null),
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

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"FlipClock":1}],6:[function(require,module,exports){
(function (global){
'use strict';

var $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);
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

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"howler":9}],7:[function(require,module,exports){
'use strict';


/**
 * Week - A module for showing week number.
 * @module week
 * @PublicMethod Init
 */

module.exports = (function () {
  function getWeek() {
    Date.prototype.getWeek = function () {
      var onejan = new Date(this.getFullYear(), 0, 1);
      return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    };

    var weekNumber = (new Date()).getWeek();

    return weekNumber;
  }

  return {
    getWeek: getWeek
  };
}());

},{}],8:[function(require,module,exports){
/* Firebase v1.0.21 */ (function() {var h,aa=this;function n(a){return void 0!==a}function ba(){}function ca(a){a.sb=function(){return a.md?a.md:a.md=new a}}
function da(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ea(a){return"array"==da(a)}function fa(a){var b=da(a);return"array"==b||"object"==b&&"number"==typeof a.length}function q(a){return"string"==typeof a}function ga(a){return"number"==typeof a}function ha(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ia(a,b,c){return a.call.apply(a.bind,arguments)}
function ja(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function r(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ia:ja;return r.apply(null,arguments)}
function ka(a,b){function c(){}c.prototype=b.prototype;a.me=b.prototype;a.prototype=new c;a.ke=function(a,c,f){return b.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}};function la(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function ma(){this.pc=void 0}
function na(a,b,c){switch(typeof b){case "string":oa(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(ea(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],na(a,a.pc?a.pc.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),oa(f,c),
c.push(":"),na(a,a.pc?a.pc.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var pa={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},qa=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
function oa(a,b){b.push('"',a.replace(qa,function(a){if(a in pa)return pa[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return pa[a]=e+b.toString(16)}),'"')};function ra(a){return"undefined"!==typeof JSON&&n(JSON.parse)?JSON.parse(a):la(a)}function u(a){if("undefined"!==typeof JSON&&n(JSON.stringify))a=JSON.stringify(a);else{var b=[];na(new ma,a,b);a=b.join("")}return a};function sa(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,v(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b};var ta={};function x(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}
function y(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:ua.assert(!1,"errorPrefix_ called with argumentNumber > 4.  Need to update it?")}return a=a+" failed: "+(d+" argument ")}function z(a,b,c,d){if((!d||n(c))&&"function"!=da(c))throw Error(y(a,b,d)+"must be a valid function.");}
function va(a,b,c){if(n(c)&&(!ha(c)||null===c))throw Error(y(a,b,!0)+"must be a valid context object.");};function A(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function wa(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]};var ua={},xa=/[\[\].#$\/\u0000-\u001F\u007F]/,ya=/[\[\].#$\u0000-\u001F\u007F]/;function za(a){return q(a)&&0!==a.length&&!xa.test(a)}function Aa(a,b,c){c&&!n(b)||Ba(y(a,1,c),b)}
function Ba(a,b,c,d){c||(c=0);d=d||[];if(!n(b))throw Error(a+"contains undefined"+Ca(d));if("function"==da(b))throw Error(a+"contains a function"+Ca(d)+" with contents: "+b.toString());if(Da(b))throw Error(a+"contains "+b.toString()+Ca(d));if(1E3<c)throw new TypeError(a+"contains a cyclic object value ("+d.slice(0,100).join(".")+"...)");if(q(b)&&b.length>10485760/3&&10485760<sa(b).length)throw Error(a+"contains a string greater than 10485760 utf8 bytes"+Ca(d)+" ('"+b.substring(0,50)+"...')");if(ha(b))for(var e in b)if(A(b,
e)){var f=b[e];if(".priority"!==e&&".value"!==e&&".sv"!==e&&!za(e))throw Error(a+" contains an invalid key ("+e+")"+Ca(d)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');d.push(e);Ba(a,f,c+1,d);d.pop()}}function Ca(a){return 0==a.length?"":" in property '"+a.join(".")+"'"}function Ea(a,b){if(!ha(b)||ea(b))throw Error(y(a,1,!1)+" must be an Object containing the children to replace.");Aa(a,b,!1)}
function Fa(a,b,c,d){if(!(d&&!n(c)||null===c||ga(c)||q(c)||ha(c)&&A(c,".sv")))throw Error(y(a,b,d)+"must be a valid firebase priority (a string, number, or null).");}function Ga(a,b,c){if(!c||n(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(y(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}
function Ha(a,b){if(n(b)&&!za(b))throw Error(y(a,2,!0)+'was an invalid key: "'+b+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}function Ia(a,b){if(!q(b)||0===b.length||ya.test(b))throw Error(y(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function B(a,b){if(".info"===C(b))throw Error(a+" failed: Can't modify data under /.info/");};function D(a,b,c,d,e,f,g){this.m=a;this.path=b;this.Ca=c;this.da=d;this.wa=e;this.Aa=f;this.Ya=g;if(n(this.da)&&n(this.Aa)&&n(this.Ca))throw"Query: Can't combine startAt(), endAt(), and limit().";}D.prototype.Uc=function(){x("Query.ref",0,0,arguments.length);return new E(this.m,this.path)};D.prototype.ref=D.prototype.Uc;
D.prototype.fb=function(a,b){x("Query.on",2,4,arguments.length);Ga("Query.on",a,!1);z("Query.on",2,b,!1);var c=Ja("Query.on",arguments[2],arguments[3]);this.m.Sb(this,a,b,c.cancel,c.Y);return b};D.prototype.on=D.prototype.fb;D.prototype.zb=function(a,b,c){x("Query.off",0,3,arguments.length);Ga("Query.off",a,!0);z("Query.off",2,b,!0);va("Query.off",3,c);this.m.oc(this,a,b,c)};D.prototype.off=D.prototype.zb;
D.prototype.Zd=function(a,b){function c(g){f&&(f=!1,e.zb(a,c),b.call(d.Y,g))}x("Query.once",2,4,arguments.length);Ga("Query.once",a,!1);z("Query.once",2,b,!1);var d=Ja("Query.once",arguments[2],arguments[3]),e=this,f=!0;this.fb(a,c,function(b){e.zb(a,c);d.cancel&&d.cancel.call(d.Y,b)})};D.prototype.once=D.prototype.Zd;
D.prototype.Sd=function(a){x("Query.limit",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw"Query.limit: First argument must be a positive integer.";return new D(this.m,this.path,a,this.da,this.wa,this.Aa,this.Ya)};D.prototype.limit=D.prototype.Sd;D.prototype.Ad=function(a,b){x("Query.startAt",0,2,arguments.length);Fa("Query.startAt",1,a,!0);Ha("Query.startAt",b);n(a)||(b=a=null);return new D(this.m,this.path,this.Ca,a,b,this.Aa,this.Ya)};D.prototype.startAt=D.prototype.Ad;
D.prototype.gd=function(a,b){x("Query.endAt",0,2,arguments.length);Fa("Query.endAt",1,a,!0);Ha("Query.endAt",b);return new D(this.m,this.path,this.Ca,this.da,this.wa,a,b)};D.prototype.endAt=D.prototype.gd;D.prototype.Kd=function(a,b){x("Query.equalTo",1,2,arguments.length);Fa("Query.equalTo",1,a,!1);Ha("Query.equalTo",b);return this.Ad(a,b).gd(a,b)};D.prototype.equalTo=D.prototype.Kd;
function Ka(a){var b={};n(a.da)&&(b.sp=a.da);n(a.wa)&&(b.sn=a.wa);n(a.Aa)&&(b.ep=a.Aa);n(a.Ya)&&(b.en=a.Ya);n(a.Ca)&&(b.l=a.Ca);n(a.da)&&n(a.wa)&&null===a.da&&null===a.wa&&(b.vf="l");return b}D.prototype.Qa=function(){var a=La(Ka(this));return"{}"===a?"default":a};
function Ja(a,b,c){var d={};if(b&&c)d.cancel=b,z(a,3,d.cancel,!0),d.Y=c,va(a,4,d.Y);else if(b)if("object"===typeof b&&null!==b)d.Y=b;else if("function"===typeof b)d.cancel=b;else throw Error(ta.le(a,3,!0)+"must either be a cancel callback or a context object.");return d};function F(a,b){if(1==arguments.length){this.o=a.split("/");for(var c=0,d=0;d<this.o.length;d++)0<this.o[d].length&&(this.o[c]=this.o[d],c++);this.o.length=c;this.U=0}else this.o=a,this.U=b}function C(a){return a.U>=a.o.length?null:a.o[a.U]}function Ma(a){var b=a.U;b<a.o.length&&b++;return new F(a.o,b)}function Na(a){return a.U<a.o.length?a.o[a.o.length-1]:null}h=F.prototype;h.toString=function(){for(var a="",b=this.U;b<this.o.length;b++)""!==this.o[b]&&(a+="/"+this.o[b]);return a||"/"};
h.parent=function(){if(this.U>=this.o.length)return null;for(var a=[],b=this.U;b<this.o.length-1;b++)a.push(this.o[b]);return new F(a,0)};h.G=function(a){for(var b=[],c=this.U;c<this.o.length;c++)b.push(this.o[c]);if(a instanceof F)for(c=a.U;c<a.o.length;c++)b.push(a.o[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new F(b,0)};h.f=function(){return this.U>=this.o.length};h.length=function(){return this.o.length-this.U};
function Oa(a,b){var c=C(a);if(null===c)return b;if(c===C(b))return Oa(Ma(a),Ma(b));throw"INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")";}h.contains=function(a){var b=this.U,c=a.U;if(this.length()>a.length())return!1;for(;b<this.o.length;){if(this.o[b]!==a.o[c])return!1;++b;++c}return!0};function Pa(){this.children={};this.Ac=0;this.value=null}function Qa(a,b,c){this.Da=a?a:"";this.Fb=b?b:null;this.C=c?c:new Pa}function I(a,b){for(var c=b instanceof F?b:new F(b),d=a,e;null!==(e=C(c));)d=new Qa(e,d,wa(d.C.children,e)||new Pa),c=Ma(c);return d}h=Qa.prototype;h.j=function(){return this.C.value};function J(a,b){v("undefined"!==typeof b,"Cannot set value to undefined");a.C.value=b;Ra(a)}h.tb=function(){return 0<this.C.Ac};h.f=function(){return null===this.j()&&!this.tb()};
h.A=function(a){for(var b in this.C.children)a(new Qa(b,this,this.C.children[b]))};function Sa(a,b,c,d){c&&!d&&b(a);a.A(function(a){Sa(a,b,!0,d)});c&&d&&b(a)}function Ta(a,b,c){for(a=c?a:a.parent();null!==a;){if(b(a))return!0;a=a.parent()}return!1}h.path=function(){return new F(null===this.Fb?this.Da:this.Fb.path()+"/"+this.Da)};h.name=function(){return this.Da};h.parent=function(){return this.Fb};
function Ra(a){if(null!==a.Fb){var b=a.Fb,c=a.Da,d=a.f(),e=A(b.C.children,c);d&&e?(delete b.C.children[c],b.C.Ac--,Ra(b)):d||e||(b.C.children[c]=a.C,b.C.Ac++,Ra(b))}};function Ua(a,b){this.Va=a?a:Va;this.ca=b?b:Wa}function Va(a,b){return a<b?-1:a>b?1:0}h=Ua.prototype;h.qa=function(a,b){return new Ua(this.Va,this.ca.qa(a,b,this.Va).J(null,null,!1,null,null))};h.remove=function(a){return new Ua(this.Va,this.ca.remove(a,this.Va).J(null,null,!1,null,null))};h.get=function(a){for(var b,c=this.ca;!c.f();){b=this.Va(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
function Xa(a,b){for(var c,d=a.ca,e=null;!d.f();){c=a.Va(b,d.key);if(0===c){if(d.left.f())return e?e.key:null;for(d=d.left;!d.right.f();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}h.f=function(){return this.ca.f()};h.count=function(){return this.ca.count()};h.yb=function(){return this.ca.yb()};h.bb=function(){return this.ca.bb()};h.Ba=function(a){return this.ca.Ba(a)};h.Ra=function(a){return this.ca.Ra(a)};
h.ab=function(a){return new Ya(this.ca,a)};function Ya(a,b){this.vd=b;for(this.cc=[];!a.f();)this.cc.push(a),a=a.left}function Za(a){if(0===a.cc.length)return null;var b=a.cc.pop(),c;c=a.vd?a.vd(b.key,b.value):{key:b.key,value:b.value};for(b=b.right;!b.f();)a.cc.push(b),b=b.left;return c}function $a(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:Wa;this.right=null!=e?e:Wa}h=$a.prototype;
h.J=function(a,b,c,d,e){return new $a(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};h.count=function(){return this.left.count()+1+this.right.count()};h.f=function(){return!1};h.Ba=function(a){return this.left.Ba(a)||a(this.key,this.value)||this.right.Ba(a)};h.Ra=function(a){return this.right.Ra(a)||a(this.key,this.value)||this.left.Ra(a)};function cb(a){return a.left.f()?a:cb(a.left)}h.yb=function(){return cb(this).key};
h.bb=function(){return this.right.f()?this.key:this.right.bb()};h.qa=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.J(null,null,null,e.left.qa(a,b,c),null):0===d?e.J(null,b,null,null,null):e.J(null,null,null,null,e.right.qa(a,b,c));return db(e)};function eb(a){if(a.left.f())return Wa;a.left.P()||a.left.left.P()||(a=fb(a));a=a.J(null,null,null,eb(a.left),null);return db(a)}
h.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.f()||c.left.P()||c.left.left.P()||(c=fb(c)),c=c.J(null,null,null,c.left.remove(a,b),null);else{c.left.P()&&(c=gb(c));c.right.f()||c.right.P()||c.right.left.P()||(c=hb(c),c.left.left.P()&&(c=gb(c),c=hb(c)));if(0===b(a,c.key)){if(c.right.f())return Wa;d=cb(c.right);c=c.J(d.key,d.value,null,null,eb(c.right))}c=c.J(null,null,null,null,c.right.remove(a,b))}return db(c)};h.P=function(){return this.color};
function db(a){a.right.P()&&!a.left.P()&&(a=ib(a));a.left.P()&&a.left.left.P()&&(a=gb(a));a.left.P()&&a.right.P()&&(a=hb(a));return a}function fb(a){a=hb(a);a.right.left.P()&&(a=a.J(null,null,null,null,gb(a.right)),a=ib(a),a=hb(a));return a}function ib(a){return a.right.J(null,null,a.color,a.J(null,null,!0,null,a.right.left),null)}function gb(a){return a.left.J(null,null,a.color,null,a.J(null,null,!0,a.left.right,null))}
function hb(a){return a.J(null,null,!a.color,a.left.J(null,null,!a.left.color,null,null),a.right.J(null,null,!a.right.color,null,null))}function jb(){}h=jb.prototype;h.J=function(){return this};h.qa=function(a,b){return new $a(a,b,null)};h.remove=function(){return this};h.count=function(){return 0};h.f=function(){return!0};h.Ba=function(){return!1};h.Ra=function(){return!1};h.yb=function(){return null};h.bb=function(){return null};h.P=function(){return!1};var Wa=new jb;function kb(a){this.Xb=a;this.kc="firebase:"}kb.prototype.set=function(a,b){null==b?this.Xb.removeItem(this.kc+a):this.Xb.setItem(this.kc+a,u(b))};kb.prototype.get=function(a){a=this.Xb.getItem(this.kc+a);return null==a?null:ra(a)};kb.prototype.remove=function(a){this.Xb.removeItem(this.kc+a)};kb.prototype.od=!1;function lb(){this.ob={}}lb.prototype.set=function(a,b){null==b?delete this.ob[a]:this.ob[a]=b};lb.prototype.get=function(a){return A(this.ob,a)?this.ob[a]:null};lb.prototype.remove=function(a){delete this.ob[a]};lb.prototype.od=!0;function mb(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new kb(b)}}catch(c){}return new lb}var nb=mb("localStorage"),ob=mb("sessionStorage");function pb(a,b,c,d){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.qc=b;this.bc=c;this.ie=d;this.ga=nb.get("host:"+a)||this.host}function qb(a,b){b!==a.ga&&(a.ga=b,"s-"===a.ga.substr(0,2)&&nb.set("host:"+a.host,a.ga))}pb.prototype.toString=function(){return(this.qc?"https://":"http://")+this.host};"use strict";function rb(a,b){if(0===a.length||0===b.length)return a.concat(b);var c=a[a.length-1],d=Math.round(c/1099511627776)||32,e;if(32===d)e=a.concat(b);else{e=b;var c=c|0,f=a.slice(0,a.length-1),g;for(void 0===f&&(f=[]);32<=d;d-=32)f.push(c),c=0;if(0===d)e=f.concat(e);else{for(g=0;g<e.length;g++)f.push(c|e[g]>>>d),c=e[g]<<32-d;g=e.length?e[e.length-1]:0;e=Math.round(g/1099511627776)||32;f.push(sb(d+e&31,32<d+e?c:f.pop(),1));e=f}}return e}
function tb(a){var b=a.length;return 0===b?0:32*(b-1)+(Math.round(a[b-1]/1099511627776)||32)}function sb(a,b,c){return 32===a?b:(c?b|0:b<<32-a)+1099511627776*a}function ub(a){var b,c="",d=0,e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",f=0,g=tb(a);b&&(e=e.substr(0,62)+"-_");for(b=0;6*c.length<g;)c+=e.charAt((f^a[b]>>>d)>>>26),6>d?(f=a[b]<<6-d,d+=26,b++):(f<<=6,d-=6);for(;c.length&3;)c+="=";return c}
function vb(a){a?(this.Tb=a.Tb.slice(0),this.nb=a.nb.slice(0),this.Ua=a.Ua):this.reset()}function wb(a){a=(new vb).update(a);var b,c=a.nb,d=a.Tb,c=rb(c,[sb(1,1)]);for(b=c.length+2;b&15;b++)c.push(0);c.push(Math.floor(a.Ua/4294967296));for(c.push(a.Ua|0);c.length;)xb(a,c.splice(0,16));a.reset();return d}
vb.prototype={zc:512,reset:function(){this.Tb=this.Md.slice(0);this.nb=[];this.Ua=0;return this},update:function(a){if("string"===typeof a){a=unescape(encodeURIComponent(a));var b=[],c,d=0;for(c=0;c<a.length;c++)d=d<<8|a.charCodeAt(c),3===(c&3)&&(b.push(d),d=0);c&3&&b.push(sb(8*(c&3),d));a=b}c=this.nb=rb(this.nb,a);b=this.Ua;a=this.Ua=b+tb(a);for(b=this.zc+b&-this.zc;b<=a;b+=this.zc)xb(this,c.splice(0,16));return this},Md:[1732584193,4023233417,2562383102,271733878,3285377520],Pd:[1518500249,1859775393,
2400959708,3395469782]};function xb(a,b){var c,d,e,f,g,k,l,m=b.slice(0),p=a.Tb;e=p[0];f=p[1];g=p[2];k=p[3];l=p[4];for(c=0;79>=c;c++)16<=c&&(m[c]=(m[c-3]^m[c-8]^m[c-14]^m[c-16])<<1|(m[c-3]^m[c-8]^m[c-14]^m[c-16])>>>31),d=19>=c?f&g|~f&k:39>=c?f^g^k:59>=c?f&g|f&k|g&k:79>=c?f^g^k:void 0,d=(e<<5|e>>>27)+d+l+m[c]+a.Pd[Math.floor(c/20)]|0,l=k,k=g,g=f<<30|f>>>2,f=e,e=d;p[0]=p[0]+e|0;p[1]=p[1]+f|0;p[2]=p[2]+g|0;p[3]=p[3]+k|0;p[4]=p[4]+l|0};var yb=Array.prototype,zb=yb.forEach?function(a,b,c){yb.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ab=yb.map?function(a,b,c){return yb.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=q(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},Bb=yb.reduce?function(a,b,c,d){d&&(b=r(b,d));return yb.reduce.call(a,b,c)}:function(a,b,c,d){var e=c;zb(a,function(c,g){e=b.call(d,e,c,g,a)});return e},
Cb=yb.every?function(a,b,c){return yb.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=q(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Db(a,b){var c;a:{c=a.length;for(var d=q(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break a}c=-1}return 0>c?null:q(a)?a.charAt(c):a[c]};var Eb;a:{var Fb=aa.navigator;if(Fb){var Gb=Fb.userAgent;if(Gb){Eb=Gb;break a}}Eb=""}function Hb(a){return-1!=Eb.indexOf(a)};var Ib=Hb("Opera")||Hb("OPR"),Jb=Hb("Trident")||Hb("MSIE"),Kb=Hb("Gecko")&&-1==Eb.toLowerCase().indexOf("webkit")&&!(Hb("Trident")||Hb("MSIE")),Lb=-1!=Eb.toLowerCase().indexOf("webkit");(function(){var a="",b;if(Ib&&aa.opera)return a=aa.opera.version,"function"==da(a)?a():a;Kb?b=/rv\:([^\);]+)(\)|;)/:Jb?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Lb&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(Eb))?a[1]:"");return Jb&&(b=(b=aa.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var Mb=null,Nb=null;var Ob=function(){var a=1;return function(){return a++}}();function v(a,b){if(!a)throw Error("Firebase INTERNAL ASSERT FAILED:"+b);}function Pb(a){for(var b="",c=0;c<arguments.length;c++)b=fa(arguments[c])?b+Pb.apply(null,arguments[c]):"object"===typeof arguments[c]?b+u(arguments[c]):b+arguments[c],b+=" ";return b}var Qb=null,Rb=!0;function K(a){!0===Rb&&(Rb=!1,null===Qb&&!0===ob.get("logging_enabled")&&Sb(!0));if(Qb){var b=Pb.apply(null,arguments);Qb(b)}}
function Tb(a){return function(){K(a,arguments)}}function Ub(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+Pb.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function Vb(a){var b=Pb.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function L(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+Pb.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
function Da(a){return ga(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}function Wb(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
function Xb(a,b){return a!==b?null===a?-1:null===b?1:typeof a!==typeof b?"number"===typeof a?-1:1:a>b?1:-1:0}function Yb(a,b){if(a===b)return 0;var c=Zb(a),d=Zb(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function $b(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+u(b));}
function La(a){if("object"!==typeof a||null===a)return u(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=u(b[d]),c+=":",c+=La(a[b[d]]);return c+"}"}function ac(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function bc(a,b){if(ea(a))for(var c=0;c<a.length;++c)b(c,a[c]);else cc(a,b)}function dc(a,b){return b?r(a,b):a}
function ec(a){v(!Da(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;a-=1)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;a-=1)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
(d="0"+d),c+=d;return c.toLowerCase()}function fc(a){var b="Unknown Error";"too_big"===a?b="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==a?b="Client doesn't have permission to access the desired data.":"unavailable"==a&&(b="The service is unavailable");b=Error(a+": "+b);b.code=a.toUpperCase();return b}var gc=/^-?\d{1,10}$/;function Zb(a){return gc.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}
function ic(a){try{a()}catch(b){setTimeout(function(){throw b;},Math.floor(0))}};function jc(a,b){this.F=a;v(null!==this.F,"LeafNode shouldn't be created with null value.");this.gb="undefined"!==typeof b?b:null}h=jc.prototype;h.O=function(){return!0};h.k=function(){return this.gb};h.Ga=function(a){return new jc(this.F,a)};h.N=function(){return M};h.K=function(a){return null===C(a)?this:M};h.fa=function(){return null};h.H=function(a,b){return(new N).H(a,b).Ga(this.gb)};h.ya=function(a,b){var c=C(a);return null===c?b:this.H(c,M.ya(Ma(a),b))};h.f=function(){return!1};h.dc=function(){return 0};
h.V=function(a){return a&&null!==this.k()?{".value":this.j(),".priority":this.k()}:this.j()};h.hash=function(){var a="";null!==this.k()&&(a+="priority:"+kc(this.k())+":");var b=typeof this.F,a=a+(b+":"),a="number"===b?a+ec(this.F):a+this.F;return ub(wb(a))};h.j=function(){return this.F};h.toString=function(){return"string"===typeof this.F?this.F:'"'+this.F+'"'};function lc(a,b){return Xb(a.ja,b.ja)||Yb(a.name,b.name)}function mc(a,b){return Yb(a.name,b.name)}function nc(a,b){return Yb(a,b)};function N(a,b){this.n=a||new Ua(nc);this.gb="undefined"!==typeof b?b:null}h=N.prototype;h.O=function(){return!1};h.k=function(){return this.gb};h.Ga=function(a){return new N(this.n,a)};h.H=function(a,b){var c=this.n.remove(a);b&&b.f()&&(b=null);null!==b&&(c=c.qa(a,b));return b&&null!==b.k()?new oc(c,null,this.gb):new N(c,this.gb)};h.ya=function(a,b){var c=C(a);if(null===c)return b;var d=this.N(c).ya(Ma(a),b);return this.H(c,d)};h.f=function(){return this.n.f()};h.dc=function(){return this.n.count()};
var pc=/^\d+$/;h=N.prototype;h.V=function(a){if(this.f())return null;var b={},c=0,d=0,e=!0;this.A(function(f,g){b[f]=g.V(a);c++;e&&pc.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],g;for(g in b)f[g]=b[g];return f}a&&null!==this.k()&&(b[".priority"]=this.k());return b};h.hash=function(){var a="";null!==this.k()&&(a+="priority:"+kc(this.k())+":");this.A(function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});return""===a?"":ub(wb(a))};
h.N=function(a){a=this.n.get(a);return null===a?M:a};h.K=function(a){var b=C(a);return null===b?this:this.N(b).K(Ma(a))};h.fa=function(a){return Xa(this.n,a)};h.jd=function(){return this.n.yb()};h.ld=function(){return this.n.bb()};h.A=function(a){return this.n.Ba(a)};h.Fc=function(a){return this.n.Ra(a)};h.ab=function(){return this.n.ab()};h.toString=function(){var a="{",b=!0;this.A(function(c,d){b?b=!1:a+=", ";a+='"'+c+'" : '+d.toString()});return a+="}"};var M=new N;function oc(a,b,c){N.call(this,a,c);null===b&&(b=new Ua(lc),a.Ba(function(a,c){b=b.qa({name:a,ja:c.k()},c)}));this.va=b}ka(oc,N);h=oc.prototype;h.H=function(a,b){var c=this.N(a),d=this.n,e=this.va;null!==c&&(d=d.remove(a),e=e.remove({name:a,ja:c.k()}));b&&b.f()&&(b=null);null!==b&&(d=d.qa(a,b),e=e.qa({name:a,ja:b.k()},b));return new oc(d,e,this.k())};h.fa=function(a,b){var c=Xa(this.va,{name:a,ja:b.k()});return c?c.name:null};h.A=function(a){return this.va.Ba(function(b,c){return a(b.name,c)})};
h.Fc=function(a){return this.va.Ra(function(b,c){return a(b.name,c)})};h.ab=function(){return this.va.ab(function(a,b){return{key:a.name,value:b}})};h.jd=function(){return this.va.f()?null:this.va.yb().name};h.ld=function(){return this.va.f()?null:this.va.bb().name};function O(a,b){if(null===a)return M;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);v(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new jc(a,c);if(a instanceof Array){var d=M,e=a;cc(e,function(a,b){if(A(e,b)&&"."!==b.substring(0,1)){var c=O(a);if(c.O()||!c.f())d=
d.H(b,c)}});return d.Ga(c)}var f=[],g={},k=!1,l=a;bc(l,function(a,b){if("string"!==typeof b||"."!==b.substring(0,1)){var c=O(l[b]);c.f()||(k=k||null!==c.k(),f.push({name:b,ja:c.k()}),g[b]=c)}});var m=qc(f,g,!1);if(k){var p=qc(f,g,!0);return new oc(m,p,c)}return new N(m,c)}var rc=Math.log(2);function sc(a){this.count=parseInt(Math.log(a+1)/rc,10);this.ed=this.count-1;this.Hd=a+1&parseInt(Array(this.count+1).join("1"),2)}function tc(a){var b=!(a.Hd&1<<a.ed);a.ed--;return b}
function qc(a,b,c){function d(e,f){var l=f-e;if(0==l)return null;if(1==l){var l=a[e].name,m=c?a[e]:l;return new $a(m,b[l],!1,null,null)}var m=parseInt(l/2,10)+e,p=d(e,m),t=d(m+1,f),l=a[m].name,m=c?a[m]:l;return new $a(m,b[l],!1,p,t)}var e=c?lc:mc;a.sort(e);var f=function(e){function f(e,g){var k=p-e,t=p;p-=e;var s=a[k].name,k=new $a(c?a[k]:s,b[s],g,null,d(k+1,t));l?l.left=k:m=k;l=k}for(var l=null,m=null,p=a.length,t=0;t<e.count;++t){var s=tc(e),w=Math.pow(2,e.count-(t+1));s?f(w,!1):(f(w,!1),f(w,!0))}return m}(new sc(a.length)),
e=c?lc:nc;return null!==f?new Ua(e,f):new Ua(e)}function kc(a){return"number"===typeof a?"number:"+ec(a):"string:"+a};function P(a,b){this.C=a;this.nc=b}P.prototype.V=function(){x("Firebase.DataSnapshot.val",0,0,arguments.length);return this.C.V()};P.prototype.val=P.prototype.V;P.prototype.Ld=function(){x("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.C.V(!0)};P.prototype.exportVal=P.prototype.Ld;P.prototype.G=function(a){x("Firebase.DataSnapshot.child",0,1,arguments.length);ga(a)&&(a=String(a));Ia("Firebase.DataSnapshot.child",a);var b=new F(a),c=this.nc.G(b);return new P(this.C.K(b),c)};
P.prototype.child=P.prototype.G;P.prototype.Ic=function(a){x("Firebase.DataSnapshot.hasChild",1,1,arguments.length);Ia("Firebase.DataSnapshot.hasChild",a);var b=new F(a);return!this.C.K(b).f()};P.prototype.hasChild=P.prototype.Ic;P.prototype.k=function(){x("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.C.k()};P.prototype.getPriority=P.prototype.k;
P.prototype.forEach=function(a){x("Firebase.DataSnapshot.forEach",1,1,arguments.length);z("Firebase.DataSnapshot.forEach",1,a,!1);if(this.C.O())return!1;var b=this;return this.C.A(function(c,d){return a(new P(d,b.nc.G(c)))})};P.prototype.forEach=P.prototype.forEach;P.prototype.tb=function(){x("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.C.O()?!1:!this.C.f()};P.prototype.hasChildren=P.prototype.tb;
P.prototype.name=function(){x("Firebase.DataSnapshot.name",0,0,arguments.length);return this.nc.name()};P.prototype.name=P.prototype.name;P.prototype.dc=function(){x("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.C.dc()};P.prototype.numChildren=P.prototype.dc;P.prototype.Uc=function(){x("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.nc};P.prototype.ref=P.prototype.Uc;function uc(a){v(ea(a)&&0<a.length,"Requires a non-empty array");this.Gd=a;this.xb={}}uc.prototype.bd=function(a,b){for(var c=this.xb[a]||[],d=0;d<c.length;d++)c[d].aa.apply(c[d].Y,Array.prototype.slice.call(arguments,1))};uc.prototype.fb=function(a,b,c){vc(this,a);this.xb[a]=this.xb[a]||[];this.xb[a].push({aa:b,Y:c});(a=this.kd(a))&&b.apply(c,a)};uc.prototype.zb=function(a,b,c){vc(this,a);a=this.xb[a]||[];for(var d=0;d<a.length;d++)if(a[d].aa===b&&(!c||c===a[d].Y)){a.splice(d,1);break}};
function vc(a,b){v(Db(a.Gd,function(a){return a===b}),"Unknown event: "+b)};function wc(){uc.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.lb=!0;if(b){var c=this;document.addEventListener(b,
function(){var b=!document[a];b!==c.lb&&(c.lb=b,c.bd("visible",b))},!1)}}ka(wc,uc);ca(wc);wc.prototype.kd=function(a){v("visible"===a,"Unknown event type: "+a);return[this.lb]};function xc(){uc.call(this,["online"]);this.Db=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener){var a=this;window.addEventListener("online",function(){a.Db||a.bd("online",!0);a.Db=!0},!1);window.addEventListener("offline",function(){a.Db&&a.bd("online",!1);a.Db=!1},!1)}}ka(xc,uc);ca(xc);xc.prototype.kd=function(a){v("online"===a,"Unknown event type: "+a);return[this.Db]};function cc(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function yc(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function zc(a){var b={},c;for(c in a)b[c]=a[c];return b};function Ac(){this.pb={}}function Bc(a,b,c){n(c)||(c=1);A(a.pb,b)||(a.pb[b]=0);a.pb[b]+=c}Ac.prototype.get=function(){return zc(this.pb)};function Cc(a){this.Id=a;this.Zb=null}Cc.prototype.get=function(){var a=this.Id.get(),b=zc(a);if(this.Zb)for(var c in this.Zb)b[c]-=this.Zb[c];this.Zb=a;return b};function Dc(a,b){this.Zc={};this.tc=new Cc(a);this.u=b;var c=1E4+2E4*Math.random();setTimeout(r(this.td,this),Math.floor(c))}Dc.prototype.td=function(){var a=this.tc.get(),b={},c=!1,d;for(d in a)0<a[d]&&A(this.Zc,d)&&(b[d]=a[d],c=!0);c&&(a=this.u,a.R&&(b={c:b},a.e("reportStats",b),a.Ea("s",b)));setTimeout(r(this.td,this),Math.floor(6E5*Math.random()))};var Ec={},Fc={};function Gc(a){a=a.toString();Ec[a]||(Ec[a]=new Ac);return Ec[a]}function Hc(a,b){var c=a.toString();Fc[c]||(Fc[c]=b());return Fc[c]};var Ic=null;"undefined"!==typeof MozWebSocket?Ic=MozWebSocket:"undefined"!==typeof WebSocket&&(Ic=WebSocket);function Q(a,b,c){this.Cc=a;this.e=Tb(this.Cc);this.frames=this.vb=null;this.Ha=this.Ia=this.ad=0;this.ea=Gc(b);this.Wa=(b.qc?"wss://":"ws://")+b.ga+"/.ws?v=5";b.host!==b.ga&&(this.Wa=this.Wa+"&ns="+b.bc);c&&(this.Wa=this.Wa+"&s="+c)}var Jc;
Q.prototype.open=function(a,b){this.ia=b;this.Wd=a;this.e("Websocket connecting to "+this.Wa);this.W=new Ic(this.Wa);this.qb=!1;nb.set("previous_websocket_failure",!0);var c=this;this.W.onopen=function(){c.e("Websocket connected.");c.qb=!0};this.W.onclose=function(){c.e("Websocket connection was disconnected.");c.W=null;c.Pa()};this.W.onmessage=function(a){if(null!==c.W)if(a=a.data,c.Ha+=a.length,Bc(c.ea,"bytes_received",a.length),Kc(c),null!==c.frames)Lc(c,a);else{a:{v(null===c.frames,"We already have a frame buffer");
if(6>=a.length){var b=Number(a);if(!isNaN(b)){c.ad=b;c.frames=[];a=null;break a}}c.ad=1;c.frames=[]}null!==a&&Lc(c,a)}};this.W.onerror=function(a){c.e("WebSocket error.  Closing connection.");(a=a.message||a.data)&&c.e(a);c.Pa()}};Q.prototype.start=function(){};Q.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==Ic&&!Jc};
Q.responsesRequiredToBeHealthy=2;Q.healthyTimeout=3E4;h=Q.prototype;h.$b=function(){nb.remove("previous_websocket_failure")};function Lc(a,b){a.frames.push(b);if(a.frames.length==a.ad){var c=a.frames.join("");a.frames=null;c=ra(c);a.Wd(c)}}h.send=function(a){Kc(this);a=u(a);this.Ia+=a.length;Bc(this.ea,"bytes_sent",a.length);a=ac(a,16384);1<a.length&&this.W.send(String(a.length));for(var b=0;b<a.length;b++)this.W.send(a[b])};
h.Nb=function(){this.Ma=!0;this.vb&&(clearInterval(this.vb),this.vb=null);this.W&&(this.W.close(),this.W=null)};h.Pa=function(){this.Ma||(this.e("WebSocket is closing itself"),this.Nb(),this.ia&&(this.ia(this.qb),this.ia=null))};h.close=function(){this.Ma||(this.e("WebSocket is being closed"),this.Nb())};function Kc(a){clearInterval(a.vb);a.vb=setInterval(function(){a.W&&a.W.send("0");Kc(a)},Math.floor(45E3))};function Mc(a){this.Pc=a;this.jc=[];this.Xa=0;this.Bc=-1;this.Oa=null}function Nc(a,b,c){a.Bc=b;a.Oa=c;a.Bc<a.Xa&&(a.Oa(),a.Oa=null)}function Oc(a,b,c){for(a.jc[b]=c;a.jc[a.Xa];){var d=a.jc[a.Xa];delete a.jc[a.Xa];for(var e=0;e<d.length;++e)if(d[e]){var f=a;ic(function(){f.Pc(d[e])})}if(a.Xa===a.Bc){a.Oa&&(clearTimeout(a.Oa),a.Oa(),a.Oa=null);break}a.Xa++}};function Pc(){this.set={}}h=Pc.prototype;h.add=function(a,b){this.set[a]=null!==b?b:!0};h.contains=function(a){return A(this.set,a)};h.get=function(a){return this.contains(a)?this.set[a]:void 0};h.remove=function(a){delete this.set[a]};h.f=function(){var a;a:{a=this.set;for(var b in a){a=!1;break a}a=!0}return a};h.count=function(){var a=this.set,b=0,c;for(c in a)b++;return b};function R(a,b){cc(a.set,function(a,d){b(d,a)})}h.keys=function(){var a=[];cc(this.set,function(b,c){a.push(c)});return a};function Qc(a,b,c){this.Cc=a;this.e=Tb(a);this.Ha=this.Ia=0;this.ea=Gc(b);this.sc=c;this.qb=!1;this.Rb=function(a){b.host!==b.ga&&(a.ns=b.bc);var c=[],f;for(f in a)a.hasOwnProperty(f)&&c.push(f+"="+a[f]);return(b.qc?"https://":"http://")+b.ga+"/.lp?"+c.join("&")}}var Rc,Sc;
Qc.prototype.open=function(a,b){this.dd=0;this.S=b;this.pd=new Mc(a);this.Ma=!1;var c=this;this.Ja=setTimeout(function(){c.e("Timed out trying to connect.");c.Pa();c.Ja=null},Math.floor(3E4));Wb(function(){if(!c.Ma){c.la=new Tc(function(a,b,d,k,l){Uc(c,arguments);if(c.la)if(c.Ja&&(clearTimeout(c.Ja),c.Ja=null),c.qb=!0,"start"==a)c.id=b,c.sd=d;else if("close"===a)b?(c.la.rc=!1,Nc(c.pd,b,function(){c.Pa()})):c.Pa();else throw Error("Unrecognized command received: "+a);},function(a,b){Uc(c,arguments);
Oc(c.pd,a,b)},function(){c.Pa()},c.Rb);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.la.uc&&(a.cb=c.la.uc);a.v="5";c.sc&&(a.s=c.sc);a=c.Rb(a);c.e("Connecting via long-poll to "+a);Vc(c.la,a,function(){})}})};Qc.prototype.start=function(){var a=this.la,b=this.sd;a.Ud=this.id;a.Vd=b;for(a.xc=!0;Wc(a););a=this.id;b=this.sd;this.eb=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.eb.src=this.Rb(c);this.eb.style.display="none";document.body.appendChild(this.eb)};
Qc.isAvailable=function(){return!Sc&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.je)&&(Rc||!0)};h=Qc.prototype;h.$b=function(){};h.Nb=function(){this.Ma=!0;this.la&&(this.la.close(),this.la=null);this.eb&&(document.body.removeChild(this.eb),this.eb=null);this.Ja&&(clearTimeout(this.Ja),this.Ja=null)};
h.Pa=function(){this.Ma||(this.e("Longpoll is closing itself"),this.Nb(),this.S&&(this.S(this.qb),this.S=null))};h.close=function(){this.Ma||(this.e("Longpoll is being closed."),this.Nb())};
h.send=function(a){a=u(a);this.Ia+=a.length;Bc(this.ea,"bytes_sent",a.length);a=sa(a);if(!fa(a))throw Error("encodeByteArray takes an array as a parameter");if(!Mb){Mb={};Nb={};for(var b=0;65>b;b++)Mb[b]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b),Nb[b]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(b)}for(var b=Nb,c=[],d=0;d<a.length;d+=3){var e=a[d],f=d+1<a.length,g=f?a[d+1]:0,k=d+2<a.length,l=k?a[d+2]:0,m=e>>2,e=(e&3)<<4|g>>4,g=(g&15)<<
2|l>>6,l=l&63;k||(l=64,f||(g=64));c.push(b[m],b[e],b[g],b[l])}a=ac(c.join(""),1840);for(b=0;b<a.length;b++)c=this.la,c.Hb.push({de:this.dd,he:a.length,fd:a[b]}),c.xc&&Wc(c),this.dd++};function Uc(a,b){var c=u(b).length;a.Ha+=c;Bc(a.ea,"bytes_received",c)}
function Tc(a,b,c,d){this.Rb=d;this.ia=c;this.Rc=new Pc;this.Hb=[];this.Dc=Math.floor(1E8*Math.random());this.rc=!0;this.uc=Ob();window["pLPCommand"+this.uc]=a;window["pRTLPCB"+this.uc]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||K("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
a.contentDocument?a.za=a.contentDocument:a.contentWindow?a.za=a.contentWindow.document:a.document&&(a.za=a.document);this.Z=a;a="";this.Z.src&&"javascript:"===this.Z.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Z.za.open(),this.Z.za.write(a),this.Z.za.close()}catch(f){K("frame writing exception"),f.stack&&K(f.stack),K(f)}}
Tc.prototype.close=function(){this.xc=!1;if(this.Z){this.Z.za.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Z&&(document.body.removeChild(a.Z),a.Z=null)},Math.floor(0))}var b=this.ia;b&&(this.ia=null,b())};
function Wc(a){if(a.xc&&a.rc&&a.Rc.count()<(0<a.Hb.length?2:1)){a.Dc++;var b={};b.id=a.Ud;b.pw=a.Vd;b.ser=a.Dc;for(var b=a.Rb(b),c="",d=0;0<a.Hb.length;)if(1870>=a.Hb[0].fd.length+30+c.length){var e=a.Hb.shift(),c=c+"&seg"+d+"="+e.de+"&ts"+d+"="+e.he+"&d"+d+"="+e.fd;d++}else break;Zc(a,b+c,a.Dc);return!0}return!1}function Zc(a,b,c){function d(){a.Rc.remove(c);Wc(a)}a.Rc.add(c);var e=setTimeout(d,Math.floor(25E3));Vc(a,b,function(){clearTimeout(e);d()})}
function Vc(a,b,c){setTimeout(function(){try{if(a.rc){var d=a.Z.za.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){K("Long-poll script failed to load: "+b);a.rc=!1;a.close()};a.Z.za.body.appendChild(d)}}catch(e){}},Math.floor(1))};function $c(a){ad(this,a)}var bd=[Qc,Q];function ad(a,b){var c=Q&&Q.isAvailable(),d=c&&!(nb.od||!0===nb.get("previous_websocket_failure"));b.ie&&(c||L("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.Ob=[Q];else{var e=a.Ob=[];bc(bd,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function cd(a){if(0<a.Ob.length)return a.Ob[0];throw Error("No transports available");};function dd(a,b,c,d,e,f){this.id=a;this.e=Tb("c:"+this.id+":");this.Pc=c;this.Cb=d;this.S=e;this.Oc=f;this.M=b;this.ic=[];this.cd=0;this.Cd=new $c(b);this.ma=0;this.e("Connection created");ed(this)}
function ed(a){var b=cd(a.Cd);a.B=new b("c:"+a.id+":"+a.cd++,a.M);a.Tc=b.responsesRequiredToBeHealthy||0;var c=fd(a,a.B),d=gd(a,a.B);a.Pb=a.B;a.Mb=a.B;a.w=null;a.Na=!1;setTimeout(function(){a.B&&a.B.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.Yb=setTimeout(function(){a.Yb=null;a.Na||(a.B&&102400<a.B.Ha?(a.e("Connection exceeded healthy timeout but has received "+a.B.Ha+" bytes.  Marking connection healthy."),a.Na=!0,a.B.$b()):a.B&&10240<a.B.Ia?a.e("Connection exceeded healthy timeout but has sent "+
a.B.Ia+" bytes.  Leaving connection alive."):(a.e("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function gd(a,b){return function(c){b===a.B?(a.B=null,c||0!==a.ma?1===a.ma&&a.e("Realtime connection lost."):(a.e("Realtime connection failed."),"s-"===a.M.ga.substr(0,2)&&(nb.remove("host:"+a.M.host),a.M.ga=a.M.host)),a.close()):b===a.w?(a.e("Secondary connection lost."),c=a.w,a.w=null,a.Pb!==c&&a.Mb!==c||a.close()):a.e("closing an old connection")}}
function fd(a,b){return function(c){if(2!=a.ma)if(b===a.Mb){var d=$b("t",c);c=$b("d",c);if("c"==d){if(d=$b("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.sc=c.s;qb(a.M,f);0==a.ma&&(a.B.start(),hd(a,a.B,d),"5"!==e&&L("Protocol version mismatch detected"),c=a.Cd,(c=1<c.Ob.length?c.Ob[1]:null)&&id(a,c))}else if("n"===d){a.e("recvd end transmission on primary");a.Mb=a.w;for(c=0;c<a.ic.length;++c)a.gc(a.ic[c]);a.ic=[];jd(a)}else"s"===d?(a.e("Connection shutdown command received. Shutting down..."),
a.Oc&&(a.Oc(c),a.Oc=null),a.S=null,a.close()):"r"===d?(a.e("Reset packet received.  New host: "+c),qb(a.M,c),1===a.ma?a.close():(kd(a),ed(a))):"e"===d?Ub("Server Error: "+c):"o"===d?(a.e("got pong on primary."),ld(a),md(a)):Ub("Unknown control packet command: "+d)}else"d"==d&&a.gc(c)}else if(b===a.w)if(d=$b("t",c),c=$b("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?nd(a):"r"===c?(a.e("Got a reset on secondary, closing it"),a.w.close(),a.Pb!==a.w&&a.Mb!==a.w||a.close()):"o"===c&&(a.e("got pong on secondary."),
a.xd--,nd(a)));else if("d"==d)a.ic.push(c);else throw Error("Unknown protocol layer: "+d);else a.e("message on old connection")}}dd.prototype.yd=function(a){od(this,{t:"d",d:a})};function jd(a){a.Pb===a.w&&a.Mb===a.w&&(a.e("cleaning up and promoting a connection: "+a.w.Cc),a.B=a.w,a.w=null)}
function nd(a){0>=a.xd?(a.e("Secondary connection is healthy."),a.Na=!0,a.w.$b(),a.w.start(),a.e("sending client ack on secondary"),a.w.send({t:"c",d:{t:"a",d:{}}}),a.e("Ending transmission on primary"),a.B.send({t:"c",d:{t:"n",d:{}}}),a.Pb=a.w,jd(a)):(a.e("sending ping on secondary."),a.w.send({t:"c",d:{t:"p",d:{}}}))}dd.prototype.gc=function(a){ld(this);this.Pc(a)};function ld(a){a.Na||(a.Tc--,0>=a.Tc&&(a.e("Primary connection is healthy."),a.Na=!0,a.B.$b()))}
function id(a,b){a.w=new b("c:"+a.id+":"+a.cd++,a.M,a.sc);a.xd=b.responsesRequiredToBeHealthy||0;a.w.open(fd(a,a.w),gd(a,a.w));setTimeout(function(){a.w&&(a.e("Timed out trying to upgrade."),a.w.close())},Math.floor(6E4))}function hd(a,b,c){a.e("Realtime connection established.");a.B=b;a.ma=1;a.Cb&&(a.Cb(c),a.Cb=null);0===a.Tc?(a.e("Primary connection is healthy."),a.Na=!0):setTimeout(function(){md(a)},Math.floor(5E3))}
function md(a){a.Na||1!==a.ma||(a.e("sending ping on primary."),od(a,{t:"c",d:{t:"p",d:{}}}))}function od(a,b){if(1!==a.ma)throw"Connection is not connected";a.Pb.send(b)}dd.prototype.close=function(){2!==this.ma&&(this.e("Closing realtime connection."),this.ma=2,kd(this),this.S&&(this.S(),this.S=null))};function kd(a){a.e("Shutting down all connections");a.B&&(a.B.close(),a.B=null);a.w&&(a.w.close(),a.w=null);a.Yb&&(clearTimeout(a.Yb),a.Yb=null)};function pd(a,b,c,d,e,f){this.id=qd++;this.e=Tb("p:"+this.id+":");this.Sa=!0;this.ha={};this.T=[];this.Eb=0;this.Bb=[];this.R=!1;this.sa=1E3;this.ac=3E5;this.hc=b||ba;this.fc=c||ba;this.Ab=d||ba;this.Qc=e||ba;this.Hc=f||ba;this.M=a;this.Vc=null;this.Lb={};this.ce=0;this.wb=this.Lc=null;rd(this,0);wc.sb().fb("visible",this.Yd,this);-1===a.host.indexOf("fblocal")&&xc.sb().fb("online",this.Xd,this)}var qd=0,sd=0;h=pd.prototype;
h.Ea=function(a,b,c){var d=++this.ce;a={r:d,a:a,b:b};this.e(u(a));v(this.R,"sendRequest_ call when we're not connected not allowed.");this.ka.yd(a);c&&(this.Lb[d]=c)};function td(a,b,c){var d=b.toString(),e=b.path().toString();a.ha[e]=a.ha[e]||{};v(!a.ha[e][d],"listen() called twice for same path/queryId.");a.ha[e][d]={hb:b.hb(),D:c};a.R&&ud(a,e,d,b.hb(),c)}
function ud(a,b,c,d,e){a.e("Listen on "+b+" for "+c);var f={p:b};d=Ab(d,function(a){return Ka(a)});"{}"!==c&&(f.q=d);f.h=a.Hc(b);a.Ea("l",f,function(d){a.e("listen response",d);d=d.s;"ok"!==d&&vd(a,b,c);e&&e(d)})}
h.mb=function(a,b,c){this.Ka={Jd:a,hd:!1,aa:b,Ub:c};this.e("Authenticating using credential: "+this.Ka);wd(this);if(!(b=40==a.length))a:{var d;try{var e=a.split(".");if(3!==e.length){b=!1;break a}var f;b:{try{if("undefined"!==typeof atob){f=atob(e[1]);break b}}catch(g){K("base64DecodeIfNativeSupport failed: ",g)}f=null}null!==f&&(d=ra(f))}catch(k){K("isAdminAuthToken_ failed",k)}b="object"===typeof d&&!0===wa(d,"admin")}b&&(this.e("Admin auth credential detected.  Reducing max reconnect time."),this.ac=
3E4)};h.Qb=function(a){delete this.Ka;this.Ab(!1);this.R&&this.Ea("unauth",{},function(b){a(b.s,b.d)})};function wd(a){var b=a.Ka;a.R&&b&&a.Ea("auth",{cred:b.Jd},function(c){var d=c.s;c=c.d||"error";"ok"!==d&&a.Ka===b&&delete a.Ka;a.Ab("ok"===d);b.hd?"ok"!==d&&b.Ub&&b.Ub(d,c):(b.hd=!0,b.aa&&b.aa(d,c))})}function xd(a,b,c,d){b=b.toString();vd(a,b,c)&&a.R&&yd(a,b,c,d)}function yd(a,b,c,d){a.e("Unlisten on "+b+" for "+c);b={p:b};d=Ab(d,function(a){return Ka(a)});"{}"!==c&&(b.q=d);a.Ea("u",b)}
function zd(a,b,c,d){a.R?Ad(a,"o",b,c,d):a.Bb.push({Sc:b,action:"o",data:c,D:d})}function Bd(a,b,c,d){a.R?Ad(a,"om",b,c,d):a.Bb.push({Sc:b,action:"om",data:c,D:d})}h.Nc=function(a,b){this.R?Ad(this,"oc",a,null,b):this.Bb.push({Sc:a,action:"oc",data:null,D:b})};function Ad(a,b,c,d,e){c={p:c,d:d};a.e("onDisconnect "+b,c);a.Ea(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}h.put=function(a,b,c,d){Cd(this,"p",a,b,c,d)};function Dd(a,b,c,d){Cd(a,"m",b,c,d,void 0)}
function Cd(a,b,c,d,e,f){c={p:c,d:d};n(f)&&(c.h=f);a.T.push({action:b,ud:c,D:e});a.Eb++;b=a.T.length-1;a.R&&Ed(a,b)}function Ed(a,b){var c=a.T[b].action,d=a.T[b].ud,e=a.T[b].D;a.T[b].$d=a.R;a.Ea(c,d,function(d){a.e(c+" response",d);delete a.T[b];a.Eb--;0===a.Eb&&(a.T=[]);e&&e(d.s,d.d)})}
h.gc=function(a){if("r"in a){this.e("from server: "+u(a));var b=a.r,c=this.Lb[b];c&&(delete this.Lb[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,c=a.b,this.e("handleServerMessage",b,c),"d"===b?this.hc(c.p,c.d,!1):"m"===b?this.hc(c.p,c.d,!0):"c"===b?Fd(this,c.p,c.q):"ac"===b?(a=c.s,b=c.d,c=this.Ka,delete this.Ka,c&&c.Ub&&c.Ub(a,b),this.Ab(!1)):"sd"===b?this.Vc?this.Vc(c):"msg"in c&&"undefined"!==typeof console&&console.log("FIREBASE: "+c.msg.replace("\n",
"\nFIREBASE: ")):Ub("Unrecognized action received from server: "+u(b)+"\nAre you using the latest client?"))}};h.Cb=function(a){this.e("connection ready");this.R=!0;this.wb=(new Date).getTime();this.Qc({serverTimeOffset:a-(new Date).getTime()});wd(this);for(var b in this.ha)for(var c in this.ha[b])a=this.ha[b][c],ud(this,b,c,a.hb,a.D);for(b=0;b<this.T.length;b++)this.T[b]&&Ed(this,b);for(;this.Bb.length;)b=this.Bb.shift(),Ad(this,b.action,b.Sc,b.data,b.D);this.fc(!0)};
function rd(a,b){v(!a.ka,"Scheduling a connect when we're already connected/ing?");a.Za&&clearTimeout(a.Za);a.Za=setTimeout(function(){a.Za=null;Gd(a)},Math.floor(b))}h.Yd=function(a){a&&!this.lb&&this.sa===this.ac&&(this.e("Window became visible.  Reducing delay."),this.sa=1E3,this.ka||rd(this,0));this.lb=a};
h.Xd=function(a){a?(this.e("Browser went online.  Reconnecting."),this.sa=1E3,this.Sa=!0,this.ka||rd(this,0)):(this.e("Browser went offline.  Killing connection; don't reconnect."),this.Sa=!1,this.ka&&this.ka.close())};
h.qd=function(){this.e("data client disconnected");this.R=!1;this.ka=null;for(var a=0;a<this.T.length;a++){var b=this.T[a];b&&"h"in b.ud&&b.$d&&(b.D&&b.D("disconnect"),delete this.T[a],this.Eb--)}0===this.Eb&&(this.T=[]);if(this.Sa)this.lb?this.wb&&(3E4<(new Date).getTime()-this.wb&&(this.sa=1E3),this.wb=null):(this.e("Window isn't visible.  Delaying reconnect."),this.sa=this.ac,this.Lc=(new Date).getTime()),a=Math.max(0,this.sa-((new Date).getTime()-this.Lc)),a*=Math.random(),this.e("Trying to reconnect in "+
a+"ms"),rd(this,a),this.sa=Math.min(this.ac,1.3*this.sa);else for(var c in this.Lb)delete this.Lb[c];this.fc(!1)};function Gd(a){if(a.Sa){a.e("Making a connection attempt");a.Lc=(new Date).getTime();a.wb=null;var b=r(a.gc,a),c=r(a.Cb,a),d=r(a.qd,a),e=a.id+":"+sd++;a.ka=new dd(e,a.M,b,c,d,function(b){L(b+" ("+a.M.toString()+")");a.Sa=!1})}}h.La=function(){this.Sa=!1;this.ka?this.ka.close():(this.Za&&(clearTimeout(this.Za),this.Za=null),this.R&&this.qd())};
h.jb=function(){this.Sa=!0;this.sa=1E3;this.R||rd(this,0)};function Fd(a,b,c){c=c?Ab(c,function(a){return La(a)}).join("$"):"{}";(a=vd(a,b,c))&&a.D&&a.D("permission_denied")}function vd(a,b,c){b=(new F(b)).toString();c||(c="{}");var d=a.ha[b][c];delete a.ha[b][c];return d};function Hd(){this.n=this.F=null}function Id(a,b,c){if(b.f())a.F=c,a.n=null;else if(null!==a.F)a.F=a.F.ya(b,c);else{null==a.n&&(a.n=new Pc);var d=C(b);a.n.contains(d)||a.n.add(d,new Hd);a=a.n.get(d);b=Ma(b);Id(a,b,c)}}function Jd(a,b){if(b.f())return a.F=null,a.n=null,!0;if(null!==a.F){if(a.F.O())return!1;var c=a.F;a.F=null;c.A(function(b,c){Id(a,new F(b),c)});return Jd(a,b)}return null!==a.n?(c=C(b),b=Ma(b),a.n.contains(c)&&Jd(a.n.get(c),b)&&a.n.remove(c),a.n.f()?(a.n=null,!0):!1):!0}
function Kd(a,b,c){null!==a.F?c(b,a.F):a.A(function(a,e){var f=new F(b.toString()+"/"+a);Kd(e,f,c)})}Hd.prototype.A=function(a){null!==this.n&&R(this.n,function(b,c){a(b,c)})};function Ld(){this.$=M}function S(a,b){return a.$.K(b)}function T(a,b,c){a.$=a.$.ya(b,c)}Ld.prototype.toString=function(){return this.$.toString()};function Md(){this.ta=new Ld;this.L=new Ld;this.oa=new Ld;this.Gb=new Qa}function Nd(a,b,c){T(a.ta,b,c);return Od(a,b)}function Od(a,b){for(var c=S(a.ta,b),d=S(a.L,b),e=I(a.Gb,b),f=!1,g=e;null!==g;){if(null!==g.j()){f=!0;break}g=g.parent()}if(f)return!1;c=Pd(c,d,e);return c!==d?(T(a.L,b,c),!0):!1}function Pd(a,b,c){if(c.f())return a;if(null!==c.j())return b;a=a||M;c.A(function(d){d=d.name();var e=a.N(d),f=b.N(d),g=I(c,d),e=Pd(e,f,g);a=a.H(d,e)});return a}
Md.prototype.set=function(a,b){var c=this,d=[];zb(b,function(a){var b=a.path;a=a.ra;var g=Ob();J(I(c.Gb,b),g);T(c.L,b,a);d.push({path:b,ee:g})});return d};function Qd(a,b){zb(b,function(b){var d=b.ee;b=I(a.Gb,b.path);var e=b.j();v(null!==e,"pendingPut should not be null.");e===d&&J(b,null)})};function Rd(a,b){return a&&"object"===typeof a?(v(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function Sd(a,b){var c=new Hd;Kd(a,new F(""),function(a,e){Id(c,a,Td(e,b))});return c}function Td(a,b){var c=Rd(a.k(),b),d;if(a.O()){var e=Rd(a.j(),b);return e!==a.j()||c!==a.k()?new jc(e,c):a}d=a;c!==a.k()&&(d=d.Ga(c));a.A(function(a,c){var e=Td(c,b);e!==c&&(d=d.H(a,e))});return d};function Ud(){this.$a=[]}function Vd(a,b){if(0!==b.length)for(var c=0;c<b.length;c++)a.$a.push(b[c])}Ud.prototype.Jb=function(){for(var a=0;a<this.$a.length;a++)if(this.$a[a]){var b=this.$a[a];this.$a[a]=null;Wd(b)}this.$a=[]};function Wd(a){var b=a.aa,c=a.zd,d=a.Ib;ic(function(){b(c,d)})};function U(a,b,c,d){this.type=a;this.ua=b;this.ba=c;this.Ib=d};function Xd(a){this.Q=a;this.pa=[];this.Ec=new Ud}function Yd(a,b,c,d,e){a.pa.push({type:b,aa:c,cancel:d,Y:e});d=[];var f=Zd(a.i);a.ub&&f.push(new U("value",a.i));for(var g=0;g<f.length;g++)if(f[g].type===b){var k=new E(a.Q.m,a.Q.path);f[g].ba&&(k=k.G(f[g].ba));d.push({aa:dc(c,e),zd:new P(f[g].ua,k),Ib:f[g].Ib})}Vd(a.Ec,d)}Xd.prototype.lc=function(a,b){b=this.mc(a,b);null!=b&&$d(this,b)};
function $d(a,b){for(var c=[],d=0;d<b.length;d++){var e=b[d],f=e.type,g=new E(a.Q.m,a.Q.path);b[d].ba&&(g=g.G(b[d].ba));g=new P(b[d].ua,g);"value"!==e.type||g.tb()?"value"!==e.type&&(f+=" "+g.name()):f+="("+g.V()+")";K(a.Q.m.u.id+": event:"+a.Q.path+":"+a.Q.Qa()+":"+f);for(f=0;f<a.pa.length;f++){var k=a.pa[f];b[d].type===k.type&&c.push({aa:dc(k.aa,k.Y),zd:g,Ib:e.Ib})}}Vd(a.Ec,c)}Xd.prototype.Jb=function(){this.Ec.Jb()};
function Zd(a){var b=[];if(!a.O()){var c=null;a.A(function(a,e){b.push(new U("child_added",e,a,c));c=a})}return b}function ae(a){a.ub||(a.ub=!0,$d(a,[new U("value",a.i)]))};function be(a,b){Xd.call(this,a);this.i=b}ka(be,Xd);be.prototype.mc=function(a,b){this.i=a;this.ub&&null!=b&&b.push(new U("value",this.i));return b};be.prototype.rb=function(){return{}};function ce(a,b){this.Wb=a;this.Mc=b}function de(a,b,c,d,e){var f=a.K(c),g=b.K(c);d=new ce(d,e);e=ee(d,c,f,g);g=!f.f()&&!g.f()&&f.k()!==g.k();if(e||g)for(f=c,c=e;null!==f.parent();){var k=a.K(f);e=b.K(f);var l=f.parent();if(!d.Wb||I(d.Wb,l).j()){var m=b.K(l),p=[],f=Na(f);k.f()?(k=m.fa(f,e),p.push(new U("child_added",e,f,k))):e.f()?p.push(new U("child_removed",k,f)):(k=m.fa(f,e),g&&p.push(new U("child_moved",e,f,k)),c&&p.push(new U("child_changed",e,f,k)));d.Mc(l,m,p)}g&&(g=!1,c=!0);f=l}}
function ee(a,b,c,d){var e,f=[];c===d?e=!1:c.O()&&d.O()?e=c.j()!==d.j():c.O()?(fe(a,b,M,d,f),e=!0):d.O()?(fe(a,b,c,M,f),e=!0):e=fe(a,b,c,d,f);e?a.Mc(b,d,f):c.k()!==d.k()&&a.Mc(b,d,null);return e}
function fe(a,b,c,d,e){var f=!1,g=!a.Wb||!I(a.Wb,b).f(),k=[],l=[],m=[],p=[],t={},s={},w,V,G,H;w=c.ab();G=Za(w);V=d.ab();for(H=Za(V);null!==G||null!==H;){c=H;c=null===G?1:null===c?-1:G.key===c.key?0:lc({name:G.key,ja:G.value.k()},{name:c.key,ja:c.value.k()});if(0>c)f=wa(t,G.key),n(f)?(m.push({Gc:G,$c:k[f]}),k[f]=null):(s[G.key]=l.length,l.push(G)),f=!0,G=Za(w);else{if(0<c)f=wa(s,H.key),n(f)?(m.push({Gc:l[f],$c:H}),l[f]=null):(t[H.key]=k.length,k.push(H)),f=!0;else{c=b.G(H.key);if(c=ee(a,c,G.value,
H.value))p.push(H),f=!0;G.value.k()!==H.value.k()&&(m.push({Gc:G,$c:H}),f=!0);G=Za(w)}H=Za(V)}if(!g&&f)return!0}for(g=0;g<l.length;g++)if(t=l[g])c=b.G(t.key),ee(a,c,t.value,M),e.push(new U("child_removed",t.value,t.key));for(g=0;g<k.length;g++)if(t=k[g])c=b.G(t.key),l=d.fa(t.key,t.value),ee(a,c,M,t.value),e.push(new U("child_added",t.value,t.key,l));for(g=0;g<m.length;g++)t=m[g].Gc,k=m[g].$c,c=b.G(k.key),l=d.fa(k.key,k.value),e.push(new U("child_moved",k.value,k.key,l)),(c=ee(a,c,t.value,k.value))&&
p.push(k);for(g=0;g<p.length;g++)a=p[g],l=d.fa(a.key,a.value),e.push(new U("child_changed",a.value,a.key,l));return f};function ge(){this.X=this.xa=null;this.set={}}ka(ge,Pc);h=ge.prototype;h.setActive=function(a){this.xa=a};function he(a,b,c){a.add(b,c);a.X||(a.X=c.Q.path)}function ie(a){var b=a.xa;a.xa=null;return b}function je(a){return a.contains("default")}function ke(a){return null!=a.xa&&je(a)}h.defaultView=function(){return je(this)?this.get("default"):null};h.path=function(){return this.X};h.toString=function(){return Ab(this.keys(),function(a){return"default"===a?"{}":a}).join("$")};
h.hb=function(){var a=[];R(this,function(b,c){a.push(c.Q)});return a};function le(a,b){Xd.call(this,a);this.i=M;this.mc(b,Zd(b))}ka(le,Xd);
le.prototype.mc=function(a,b){if(null===b)return b;var c=[],d=this.Q;n(d.da)&&(n(d.wa)&&null!=d.wa?c.push(function(a,b){var c=Xb(b,d.da);return 0<c||0===c&&0<=Yb(a,d.wa)}):c.push(function(a,b){return 0<=Xb(b,d.da)}));n(d.Aa)&&(n(d.Ya)?c.push(function(a,b){var c=Xb(b,d.Aa);return 0>c||0===c&&0>=Yb(a,d.Ya)}):c.push(function(a,b){return 0>=Xb(b,d.Aa)}));var e=null,f=null;if(n(this.Q.Ca))if(n(this.Q.da)){if(e=me(a,c,this.Q.Ca,!1)){var g=a.N(e).k();c.push(function(a,b){var c=Xb(b,g);return 0>c||0===c&&
0>=Yb(a,e)})}}else if(f=me(a,c,this.Q.Ca,!0)){var k=a.N(f).k();c.push(function(a,b){var c=Xb(b,k);return 0<c||0===c&&0<=Yb(a,f)})}for(var l=[],m=[],p=[],t=[],s=0;s<b.length;s++){var w=b[s].ba,V=b[s].ua;switch(b[s].type){case "child_added":ne(c,w,V)&&(this.i=this.i.H(w,V),m.push(b[s]));break;case "child_removed":this.i.N(w).f()||(this.i=this.i.H(w,null),l.push(b[s]));break;case "child_changed":!this.i.N(w).f()&&ne(c,w,V)&&(this.i=this.i.H(w,V),t.push(b[s]));break;case "child_moved":var G=!this.i.N(w).f(),
H=ne(c,w,V);G?H?(this.i=this.i.H(w,V),p.push(b[s])):(l.push(new U("child_removed",this.i.N(w),w)),this.i=this.i.H(w,null)):H&&(this.i=this.i.H(w,V),m.push(b[s]))}}var Xc=e||f;if(Xc){var Yc=(s=null!==f)?this.i.jd():this.i.ld(),hc=!1,ab=!1,bb=this;(s?a.Fc:a.A).call(a,function(a,b){ab||null!==Yc||(ab=!0);if(ab&&hc)return!0;hc?(l.push(new U("child_removed",bb.i.N(a),a)),bb.i=bb.i.H(a,null)):ab&&(m.push(new U("child_added",b,a)),bb.i=bb.i.H(a,b));Yc===a&&(ab=!0);a===Xc&&(hc=!0)})}for(s=0;s<m.length;s++)c=
m[s],w=this.i.fa(c.ba,c.ua),l.push(new U("child_added",c.ua,c.ba,w));for(s=0;s<p.length;s++)c=p[s],w=this.i.fa(c.ba,c.ua),l.push(new U("child_moved",c.ua,c.ba,w));for(s=0;s<t.length;s++)c=t[s],w=this.i.fa(c.ba,c.ua),l.push(new U("child_changed",c.ua,c.ba,w));this.ub&&0<l.length&&l.push(new U("value",this.i));return l};function me(a,b,c,d){if(a.O())return null;var e=null;(d?a.Fc:a.A).call(a,function(a,d){if(ne(b,a,d)&&(e=a,c--,0===c))return!0});return e}
function ne(a,b,c){for(var d=0;d<a.length;d++)if(!a[d](b,c.k()))return!1;return!0}le.prototype.Ic=function(a){return this.i.N(a)!==M};
le.prototype.rb=function(a,b,c){var d={};this.i.O()||this.i.A(function(a){d[a]=3});var e=this.i;c=S(c,new F(""));var f=new Qa;J(I(f,this.Q.path),!0);b=M.ya(a,b);var g=this;de(c,b,a,f,function(a,b,c){null!==c&&a.toString()===g.Q.path.toString()&&g.mc(b,c)});this.i.O()?cc(d,function(a,b){d[b]=2}):(this.i.A(function(a){A(d,a)||(d[a]=1)}),cc(d,function(a,b){g.i.N(b).f()&&(d[b]=2)}));this.i=e;return d};function oe(a,b){this.u=a;this.g=b;this.ec=b.$;this.na=new Qa}oe.prototype.Sb=function(a,b,c,d,e){var f=a.path,g=I(this.na,f),k=g.j();null===k?(k=new ge,J(g,k)):v(!k.f(),"We shouldn't be storing empty QueryMaps");var l=a.Qa();if(k.contains(l))a=k.get(l),Yd(a,b,c,d,e);else{var m=this.g.$.K(f);a=pe(a,m);qe(this,g,k,l,a);Yd(a,b,c,d,e);(b=(b=Ta(I(this.na,f),function(a){var b;if(b=a.j()&&a.j().defaultView())b=a.j().defaultView().ub;if(b)return!0},!0))||null===this.u&&!S(this.g,f).f())&&ae(a)}a.Jb()};
function re(a,b,c,d,e){var f=a.get(b),g;if(g=f){g=!1;for(var k=f.pa.length-1;0<=k;k--){var l=f.pa[k];if(!(c&&l.type!==c||d&&l.aa!==d||e&&l.Y!==e)&&(f.pa.splice(k,1),g=!0,c&&d))break}}(c=g&&!(0<f.pa.length))&&a.remove(b);return c}function se(a,b,c,d,e){b=b?b.Qa():null;var f=[];b&&"default"!==b?re(a,b,c,d,e)&&f.push(b):zb(a.keys(),function(b){re(a,b,c,d,e)&&f.push(b)});return f}oe.prototype.oc=function(a,b,c,d){var e=I(this.na,a.path).j();return null===e?null:te(this,e,a,b,c,d)};
function te(a,b,c,d,e,f){var g=b.path(),g=I(a.na,g);c=se(b,c,d,e,f);b.f()&&J(g,null);d=ue(g);if(0<c.length&&!d){d=g;e=g.parent();for(c=!1;!c&&e;){if(f=e.j()){v(!ke(f));var k=d.name(),l=!1;R(f,function(a,b){l=b.Ic(k)||l});l&&(c=!0)}d=e;e=e.parent()}d=null;ke(b)||(b=ie(b),d=ve(a,g),b&&b());return c?null:d}return null}function we(a,b,c){Sa(I(a.na,b),function(a){(a=a.j())&&R(a,function(a,b){ae(b)})},c,!0)}
function W(a,b,c){function d(a){do{if(g[a.toString()])return!0;a=a.parent()}while(null!==a);return!1}var e=a.ec,f=a.g.$;a.ec=f;for(var g={},k=0;k<c.length;k++)g[c[k].toString()]=!0;de(e,f,b,a.na,function(c,e,f){if(b.contains(c)){var g=d(c);g&&we(a,c,!1);a.lc(c,e,f);g&&we(a,c,!0)}else a.lc(c,e,f)});d(b)&&we(a,b,!0);xe(a,b)}function xe(a,b){var c=I(a.na,b);Sa(c,function(a){(a=a.j())&&R(a,function(a,b){b.Jb()})},!0,!0);Ta(c,function(a){(a=a.j())&&R(a,function(a,b){b.Jb()})},!1)}
oe.prototype.lc=function(a,b,c){a=I(this.na,a).j();null!==a&&R(a,function(a,e){e.lc(b,c)})};function ue(a){return Ta(a,function(a){return a.j()&&ke(a.j())})}function qe(a,b,c,d,e){if(ke(c)||ue(b))he(c,d,e);else{var f,g;c.f()||(f=c.toString(),g=c.hb());he(c,d,e);c.setActive(ye(a,c));f&&g&&xd(a.u,c.path(),f,g)}ke(c)&&Sa(b,function(a){if(a=a.j())a.xa&&a.xa(),a.xa=null})}
function ve(a,b){function c(b){var f=b.j();if(f&&je(f))d.push(f.path()),null==f.xa&&f.setActive(ye(a,f));else{if(f){null!=f.xa||f.setActive(ye(a,f));var g={};R(f,function(a,b){b.i.A(function(a){A(g,a)||(g[a]=!0,a=f.path().G(a),d.push(a))})})}b.A(c)}}var d=[];c(b);return d}
function ye(a,b){if(a.u){var c=a.u,d=b.path(),e=b.toString(),f=b.hb(),g,k=b.keys(),l=je(b);td(a.u,b,function(c){"ok"!==c?(c=fc(c),L("on() or once() for "+b.path().toString()+" failed: "+c.toString()),ze(a,b,c)):g||(l?we(a,b.path(),!0):zb(k,function(a){(a=b.get(a))&&ae(a)}),xe(a,b.path()))});return function(){g=!0;xd(c,d,e,f)}}return ba}function ze(a,b,c){b&&(R(b,function(a,b){for(var f=0;f<b.pa.length;f++){var g=b.pa[f];g.cancel&&dc(g.cancel,g.Y)(c)}}),te(a,b))}
function pe(a,b){return"default"===a.Qa()?new be(a,b):new le(a,b)}oe.prototype.rb=function(a,b,c,d){function e(a){cc(a,function(a,b){f[b]=3===a?3:(wa(f,b)||a)===a?a:3})}var f={};R(b,function(b,f){e(f.rb(a,c,d))});c.O()||c.A(function(a){A(f,a)||(f[a]=4)});return f};function Ae(a,b,c,d,e){var f=b.path();b=a.rb(f,b,d,e);var g=M,k=[];cc(b,function(b,m){var p=new F(m);3===b||1===b?g=g.H(m,d.K(p)):(2===b&&k.push({path:f.G(m),ra:M}),k=k.concat(Be(a,d.K(p),I(c,p),e)))});return[{path:f,ra:g}].concat(k)}
function Ce(a,b,c,d){var e;a:{var f=I(a.na,b);e=f.parent();for(var g=[];null!==e;){var k=e.j();if(null!==k){if(je(k)){e=[{path:b,ra:c}];break a}k=a.rb(b,k,c,d);f=wa(k,f.name());if(3===f||1===f){e=[{path:b,ra:c}];break a}2===f&&g.push({path:b,ra:M})}f=e;e=e.parent()}e=g}if(1==e.length&&(!e[0].ra.f()||c.f()))return e;g=I(a.na,b);f=g.j();null!==f?je(f)?e.push({path:b,ra:c}):e=e.concat(Ae(a,f,g,c,d)):e=e.concat(Be(a,c,g,d));return e}
function Be(a,b,c,d){var e=c.j();if(null!==e)return je(e)?[{path:c.path(),ra:b}]:Ae(a,e,c,b,d);var f=[];c.A(function(c){var e=b.O()?M:b.N(c.name());c=Be(a,e,c,d);f=f.concat(c)});return f};function De(a){this.M=a;this.ea=Gc(a);this.u=new pd(this.M,r(this.hc,this),r(this.fc,this),r(this.Ab,this),r(this.Qc,this),r(this.Hc,this));this.Bd=Hc(a,r(function(){return new Dc(this.ea,this.u)},this));this.Ta=new Qa;this.Fa=new Ld;this.g=new Md;this.I=new oe(this.u,this.g.oa);this.Jc=new Ld;this.Kc=new oe(null,this.Jc);Ee(this,"connected",!1);Ee(this,"authenticated",!1);this.S=new Hd;this.Vb=0}h=De.prototype;h.toString=function(){return(this.M.qc?"https://":"http://")+this.M.host};h.name=function(){return this.M.bc};
function Fe(a){a=S(a.Jc,new F(".info/serverTimeOffset")).V()||0;return(new Date).getTime()+a}function Ge(a){a=a={timestamp:Fe(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
h.hc=function(a,b,c){this.Vb++;this.nd&&(b=this.nd(a,b));var d,e,f=[];9<=a.length&&a.lastIndexOf(".priority")===a.length-9?(d=new F(a.substring(0,a.length-9)),e=S(this.g.ta,d).Ga(b),f.push(d)):c?(d=new F(a),e=S(this.g.ta,d),cc(b,function(a,b){var c=new F(b);".priority"===b?e=e.Ga(a):(e=e.ya(c,O(a)),f.push(d.G(b)))})):(d=new F(a),e=O(b),f.push(d));a=Ce(this.I,d,e,this.g.L);b=!1;for(c=0;c<a.length;++c){var g=a[c];b=Nd(this.g,g.path,g.ra)||b}b&&(d=He(this,d));W(this.I,d,f)};
h.fc=function(a){Ee(this,"connected",a);!1===a&&Ie(this)};h.Qc=function(a){var b=this;bc(a,function(a,d){Ee(b,d,a)})};h.Hc=function(a){a=new F(a);return S(this.g.ta,a).hash()};h.Ab=function(a){Ee(this,"authenticated",a)};function Ee(a,b,c){b=new F("/.info/"+b);T(a.Jc,b,O(c));W(a.Kc,b,[b])}
h.mb=function(a,b,c){"firebaseio-demo.com"===this.M.domain&&L("FirebaseRef.auth() not supported on demo (*.firebaseio-demo.com) Firebases. Please use on production (*.firebaseio.com) Firebases only.");this.u.mb(a,function(a,c){X(b,a,c)},function(a,b){L("auth() was canceled: "+b);if(c){var f=Error(b);f.code=a.toUpperCase();c(f)}})};h.Qb=function(a){this.u.Qb(function(b,c){X(a,b,c)})};
h.kb=function(a,b,c,d){this.e("set",{path:a.toString(),value:b,ja:c});var e=Ge(this);b=O(b,c);var e=Td(b,e),e=Ce(this.I,a,e,this.g.L),f=this.g.set(a,e),g=this;this.u.put(a.toString(),b.V(!0),function(b,c){"ok"!==b&&L("set at "+a+" failed: "+b);Qd(g.g,f);Od(g.g,a);var e=He(g,a);W(g.I,e,[]);X(d,b,c)});e=Je(this,a);He(this,e);W(this.I,e,[a])};
h.update=function(a,b,c){this.e("update",{path:a.toString(),value:b});var d=S(this.g.oa,a),e=!0,f=[],g=Ge(this),k=[],l;for(l in b){var e=!1,m=O(b[l]),m=Td(m,g),d=d.H(l,m),p=a.G(l);f.push(p);m=Ce(this.I,p,m,this.g.L);k=k.concat(this.g.set(a,m))}if(e)K("update() called with empty data.  Don't do anything."),X(c,"ok");else{var t=this;Dd(this.u,a.toString(),b,function(b,d){"ok"!==b&&L("update at "+a+" failed: "+b);Qd(t.g,k);Od(t.g,a);var e=He(t,a);W(t.I,e,[]);X(c,b,d)});b=Je(this,a);He(this,b);W(t.I,
b,f)}};h.Wc=function(a,b,c){this.e("setPriority",{path:a.toString(),ja:b});var d=Ge(this),d=Rd(b,d),d=S(this.g.L,a).Ga(d),d=Ce(this.I,a,d,this.g.L),e=this.g.set(a,d),f=this;this.u.put(a.toString()+"/.priority",b,function(b,d){"permission_denied"===b&&L("setPriority at "+a+" failed: "+b);Qd(f.g,e);Od(f.g,a);var l=He(f,a);W(f.I,l,[]);X(c,b,d)});b=He(this,a);W(f.I,b,[])};
function Ie(a){a.e("onDisconnectEvents");var b=[],c=Ge(a);Kd(Sd(a.S,c),new F(""),function(c,e){var f=Ce(a.I,c,e,a.g.L);b.push.apply(b,a.g.set(c,f));f=Je(a,c);He(a,f);W(a.I,f,[c])});Qd(a.g,b);a.S=new Hd}h.Nc=function(a,b){var c=this;this.u.Nc(a.toString(),function(d,e){"ok"===d&&Jd(c.S,a);X(b,d,e)})};function Ke(a,b,c,d){var e=O(c);zd(a.u,b.toString(),e.V(!0),function(c,g){"ok"===c&&Id(a.S,b,e);X(d,c,g)})}
function Le(a,b,c,d,e){var f=O(c,d);zd(a.u,b.toString(),f.V(!0),function(c,d){"ok"===c&&Id(a.S,b,f);X(e,c,d)})}function Me(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(K("onDisconnect().update() called with empty data.  Don't do anything."),X(d,"ok")):Bd(a.u,b.toString(),c,function(e,f){if("ok"===e)for(var l in c){var m=O(c[l]);Id(a.S,b.G(l),m)}X(d,e,f)})}function Ne(a){Bc(a.ea,"deprecated_on_disconnect");a.Bd.Zc.deprecated_on_disconnect=!0}
h.Sb=function(a,b,c,d,e){".info"===C(a.path)?this.Kc.Sb(a,b,c,d,e):this.I.Sb(a,b,c,d,e)};h.oc=function(a,b,c,d){if(".info"===C(a.path))this.Kc.oc(a,b,c,d);else{b=this.I.oc(a,b,c,d);if(c=null!==b){c=this.g;d=a.path;for(var e=[],f=0;f<b.length;++f)e[f]=S(c.ta,b[f]);T(c.ta,d,M);for(f=0;f<b.length;++f)T(c.ta,b[f],e[f]);c=Od(c,d)}c&&(v(this.g.oa.$===this.I.ec,"We should have raised any outstanding events by now.  Else, we'll blow them away."),T(this.g.oa,a.path,S(this.g.L,a.path)),this.I.ec=this.g.oa.$)}};
h.La=function(){this.u.La()};h.jb=function(){this.u.jb()};h.Xc=function(a){if("undefined"!==typeof console){a?(this.tc||(this.tc=new Cc(this.ea)),a=this.tc.get()):a=this.ea.get();var b=Bb(yc(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};h.Yc=function(a){Bc(this.ea,a);this.Bd.Zc[a]=!0};h.e=function(){K("r:"+this.u.id+":",arguments)};
function X(a,b,c){a&&ic(function(){if("ok"==b)a(null,c);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function Oe(a,b,c,d,e){function f(){}a.e("transaction on "+b);var g=new E(a,b);g.fb("value",f);c={path:b,update:c,D:d,status:null,rd:Ob(),yc:e,wd:0,vc:function(){g.zb("value",f)},wc:null};a.Fa.$=Pe(a,a.Fa.$,a.g.L.$,a.Ta);d=c.update(S(a.Fa,b).V());if(n(d)){Ba("transaction failed: Data returned ",d);c.status=1;e=I(a.Ta,b);var k=e.j()||[];k.push(c);J(e,k);k="object"===typeof d&&null!==d&&A(d,".priority")?d[".priority"]:S(a.g.L,b).k();e=Ge(a);d=O(d,k);d=Td(d,e);T(a.Fa,b,d);c.yc&&(T(a.g.oa,b,d),W(a.I,
b,[b]));Qe(a)}else c.vc(),c.D&&(a=Re(a,b),c.D(null,!1,a))}function Qe(a,b){var c=b||a.Ta;b||Se(a,c);if(null!==c.j()){var d=Te(a,c);v(0<d.length);Cb(d,function(a){return 1===a.status})&&Ue(a,c.path(),d)}else c.tb()&&c.A(function(b){Qe(a,b)})}
function Ue(a,b,c){for(var d=0;d<c.length;d++)v(1===c[d].status,"tryToSendTransactionQueue_: items in queue should all be run."),c[d].status=2,c[d].wd++;var e=S(a.g.L,b).hash();T(a.g.L,b,S(a.g.oa,b));for(var f=S(a.Fa,b).V(!0),g=Ob(),k=Ve(c),d=0;d<k.length;d++)J(I(a.g.Gb,k[d]),g);a.u.put(b.toString(),f,function(e){a.e("transaction put response",{path:b.toString(),status:e});for(d=0;d<k.length;d++){var f=I(a.g.Gb,k[d]),p=f.j();v(null!==p,"sendTransactionQueue_: pendingPut should not be null.");p===
g&&(J(f,null),T(a.g.L,k[d],S(a.g.ta,k[d])))}if("ok"===e){e=[];for(d=0;d<c.length;d++)c[d].status=3,c[d].D&&(f=Re(a,c[d].path),e.push(r(c[d].D,null,null,!0,f))),c[d].vc();Se(a,I(a.Ta,b));Qe(a);for(d=0;d<e.length;d++)ic(e[d])}else{if("datastale"===e)for(d=0;d<c.length;d++)c[d].status=4===c[d].status?5:1;else for(L("transaction at "+b+" failed: "+e),d=0;d<c.length;d++)c[d].status=5,c[d].wc=e;e=He(a,b);W(a.I,e,[b])}},e)}
function Ve(a){for(var b={},c=0;c<a.length;c++)a[c].yc&&(b[a[c].path.toString()]=a[c].path);a=[];for(var d in b)a.push(b[d]);return a}
function He(a,b){var c=We(a,b),d=c.path(),c=Te(a,c);T(a.g.oa,d,S(a.g.L,d));T(a.Fa,d,S(a.g.L,d));if(0!==c.length){for(var e=S(a.g.oa,d),f=e,g=[],k=0;k<c.length;k++){var l=Oa(d,c[k].path),m=!1,p;v(null!==l,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===c[k].status)m=!0,p=c[k].wc;else if(1===c[k].status)if(25<=c[k].wd)m=!0,p="maxretry";else{var t=e.K(l),s=c[k].update(t.V());if(n(s)){Ba("transaction failed: Data returned ",s);var w=O(s);"object"===typeof s&&null!=s&&A(s,".priority")||
(w=w.Ga(t.k()));e=e.ya(l,w);c[k].yc&&(f=f.ya(l,w))}else m=!0,p="nodata"}m&&(c[k].status=3,setTimeout(c[k].vc,Math.floor(0)),c[k].D&&(m=new E(a,c[k].path),l=new P(e.K(l),m),"nodata"===p?g.push(r(c[k].D,null,null,!1,l)):g.push(r(c[k].D,null,Error(p),!1,l))))}T(a.Fa,d,e);T(a.g.oa,d,f);Se(a,a.Ta);for(k=0;k<g.length;k++)ic(g[k]);Qe(a)}return d}function We(a,b){for(var c,d=a.Ta;null!==(c=C(b))&&null===d.j();)d=I(d,c),b=Ma(b);return d}
function Te(a,b){var c=[];Xe(a,b,c);c.sort(function(a,b){return a.rd-b.rd});return c}function Xe(a,b,c){var d=b.j();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.A(function(b){Xe(a,b,c)})}function Se(a,b){var c=b.j();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;J(b,0<c.length?c:null)}b.A(function(b){Se(a,b)})}function Je(a,b){var c=We(a,b).path(),d=I(a.Ta,b);Ta(d,function(a){Ye(a)});Ye(d);Sa(d,function(a){Ye(a)});return c}
function Ye(a){var b=a.j();if(null!==b){for(var c=[],d=-1,e=0;e<b.length;e++)4!==b[e].status&&(2===b[e].status?(v(d===e-1,"All SENT items should be at beginning of queue."),d=e,b[e].status=4,b[e].wc="set"):(v(1===b[e].status),b[e].vc(),b[e].D&&c.push(r(b[e].D,null,Error("set"),!1,null))));-1===d?J(a,null):b.length=d+1;for(e=0;e<c.length;e++)ic(c[e])}}function Re(a,b){var c=new E(a,b);return new P(S(a.Fa,b),c)}
function Pe(a,b,c,d){if(d.f())return c;if(null!=d.j())return b;var e=c;d.A(function(d){var g=d.name(),k=new F(g);d=Pe(a,b.K(k),c.K(k),d);e=e.H(g,d)});return e};function Y(){this.ib={}}ca(Y);Y.prototype.La=function(){for(var a in this.ib)this.ib[a].La()};Y.prototype.interrupt=Y.prototype.La;Y.prototype.jb=function(){for(var a in this.ib)this.ib[a].jb()};Y.prototype.resume=Y.prototype.jb;var Z={Qd:function(a){var b=N.prototype.hash;N.prototype.hash=a;var c=jc.prototype.hash;jc.prototype.hash=a;return function(){N.prototype.hash=b;jc.prototype.hash=c}}};Z.hijackHash=Z.Qd;Z.Qa=function(a){return a.Qa()};Z.queryIdentifier=Z.Qa;Z.Td=function(a){return a.m.u.ha};Z.listens=Z.Td;Z.ae=function(a){return a.m.u.ka};Z.refConnection=Z.ae;Z.Ed=pd;Z.DataConnection=Z.Ed;pd.prototype.sendRequest=pd.prototype.Ea;pd.prototype.interrupt=pd.prototype.La;Z.Fd=dd;Z.RealTimeConnection=Z.Fd;
dd.prototype.sendRequest=dd.prototype.yd;dd.prototype.close=dd.prototype.close;Z.Dd=pb;Z.ConnectionTarget=Z.Dd;Z.Nd=function(){Rc=Jc=!0};Z.forceLongPolling=Z.Nd;Z.Od=function(){Sc=!0};Z.forceWebSockets=Z.Od;Z.ge=function(a,b){a.m.u.Vc=b};Z.setSecurityDebugCallback=Z.ge;Z.Xc=function(a,b){a.m.Xc(b)};Z.stats=Z.Xc;Z.Yc=function(a,b){a.m.Yc(b)};Z.statsIncrementCounter=Z.Yc;Z.Vb=function(a){return a.m.Vb};Z.dataUpdateCount=Z.Vb;Z.Rd=function(a,b){a.m.nd=b};Z.interceptServerData=Z.Rd;function $(a,b,c){this.Kb=a;this.X=b;this.Da=c}$.prototype.cancel=function(a){x("Firebase.onDisconnect().cancel",0,1,arguments.length);z("Firebase.onDisconnect().cancel",1,a,!0);this.Kb.Nc(this.X,a)};$.prototype.cancel=$.prototype.cancel;$.prototype.remove=function(a){x("Firebase.onDisconnect().remove",0,1,arguments.length);B("Firebase.onDisconnect().remove",this.X);z("Firebase.onDisconnect().remove",1,a,!0);Ke(this.Kb,this.X,null,a)};$.prototype.remove=$.prototype.remove;
$.prototype.set=function(a,b){x("Firebase.onDisconnect().set",1,2,arguments.length);B("Firebase.onDisconnect().set",this.X);Aa("Firebase.onDisconnect().set",a,!1);z("Firebase.onDisconnect().set",2,b,!0);Ke(this.Kb,this.X,a,b)};$.prototype.set=$.prototype.set;
$.prototype.kb=function(a,b,c){x("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);B("Firebase.onDisconnect().setWithPriority",this.X);Aa("Firebase.onDisconnect().setWithPriority",a,!1);Fa("Firebase.onDisconnect().setWithPriority",2,b,!1);z("Firebase.onDisconnect().setWithPriority",3,c,!0);if(".length"===this.Da||".keys"===this.Da)throw"Firebase.onDisconnect().setWithPriority failed: "+this.Da+" is a read-only object.";Le(this.Kb,this.X,a,b,c)};$.prototype.setWithPriority=$.prototype.kb;
$.prototype.update=function(a,b){x("Firebase.onDisconnect().update",1,2,arguments.length);B("Firebase.onDisconnect().update",this.X);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;L("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Ea("Firebase.onDisconnect().update",a);z("Firebase.onDisconnect().update",2,b,!0);Me(this.Kb,
this.X,a,b)};$.prototype.update=$.prototype.update;var Ze=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);v(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);v(20===c.length,"NextPushId: Length should be 20.");
return c}}();function E(a,b){var c,d;if(a instanceof De)c=a,d=b;else{x("new Firebase",1,2,arguments.length);var e=arguments[0];d=c="";var f=!0,g="";if(q(e)){var k=e.indexOf("//");if(0<=k)var l=e.substring(0,k-1),e=e.substring(k+2);k=e.indexOf("/");-1===k&&(k=e.length);c=e.substring(0,k);var e=e.substring(k+1),m=c.split(".");if(3==m.length){k=m[2].indexOf(":");f=0<=k?"https"===l||"wss"===l:!0;if("firebase"===m[1])Vb(c+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");else for(d=m[0],
g="",e=("/"+e).split("/"),k=0;k<e.length;k++)if(0<e[k].length){m=e[k];try{m=decodeURIComponent(m.replace(/\+/g," "))}catch(p){}g+="/"+m}d=d.toLowerCase()}else Vb("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com")}f||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&L("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");c=new pb(c,f,d,"ws"===l||"wss"===l);d=new F(g);
f=d.toString();!(l=!q(c.host)||0===c.host.length||!za(c.bc))&&(l=0!==f.length)&&(f&&(f=f.replace(/^\/*\.info(\/|$)/,"/")),l=!(q(f)&&0!==f.length&&!ya.test(f)));if(l)throw Error(y("new Firebase",1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');if(b)if(b instanceof Y)f=b;else throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");else f=Y.sb();l=c.toString();e=wa(f.ib,l);e||(e=new De(c),f.ib[l]=e);c=e}D.call(this,c,d)}
ka(E,D);var $e=E,af=["Firebase"],bf=aa;af[0]in bf||!bf.execScript||bf.execScript("var "+af[0]);for(var cf;af.length&&(cf=af.shift());)!af.length&&n($e)?bf[cf]=$e:bf=bf[cf]?bf[cf]:bf[cf]={};E.prototype.name=function(){x("Firebase.name",0,0,arguments.length);return this.path.f()?null:Na(this.path)};E.prototype.name=E.prototype.name;
E.prototype.G=function(a){x("Firebase.child",1,1,arguments.length);if(ga(a))a=String(a);else if(!(a instanceof F))if(null===C(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));Ia("Firebase.child",b)}else Ia("Firebase.child",a);return new E(this.m,this.path.G(a))};E.prototype.child=E.prototype.G;E.prototype.parent=function(){x("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new E(this.m,a)};E.prototype.parent=E.prototype.parent;
E.prototype.root=function(){x("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.parent();)a=a.parent();return a};E.prototype.root=E.prototype.root;E.prototype.toString=function(){x("Firebase.toString",0,0,arguments.length);var a;if(null===this.parent())a=this.m.toString();else{a=this.parent().toString()+"/";var b=this.name();a+=encodeURIComponent(String(b))}return a};E.prototype.toString=E.prototype.toString;
E.prototype.set=function(a,b){x("Firebase.set",1,2,arguments.length);B("Firebase.set",this.path);Aa("Firebase.set",a,!1);z("Firebase.set",2,b,!0);this.m.kb(this.path,a,null,b)};E.prototype.set=E.prototype.set;
E.prototype.update=function(a,b){x("Firebase.update",1,2,arguments.length);B("Firebase.update",this.path);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;L("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Ea("Firebase.update",a);z("Firebase.update",2,b,!0);if(A(a,".priority"))throw Error("update() does not currently support updating .priority.");
this.m.update(this.path,a,b)};E.prototype.update=E.prototype.update;E.prototype.kb=function(a,b,c){x("Firebase.setWithPriority",2,3,arguments.length);B("Firebase.setWithPriority",this.path);Aa("Firebase.setWithPriority",a,!1);Fa("Firebase.setWithPriority",2,b,!1);z("Firebase.setWithPriority",3,c,!0);if(".length"===this.name()||".keys"===this.name())throw"Firebase.setWithPriority failed: "+this.name()+" is a read-only object.";this.m.kb(this.path,a,b,c)};E.prototype.setWithPriority=E.prototype.kb;
E.prototype.remove=function(a){x("Firebase.remove",0,1,arguments.length);B("Firebase.remove",this.path);z("Firebase.remove",1,a,!0);this.set(null,a)};E.prototype.remove=E.prototype.remove;
E.prototype.transaction=function(a,b,c){x("Firebase.transaction",1,3,arguments.length);B("Firebase.transaction",this.path);z("Firebase.transaction",1,a,!1);z("Firebase.transaction",2,b,!0);if(n(c)&&"boolean"!=typeof c)throw Error(y("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.name()||".keys"===this.name())throw"Firebase.transaction failed: "+this.name()+" is a read-only object.";"undefined"===typeof c&&(c=!0);Oe(this.m,this.path,a,b,c)};E.prototype.transaction=E.prototype.transaction;
E.prototype.Wc=function(a,b){x("Firebase.setPriority",1,2,arguments.length);B("Firebase.setPriority",this.path);Fa("Firebase.setPriority",1,a,!1);z("Firebase.setPriority",2,b,!0);this.m.Wc(this.path,a,b)};E.prototype.setPriority=E.prototype.Wc;E.prototype.push=function(a,b){x("Firebase.push",0,2,arguments.length);B("Firebase.push",this.path);Aa("Firebase.push",a,!0);z("Firebase.push",2,b,!0);var c=Fe(this.m),c=Ze(c),c=this.G(c);"undefined"!==typeof a&&null!==a&&c.set(a,b);return c};
E.prototype.push=E.prototype.push;E.prototype.ia=function(){return new $(this.m,this.path,this.name())};E.prototype.onDisconnect=E.prototype.ia;E.prototype.be=function(){L("FirebaseRef.removeOnDisconnect() being deprecated. Please use FirebaseRef.onDisconnect().remove() instead.");this.ia().remove();Ne(this.m)};E.prototype.removeOnDisconnect=E.prototype.be;
E.prototype.fe=function(a){L("FirebaseRef.setOnDisconnect(value) being deprecated. Please use FirebaseRef.onDisconnect().set(value) instead.");this.ia().set(a);Ne(this.m)};E.prototype.setOnDisconnect=E.prototype.fe;E.prototype.mb=function(a,b,c){x("Firebase.auth",1,3,arguments.length);if(!q(a))throw Error(y("Firebase.auth",1,!1)+"must be a valid credential (a string).");z("Firebase.auth",2,b,!0);z("Firebase.auth",3,b,!0);this.m.mb(a,b,c)};E.prototype.auth=E.prototype.mb;
E.prototype.Qb=function(a){x("Firebase.unauth",0,1,arguments.length);z("Firebase.unauth",1,a,!0);this.m.Qb(a)};E.prototype.unauth=E.prototype.Qb;E.goOffline=function(){x("Firebase.goOffline",0,0,arguments.length);Y.sb().La()};E.goOnline=function(){x("Firebase.goOnline",0,0,arguments.length);Y.sb().jb()};
function Sb(a,b){v(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?Qb=r(console.log,console):"object"===typeof console.log&&(Qb=function(a){console.log(a)})),b&&ob.set("logging_enabled",!0)):a?Qb=a:(Qb=null,ob.remove("logging_enabled"))}E.enableLogging=Sb;E.ServerValue={TIMESTAMP:{".sv":"timestamp"}};E.SDK_VERSION="1.0.21";E.INTERNAL=Z;E.Context=Y;})();
module.exports = Firebase;

},{}],9:[function(require,module,exports){
/*!
 *  howler.js v1.1.25
 *  howlerjs.com
 *
 *  (c) 2013-2014, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

(function() {
  // setup
  var cache = {};

  // setup the audio context
  var ctx = null,
    usingWebAudio = true,
    noAudio = false;
  try {
    if (typeof AudioContext !== 'undefined') {
      ctx = new AudioContext();
    } else if (typeof webkitAudioContext !== 'undefined') {
      ctx = new webkitAudioContext();
    } else {
      usingWebAudio = false;
    }
  } catch(e) {
    usingWebAudio = false;
  }

  if (!usingWebAudio) {
    if (typeof Audio !== 'undefined') {
      try {
        new Audio();
      } catch(e) {
        noAudio = true;
      }
    } else {
      noAudio = true;
    }
  }

  // create a master gain node
  if (usingWebAudio) {
    var masterGain = (typeof ctx.createGain === 'undefined') ? ctx.createGainNode() : ctx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(ctx.destination);
  }

  // create global controller
  var HowlerGlobal = function(codecs) {
    this._volume = 1;
    this._muted = false;
    this.usingWebAudio = usingWebAudio;
    this.ctx = ctx;
    this.noAudio = noAudio;
    this._howls = [];
    this._codecs = codecs;
    this.iOSAutoEnable = true;
  };
  HowlerGlobal.prototype = {
    /**
     * Get/set the global volume for all sounds.
     * @param  {Float} vol Volume from 0.0 to 1.0.
     * @return {Howler/Float}     Returns self or current volume.
     */
    volume: function(vol) {
      var self = this;

      // make sure volume is a number
      vol = parseFloat(vol);

      if (vol >= 0 && vol <= 1) {
        self._volume = vol;

        if (usingWebAudio) {
          masterGain.gain.value = vol;
        }

        // loop through cache and change volume of all nodes that are using HTML5 Audio
        for (var key in self._howls) {
          if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
            // loop through the audio nodes
            for (var i=0; i<self._howls[key]._audioNode.length; i++) {
              self._howls[key]._audioNode[i].volume = self._howls[key]._volume * self._volume;
            }
          }
        }

        return self;
      }

      // return the current global volume
      return (usingWebAudio) ? masterGain.gain.value : self._volume;
    },

    /**
     * Mute all sounds.
     * @return {Howler}
     */
    mute: function() {
      this._setMuted(true);

      return this;
    },

    /**
     * Unmute all sounds.
     * @return {Howler}
     */
    unmute: function() {
      this._setMuted(false);

      return this;
    },

    /**
     * Handle muting and unmuting globally.
     * @param  {Boolean} muted Is muted or not.
     */
    _setMuted: function(muted) {
      var self = this;

      self._muted = muted;

      if (usingWebAudio) {
        masterGain.gain.value = muted ? 0 : self._volume;
      }

      for (var key in self._howls) {
        if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
          // loop through the audio nodes
          for (var i=0; i<self._howls[key]._audioNode.length; i++) {
            self._howls[key]._audioNode[i].muted = muted;
          }
        }
      }
    },

    /**
     * Check for codec support.
     * @param  {String} ext Audio file extention.
     * @return {Boolean}
     */
    codecs: function(ext) {
      return this._codecs[ext];
    },

    /**
     * iOS will only allow audio to be played after a user interaction.
     * Attempt to automatically unlock audio on the first user interaction.
     * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
     * @return {Howler}
     */
    _enableiOSAudio: function() {
      var self = this;

      // only run this on iOS if audio isn't already eanbled
      if (ctx && (self._iOSEnabled || !/iPhone|iPad|iPod/i.test(navigator.userAgent))) {
        return;
      }

      self._iOSEnabled = false;

      // call this method on touch start to create and play a buffer,
      // then check if the audio actually played to determine if
      // audio has now been unlocked on iOS
      var unlock = function() {
        // create an empty buffer
        var buffer = ctx.createBuffer(1, 1, 22050);
        var source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);

        // play the empty buffer
        if (typeof source.start === 'undefined') {
          source.noteOn(0);
        } else {
          source.start(0);
        }

        // setup a timeout to check that we are unlocked on the next event loop
        setTimeout(function() {
          if ((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
            // update the unlocked state and prevent this check from happening again
            self._iOSEnabled = true;
            self.iOSAutoEnable = false;

            // remove the touch start listener
            window.removeEventListener('touchstart', unlock, false);
          }
        }, 0);
      };

      // setup a touch start listener to attempt an unlock in
      window.addEventListener('touchstart', unlock, false);

      return self;
    }
  };

  // check for browser codec support
  var audioTest = null;
  var codecs = {};
  if (!noAudio) {
    audioTest = new Audio();
    codecs = {
      mp3: !!audioTest.canPlayType('audio/mpeg;').replace(/^no$/, ''),
      opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
      ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
      wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
      aac: !!audioTest.canPlayType('audio/aac;').replace(/^no$/, ''),
      m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
      mp4: !!(audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
      weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')
    };
  }

  // allow access to the global audio controls
  var Howler = new HowlerGlobal(codecs);

  // setup the audio object
  var Howl = function(o) {
    var self = this;

    // setup the defaults
    self._autoplay = o.autoplay || false;
    self._buffer = o.buffer || false;
    self._duration = o.duration || 0;
    self._format = o.format || null;
    self._loop = o.loop || false;
    self._loaded = false;
    self._sprite = o.sprite || {};
    self._src = o.src || '';
    self._pos3d = o.pos3d || [0, 0, -0.5];
    self._volume = o.volume !== undefined ? o.volume : 1;
    self._urls = o.urls || [];
    self._rate = o.rate || 1;

    // allow forcing of a specific panningModel ('equalpower' or 'HRTF'),
    // if none is specified, defaults to 'equalpower' and switches to 'HRTF'
    // if 3d sound is used
    self._model = o.model || null;

    // setup event functions
    self._onload = [o.onload || function() {}];
    self._onloaderror = [o.onloaderror || function() {}];
    self._onend = [o.onend || function() {}];
    self._onpause = [o.onpause || function() {}];
    self._onplay = [o.onplay || function() {}];

    self._onendTimer = [];

    // Web Audio or HTML5 Audio?
    self._webAudio = usingWebAudio && !self._buffer;

    // check if we need to fall back to HTML5 Audio
    self._audioNode = [];
    if (self._webAudio) {
      self._setupAudioNode();
    }

    // automatically try to enable audio on iOS
    if (typeof ctx !== 'undefined' && ctx && Howler.iOSAutoEnable) {
      Howler._enableiOSAudio();
    }

    // add this to an array of Howl's to allow global control
    Howler._howls.push(self);

    // load the track
    self.load();
  };

  // setup all of the methods
  Howl.prototype = {
    /**
     * Load an audio file.
     * @return {Howl}
     */
    load: function() {
      var self = this,
        url = null;

      // if no audio is available, quit immediately
      if (noAudio) {
        self.on('loaderror');
        return;
      }

      // loop through source URLs and pick the first one that is compatible
      for (var i=0; i<self._urls.length; i++) {
        var ext, urlItem;

        if (self._format) {
          // use specified audio format if available
          ext = self._format;
        } else {
          // figure out the filetype (whether an extension or base64 data)
          urlItem = self._urls[i];
          ext = /^data:audio\/([^;,]+);/i.exec(urlItem);
          if (!ext) {
            ext = /\.([^.]+)$/.exec(urlItem.split('?', 1)[0]);
          }

          if (ext) {
            ext = ext[1].toLowerCase();
          } else {
            self.on('loaderror');
            return;
          }
        }

        if (codecs[ext]) {
          url = self._urls[i];
          break;
        }
      }

      if (!url) {
        self.on('loaderror');
        return;
      }

      self._src = url;

      if (self._webAudio) {
        loadBuffer(self, url);
      } else {
        var newNode = new Audio();

        // listen for errors with HTML5 audio (http://dev.w3.org/html5/spec-author-view/spec.html#mediaerror)
        newNode.addEventListener('error', function () {
          if (newNode.error && newNode.error.code === 4) {
            HowlerGlobal.noAudio = true;
          }

          self.on('loaderror', {type: newNode.error ? newNode.error.code : 0});
        }, false);

        self._audioNode.push(newNode);

        // setup the new audio node
        newNode.src = url;
        newNode._pos = 0;
        newNode.preload = 'auto';
        newNode.volume = (Howler._muted) ? 0 : self._volume * Howler.volume();

        // setup the event listener to start playing the sound
        // as soon as it has buffered enough
        var listener = function() {
          // round up the duration when using HTML5 Audio to account for the lower precision
          self._duration = Math.ceil(newNode.duration * 10) / 10;

          // setup a sprite if none is defined
          if (Object.getOwnPropertyNames(self._sprite).length === 0) {
            self._sprite = {_default: [0, self._duration * 1000]};
          }

          if (!self._loaded) {
            self._loaded = true;
            self.on('load');
          }

          if (self._autoplay) {
            self.play();
          }

          // clear the event listener
          newNode.removeEventListener('canplaythrough', listener, false);
        };
        newNode.addEventListener('canplaythrough', listener, false);
        newNode.load();
      }

      return self;
    },

    /**
     * Get/set the URLs to be pulled from to play in this source.
     * @param  {Array} urls  Arry of URLs to load from
     * @return {Howl}        Returns self or the current URLs
     */
    urls: function(urls) {
      var self = this;

      if (urls) {
        self.stop();
        self._urls = (typeof urls === 'string') ? [urls] : urls;
        self._loaded = false;
        self.load();

        return self;
      } else {
        return self._urls;
      }
    },

    /**
     * Play a sound from the current time (0 by default).
     * @param  {String}   sprite   (optional) Plays from the specified position in the sound sprite definition.
     * @param  {Function} callback (optional) Returns the unique playback id for this sound instance.
     * @return {Howl}
     */
    play: function(sprite, callback) {
      var self = this;

      // if no sprite was passed but a callback was, update the variables
      if (typeof sprite === 'function') {
        callback = sprite;
      }

      // use the default sprite if none is passed
      if (!sprite || typeof sprite === 'function') {
        sprite = '_default';
      }

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('load', function() {
          self.play(sprite, callback);
        });

        return self;
      }

      // if the sprite doesn't exist, play nothing
      if (!self._sprite[sprite]) {
        if (typeof callback === 'function') callback();
        return self;
      }

      // get the node to playback
      self._inactiveNode(function(node) {
        // persist the sprite being played
        node._sprite = sprite;

        // determine where to start playing from
        var pos = (node._pos > 0) ? node._pos : self._sprite[sprite][0] / 1000;

        // determine how long to play for
        var duration = 0;
        if (self._webAudio) {
          duration = self._sprite[sprite][1] / 1000 - node._pos;
          if (node._pos > 0) {
            pos = self._sprite[sprite][0] / 1000 + pos;
          }
        } else {
          duration = self._sprite[sprite][1] / 1000 - (pos - self._sprite[sprite][0] / 1000);
        }

        // determine if this sound should be looped
        var loop = !!(self._loop || self._sprite[sprite][2]);

        // set timer to fire the 'onend' event
        var soundId = (typeof callback === 'string') ? callback : Math.round(Date.now() * Math.random()) + '',
          timerId;
        (function() {
          var data = {
            id: soundId,
            sprite: sprite,
            loop: loop
          };
          timerId = setTimeout(function() {
            // if looping, restart the track
            if (!self._webAudio && loop) {
              self.stop(data.id).play(sprite, data.id);
            }

            // set web audio node to paused at end
            if (self._webAudio && !loop) {
              self._nodeById(data.id).paused = true;
              self._nodeById(data.id)._pos = 0;

              // clear the end timer
              self._clearEndTimer(data.id);
            }

            // end the track if it is HTML audio and a sprite
            if (!self._webAudio && !loop) {
              self.stop(data.id);
            }

            // fire ended event
            self.on('end', soundId);
          }, duration * 1000);

          // store the reference to the timer
          self._onendTimer.push({timer: timerId, id: data.id});
        })();

        if (self._webAudio) {
          var loopStart = self._sprite[sprite][0] / 1000,
            loopEnd = self._sprite[sprite][1] / 1000;

          // set the play id to this node and load into context
          node.id = soundId;
          node.paused = false;
          refreshBuffer(self, [loop, loopStart, loopEnd], soundId);
          self._playStart = ctx.currentTime;
          node.gain.value = self._volume;

          if (typeof node.bufferSource.start === 'undefined') {
            node.bufferSource.noteGrainOn(0, pos, duration);
          } else {
            node.bufferSource.start(0, pos, duration);
          }
        } else {
          if (node.readyState === 4 || !node.readyState && navigator.isCocoonJS) {
            node.readyState = 4;
            node.id = soundId;
            node.currentTime = pos;
            node.muted = Howler._muted || node.muted;
            node.volume = self._volume * Howler.volume();
            setTimeout(function() { node.play(); }, 0);
          } else {
            self._clearEndTimer(soundId);

            (function(){
              var sound = self,
                playSprite = sprite,
                fn = callback,
                newNode = node;
              var listener = function() {
                sound.play(playSprite, fn);

                // clear the event listener
                newNode.removeEventListener('canplaythrough', listener, false);
              };
              newNode.addEventListener('canplaythrough', listener, false);
            })();

            return self;
          }
        }

        // fire the play event and send the soundId back in the callback
        self.on('play');
        if (typeof callback === 'function') callback(soundId);

        return self;
      });

      return self;
    },

    /**
     * Pause playback and save the current position.
     * @param {String} id (optional) The play instance ID.
     * @return {Howl}
     */
    pause: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.pause(id);
        });

        return self;
      }

      // clear 'onend' timer
      self._clearEndTimer(id);

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        activeNode._pos = self.pos(null, id);

        if (self._webAudio) {
          // make sure the sound has been created
          if (!activeNode.bufferSource || activeNode.paused) {
            return self;
          }

          activeNode.paused = true;
          if (typeof activeNode.bufferSource.stop === 'undefined') {
            activeNode.bufferSource.noteOff(0);
          } else {
            activeNode.bufferSource.stop(0);
          }
        } else {
          activeNode.pause();
        }
      }

      self.on('pause');

      return self;
    },

    /**
     * Stop playback and reset to start.
     * @param  {String} id  (optional) The play instance ID.
     * @return {Howl}
     */
    stop: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.stop(id);
        });

        return self;
      }

      // clear 'onend' timer
      self._clearEndTimer(id);

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        activeNode._pos = 0;

        if (self._webAudio) {
          // make sure the sound has been created
          if (!activeNode.bufferSource || activeNode.paused) {
            return self;
          }

          activeNode.paused = true;

          if (typeof activeNode.bufferSource.stop === 'undefined') {
            activeNode.bufferSource.noteOff(0);
          } else {
            activeNode.bufferSource.stop(0);
          }
        } else if (!isNaN(activeNode.duration)) {
          activeNode.pause();
          activeNode.currentTime = 0;
        }
      }

      return self;
    },

    /**
     * Mute this sound.
     * @param  {String} id (optional) The play instance ID.
     * @return {Howl}
     */
    mute: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.mute(id);
        });

        return self;
      }

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (self._webAudio) {
          activeNode.gain.value = 0;
        } else {
          activeNode.muted = true;
        }
      }

      return self;
    },

    /**
     * Unmute this sound.
     * @param  {String} id (optional) The play instance ID.
     * @return {Howl}
     */
    unmute: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.unmute(id);
        });

        return self;
      }

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (self._webAudio) {
          activeNode.gain.value = self._volume;
        } else {
          activeNode.muted = false;
        }
      }

      return self;
    },

    /**
     * Get/set volume of this sound.
     * @param  {Float}  vol Volume from 0.0 to 1.0.
     * @param  {String} id  (optional) The play instance ID.
     * @return {Howl/Float}     Returns self or current volume.
     */
    volume: function(vol, id) {
      var self = this;

      // make sure volume is a number
      vol = parseFloat(vol);

      if (vol >= 0 && vol <= 1) {
        self._volume = vol;

        // if the sound hasn't been loaded, add it to the event queue
        if (!self._loaded) {
          self.on('play', function() {
            self.volume(vol, id);
          });

          return self;
        }

        var activeNode = (id) ? self._nodeById(id) : self._activeNode();
        if (activeNode) {
          if (self._webAudio) {
            activeNode.gain.value = vol;
          } else {
            activeNode.volume = vol * Howler.volume();
          }
        }

        return self;
      } else {
        return self._volume;
      }
    },

    /**
     * Get/set whether to loop the sound.
     * @param  {Boolean} loop To loop or not to loop, that is the question.
     * @return {Howl/Boolean}      Returns self or current looping value.
     */
    loop: function(loop) {
      var self = this;

      if (typeof loop === 'boolean') {
        self._loop = loop;

        return self;
      } else {
        return self._loop;
      }
    },

    /**
     * Get/set sound sprite definition.
     * @param  {Object} sprite Example: {spriteName: [offset, duration, loop]}
     *                @param {Integer} offset   Where to begin playback in milliseconds
     *                @param {Integer} duration How long to play in milliseconds
     *                @param {Boolean} loop     (optional) Set true to loop this sprite
     * @return {Howl}        Returns current sprite sheet or self.
     */
    sprite: function(sprite) {
      var self = this;

      if (typeof sprite === 'object') {
        self._sprite = sprite;

        return self;
      } else {
        return self._sprite;
      }
    },

    /**
     * Get/set the position of playback.
     * @param  {Float}  pos The position to move current playback to.
     * @param  {String} id  (optional) The play instance ID.
     * @return {Howl/Float}      Returns self or current playback position.
     */
    pos: function(pos, id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('load', function() {
          self.pos(pos);
        });

        return typeof pos === 'number' ? self : self._pos || 0;
      }

      // make sure we are dealing with a number for pos
      pos = parseFloat(pos);

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (pos >= 0) {
          self.pause(id);
          activeNode._pos = pos;
          self.play(activeNode._sprite, id);

          return self;
        } else {
          return self._webAudio ? activeNode._pos + (ctx.currentTime - self._playStart) : activeNode.currentTime;
        }
      } else if (pos >= 0) {
        return self;
      } else {
        // find the first inactive node to return the pos for
        for (var i=0; i<self._audioNode.length; i++) {
          if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
            return (self._webAudio) ? self._audioNode[i]._pos : self._audioNode[i].currentTime;
          }
        }
      }
    },

    /**
     * Get/set the 3D position of the audio source.
     * The most common usage is to set the 'x' position
     * to affect the left/right ear panning. Setting any value higher than
     * 1.0 will begin to decrease the volume of the sound as it moves further away.
     * NOTE: This only works with Web Audio API, HTML5 Audio playback
     * will not be affected.
     * @param  {Float}  x  The x-position of the playback from -1000.0 to 1000.0
     * @param  {Float}  y  The y-position of the playback from -1000.0 to 1000.0
     * @param  {Float}  z  The z-position of the playback from -1000.0 to 1000.0
     * @param  {String} id (optional) The play instance ID.
     * @return {Howl/Array}   Returns self or the current 3D position: [x, y, z]
     */
    pos3d: function(x, y, z, id) {
      var self = this;

      // set a default for the optional 'y' & 'z'
      y = (typeof y === 'undefined' || !y) ? 0 : y;
      z = (typeof z === 'undefined' || !z) ? -0.5 : z;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.pos3d(x, y, z, id);
        });

        return self;
      }

      if (x >= 0 || x < 0) {
        if (self._webAudio) {
          var activeNode = (id) ? self._nodeById(id) : self._activeNode();
          if (activeNode) {
            self._pos3d = [x, y, z];
            activeNode.panner.setPosition(x, y, z);
            activeNode.panner.panningModel = self._model || 'HRTF';
          }
        }
      } else {
        return self._pos3d;
      }

      return self;
    },

    /**
     * Fade a currently playing sound between two volumes.
     * @param  {Number}   from     The volume to fade from (0.0 to 1.0).
     * @param  {Number}   to       The volume to fade to (0.0 to 1.0).
     * @param  {Number}   len      Time in milliseconds to fade.
     * @param  {Function} callback (optional) Fired when the fade is complete.
     * @param  {String}   id       (optional) The play instance ID.
     * @return {Howl}
     */
    fade: function(from, to, len, callback, id) {
      var self = this,
        diff = Math.abs(from - to),
        dir = from > to ? 'down' : 'up',
        steps = diff / 0.01,
        stepTime = len / steps;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('load', function() {
          self.fade(from, to, len, callback, id);
        });

        return self;
      }

      // set the volume to the start position
      self.volume(from, id);

      for (var i=1; i<=steps; i++) {
        (function() {
          var change = self._volume + (dir === 'up' ? 0.01 : -0.01) * i,
            vol = Math.round(1000 * change) / 1000,
            toVol = to;

          setTimeout(function() {
            self.volume(vol, id);

            if (vol === toVol) {
              if (callback) callback();
            }
          }, stepTime * i);
        })();
      }
    },

    /**
     * [DEPRECATED] Fade in the current sound.
     * @param  {Float}    to      Volume to fade to (0.0 to 1.0).
     * @param  {Number}   len     Time in milliseconds to fade.
     * @param  {Function} callback
     * @return {Howl}
     */
    fadeIn: function(to, len, callback) {
      return this.volume(0).play().fade(0, to, len, callback);
    },

    /**
     * [DEPRECATED] Fade out the current sound and pause when finished.
     * @param  {Float}    to       Volume to fade to (0.0 to 1.0).
     * @param  {Number}   len      Time in milliseconds to fade.
     * @param  {Function} callback
     * @param  {String}   id       (optional) The play instance ID.
     * @return {Howl}
     */
    fadeOut: function(to, len, callback, id) {
      var self = this;

      return self.fade(self._volume, to, len, function() {
        if (callback) callback();
        self.pause(id);

        // fire ended event
        self.on('end');
      }, id);
    },

    /**
     * Get an audio node by ID.
     * @return {Howl} Audio node.
     */
    _nodeById: function(id) {
      var self = this,
        node = self._audioNode[0];

      // find the node with this ID
      for (var i=0; i<self._audioNode.length; i++) {
        if (self._audioNode[i].id === id) {
          node = self._audioNode[i];
          break;
        }
      }

      return node;
    },

    /**
     * Get the first active audio node.
     * @return {Howl} Audio node.
     */
    _activeNode: function() {
      var self = this,
        node = null;

      // find the first playing node
      for (var i=0; i<self._audioNode.length; i++) {
        if (!self._audioNode[i].paused) {
          node = self._audioNode[i];
          break;
        }
      }

      // remove excess inactive nodes
      self._drainPool();

      return node;
    },

    /**
     * Get the first inactive audio node.
     * If there is none, create a new one and add it to the pool.
     * @param  {Function} callback Function to call when the audio node is ready.
     */
    _inactiveNode: function(callback) {
      var self = this,
        node = null;

      // find first inactive node to recycle
      for (var i=0; i<self._audioNode.length; i++) {
        if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
          // send the node back for use by the new play instance
          callback(self._audioNode[i]);
          node = true;
          break;
        }
      }

      // remove excess inactive nodes
      self._drainPool();

      if (node) {
        return;
      }

      // create new node if there are no inactives
      var newNode;
      if (self._webAudio) {
        newNode = self._setupAudioNode();
        callback(newNode);
      } else {
        self.load();
        newNode = self._audioNode[self._audioNode.length - 1];

        // listen for the correct load event and fire the callback
        var listenerEvent = navigator.isCocoonJS ? 'canplaythrough' : 'loadedmetadata';
        var listener = function() {
          newNode.removeEventListener(listenerEvent, listener, false);
          callback(newNode);
        };
        newNode.addEventListener(listenerEvent, listener, false);
      }
    },

    /**
     * If there are more than 5 inactive audio nodes in the pool, clear out the rest.
     */
    _drainPool: function() {
      var self = this,
        inactive = 0,
        i;

      // count the number of inactive nodes
      for (i=0; i<self._audioNode.length; i++) {
        if (self._audioNode[i].paused) {
          inactive++;
        }
      }

      // remove excess inactive nodes
      for (i=self._audioNode.length-1; i>=0; i--) {
        if (inactive <= 5) {
          break;
        }

        if (self._audioNode[i].paused) {
          // disconnect the audio source if using Web Audio
          if (self._webAudio) {
            self._audioNode[i].disconnect(0);
          }

          inactive--;
          self._audioNode.splice(i, 1);
        }
      }
    },

    /**
     * Clear 'onend' timeout before it ends.
     * @param  {String} soundId  The play instance ID.
     */
    _clearEndTimer: function(soundId) {
      var self = this,
        index = 0;

      // loop through the timers to find the one associated with this sound
      for (var i=0; i<self._onendTimer.length; i++) {
        if (self._onendTimer[i].id === soundId) {
          index = i;
          break;
        }
      }

      var timer = self._onendTimer[index];
      if (timer) {
        clearTimeout(timer.timer);
        self._onendTimer.splice(index, 1);
      }
    },

    /**
     * Setup the gain node and panner for a Web Audio instance.
     * @return {Object} The new audio node.
     */
    _setupAudioNode: function() {
      var self = this,
        node = self._audioNode,
        index = self._audioNode.length;

      // create gain node
      node[index] = (typeof ctx.createGain === 'undefined') ? ctx.createGainNode() : ctx.createGain();
      node[index].gain.value = self._volume;
      node[index].paused = true;
      node[index]._pos = 0;
      node[index].readyState = 4;
      node[index].connect(masterGain);

      // create the panner
      node[index].panner = ctx.createPanner();
      node[index].panner.panningModel = self._model || 'equalpower';
      node[index].panner.setPosition(self._pos3d[0], self._pos3d[1], self._pos3d[2]);
      node[index].panner.connect(node[index]);

      return node[index];
    },

    /**
     * Call/set custom events.
     * @param  {String}   event Event type.
     * @param  {Function} fn    Function to call.
     * @return {Howl}
     */
    on: function(event, fn) {
      var self = this,
        events = self['_on' + event];

      if (typeof fn === 'function') {
        events.push(fn);
      } else {
        for (var i=0; i<events.length; i++) {
          if (fn) {
            events[i].call(self, fn);
          } else {
            events[i].call(self);
          }
        }
      }

      return self;
    },

    /**
     * Remove a custom event.
     * @param  {String}   event Event type.
     * @param  {Function} fn    Listener to remove.
     * @return {Howl}
     */
    off: function(event, fn) {
      var self = this,
        events = self['_on' + event],
        fnString = fn ? fn.toString() : null;

      if (fnString) {
        // loop through functions in the event for comparison
        for (var i=0; i<events.length; i++) {
          if (fnString === events[i].toString()) {
            events.splice(i, 1);
            break;
          }
        }
      } else {
        self['_on' + event] = [];
      }

      return self;
    },

    /**
     * Unload and destroy the current Howl object.
     * This will immediately stop all play instances attached to this sound.
     */
    unload: function() {
      var self = this;

      // stop playing any active nodes
      var nodes = self._audioNode;
      for (var i=0; i<self._audioNode.length; i++) {
        // stop the sound if it is currently playing
        if (!nodes[i].paused) {
          self.stop(nodes[i].id);
          self.on('end', nodes[i].id);
        }

        if (!self._webAudio) {
          // remove the source if using HTML5 Audio
          nodes[i].src = '';
        } else {
          // disconnect the output from the master gain
          nodes[i].disconnect(0);
        }
      }

      // make sure all timeouts are cleared
      for (i=0; i<self._onendTimer.length; i++) {
        clearTimeout(self._onendTimer[i].timer);
      }

      // remove the reference in the global Howler object
      var index = Howler._howls.indexOf(self);
      if (index !== null && index >= 0) {
        Howler._howls.splice(index, 1);
      }

      // delete this sound from the cache
      delete cache[self._src];
      self = null;
    }

  };

  // only define these functions when using WebAudio
  if (usingWebAudio) {

    /**
     * Buffer a sound from URL (or from cache) and decode to audio source (Web Audio API).
     * @param  {Object} obj The Howl object for the sound to load.
     * @param  {String} url The path to the sound file.
     */
    var loadBuffer = function(obj, url) {
      // check if the buffer has already been cached
      if (url in cache) {
        // set the duration from the cache
        obj._duration = cache[url].duration;

        // load the sound into this object
        loadSound(obj);
        return;
      }
      
      if (/^data:[^;]+;base64,/.test(url)) {
        // Decode base64 data-URIs because some browsers cannot load data-URIs with XMLHttpRequest.
        var data = atob(url.split(',')[1]);
        var dataView = new Uint8Array(data.length);
        for (var i=0; i<data.length; ++i) {
          dataView[i] = data.charCodeAt(i);
        }
        
        decodeAudioData(dataView.buffer, obj, url);
      } else {
        // load the buffer from the URL
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
          decodeAudioData(xhr.response, obj, url);
        };
        xhr.onerror = function() {
          // if there is an error, switch the sound to HTML Audio
          if (obj._webAudio) {
            obj._buffer = true;
            obj._webAudio = false;
            obj._audioNode = [];
            delete obj._gainNode;
            delete cache[url];
            obj.load();
          }
        };
        try {
          xhr.send();
        } catch (e) {
          xhr.onerror();
        }
      }
    };

    /**
     * Decode audio data from an array buffer.
     * @param  {ArrayBuffer} arraybuffer The audio data.
     * @param  {Object} obj The Howl object for the sound to load.
     * @param  {String} url The path to the sound file.
     */
    var decodeAudioData = function(arraybuffer, obj, url) {
      // decode the buffer into an audio source
      ctx.decodeAudioData(
        arraybuffer,
        function(buffer) {
          if (buffer) {
            cache[url] = buffer;
            loadSound(obj, buffer);
          }
        },
        function(err) {
          obj.on('loaderror');
        }
      );
    };

    /**
     * Finishes loading the Web Audio API sound and fires the loaded event
     * @param  {Object}  obj    The Howl object for the sound to load.
     * @param  {Objecct} buffer The decoded buffer sound source.
     */
    var loadSound = function(obj, buffer) {
      // set the duration
      obj._duration = (buffer) ? buffer.duration : obj._duration;

      // setup a sprite if none is defined
      if (Object.getOwnPropertyNames(obj._sprite).length === 0) {
        obj._sprite = {_default: [0, obj._duration * 1000]};
      }

      // fire the loaded event
      if (!obj._loaded) {
        obj._loaded = true;
        obj.on('load');
      }

      if (obj._autoplay) {
        obj.play();
      }
    };

    /**
     * Load the sound back into the buffer source.
     * @param  {Object} obj   The sound to load.
     * @param  {Array}  loop  Loop boolean, pos, and duration.
     * @param  {String} id    (optional) The play instance ID.
     */
    var refreshBuffer = function(obj, loop, id) {
      // determine which node to connect to
      var node = obj._nodeById(id);

      // setup the buffer source for playback
      node.bufferSource = ctx.createBufferSource();
      node.bufferSource.buffer = cache[obj._src];
      node.bufferSource.connect(node.panner);
      node.bufferSource.loop = loop[0];
      if (loop[0]) {
        node.bufferSource.loopStart = loop[1];
        node.bufferSource.loopEnd = loop[1] + loop[2];
      }
      node.bufferSource.playbackRate.value = obj._rate;
    };

  }

  /**
   * Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
   */
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return {
        Howler: Howler,
        Howl: Howl
      };
    });
  }

  /**
   * Add support for CommonJS libraries such as browserify.
   */
  if (typeof exports !== 'undefined') {
    exports.Howler = Howler;
    exports.Howl = Howl;
  }

  // define globally in case AMD is not available or available but not used

  if (typeof window !== 'undefined') {
    window.Howler = Howler;
    window.Howl = Howl;
  }

})();

},{}]},{},[4]);