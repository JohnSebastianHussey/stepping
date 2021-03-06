(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _global = __webpack_require__(1);

	var _global2 = _interopRequireDefault(_global);

	var _multistepper = __webpack_require__(2);

	var _multistepper2 = _interopRequireDefault(_multistepper);

	var _wheeltoggle = __webpack_require__(3);

	var _wheeltoggle2 = _interopRequireDefault(_wheeltoggle);

	var _wheelsettings = __webpack_require__(4);

	var _wheelsettings2 = _interopRequireDefault(_wheelsettings);

	var _titletext = __webpack_require__(5);

	var _titletext2 = _interopRequireDefault(_titletext);

	var _about = __webpack_require__(6);

	var _about2 = _interopRequireDefault(_about);

	var _play = __webpack_require__(7);

	var _play2 = _interopRequireDefault(_play);

	var _footer = __webpack_require__(8);

	var _footer2 = _interopRequireDefault(_footer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BPM = 132;

	var selectOptionsLoaded = function selectOptionsLoaded(tag) {
		tag.trigger('data_loaded', data);
	};

	function onMIDIInit(midi, cb) {

		midi.inputsArray = [];
		window.midi = midi;

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = midi.outputs.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var output = _step.value;

				window.midi.inputsArray.push(output);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		midi.noteOn = function (source, channel, note, velocity) {
			source.send([0x90 + channel, note, velocity]);
		};

		midi.noteOff = function (source, channel, note, velocity, delay) {
			source.send([0x80 + channel, note, velocity], delay);
		};

		cb();
	}

	window.samples = [new Tone.Player("./samples/senA.mp3").toMaster(), new Tone.Player("./samples/senB.mp3").toMaster(), new Tone.Player("./samples/senC.mp3").toMaster(), new Tone.Player("./samples/senD.mp3").toMaster(), new Tone.Player("./samples/senE.mp3").toMaster()];

	$(window).load(function () {

		// problem - always merging dictionaries of styles

		var mountComponents = function mountComponents() {

			riot.mount('raw');

			$.extend(_titletext2.default, _global2.default);
			riot.mount('titletext', {
				styles: _titletext2.default
			});

			$.extend(_about2.default, _global2.default);
			riot.mount('about', {
				styles: _about2.default
			});

			$.extend(_play2.default, _global2.default);
			riot.mount('play', {
				styles: _play2.default
			});

			$.extend(_footer2.default, _global2.default);
			riot.mount('footer', {
				styles: _footer2.default
			});

			var colors = [{
				accent: "#00AAFF",
				accenthl: "#4DC4FF"
			}, {
				accent: "#FF9600",
				accenthl: "#FAC271"
			}, {
				accent: "#FF00BF",
				accenthl: "#FF73DC"
			}, {
				accent: "#00FF63",
				accenthl: "#79FFAD"
			}, {
				accent: "#8200FF",
				accenthl: "#C180FF"
			}];

			var notes = ["C", "C#", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
			var stepDurations = [{
				name: "Whole",
				value: 1
			}, {
				name: "Half",
				value: 0.5
			}, {
				name: "Quater",
				value: 0.25
			}, {
				name: "Eighth",
				value: 0.125
			}];

			var fullNotes = [];
			for (var i = 0; i < 7; i++) {
				for (var j = 0; j < notes.length; j++) {
					var note = notes[j] + i;
					fullNotes.push(note);
				}
			}

			$.extend(_wheeltoggle2.default, _global2.default);
			riot.mount('wheeltoggle', {
				styles: _wheeltoggle2.default,
				colors: colors
			});

			riot.mount('multistepper', {
				styles: _multistepper2.default
			});

			$.extend(_wheelsettings2.default, _global2.default);
			riot.mount('wheelsettings', {
				styles: _wheelsettings2.default,
				colors: colors,
				notes: fullNotes,
				stepDurations: stepDurations,
				midi: window.midi ? window.midi.inputsArray.reverse() : []
			});

			multicirclestep1.on('*', function (val) {
				var instrumentIndex = val.list.midiInstrument;
				var note = val.list.note;
				var step = val.list.place;
				var velocity = Math.floor(val.list.list[step] * 127);
				if (velocity > 0) {
					//var instrument = window.midi.inputsArray[instrumentIndex];
					var duration = 60000 / (BPM / val.list.stepDuration);
					var sample = window.samples[val.wheel];
					sample.volume.value = -30 + 30 * (velocity * (1 / 127));
					sample.stop();
					sample.start();
					//window.midi.noteOn(instrument, 0, note, velocity);
					//window.midi.noteOff(instrument, 0, note, velocity, window.performance.now() + duration);
				}
			});
		};

		if (navigator.requestMIDIAccess) {
			navigator.requestMIDIAccess().then(function (access) {
				onMIDIInit(access, mountComponents);
			}, function (err) {
				// well at least we tried!
				if (window.AudioContext) {
					// Chrome
					opts.api = 'webaudio';
				} else if (window.Audio) {
					// Firefox
					opts.api = 'audiotag';
				} else {
					// no support
					return;
				}
			});
		} else {
			mountComponents();
		}
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"container":"global__container___1y-QC","blurContainer":"global__blurContainer___Dsm81","active":"global__active___2THSs"};

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"multistepper":"multistepper__multistepper___3nfpe"};

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"toggleContainer":"wheeltoggle__toggleContainer___1Zfoc","toggle":"wheeltoggle__toggle___i9xpJ"};

/***/ },
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"wheelsettingsContainer":"wheelsettings__wheelsettingsContainer___2l8aO","selectContainer":"wheelsettings__selectContainer___16f1j"};

/***/ },
/* 5 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 6 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"textContainer":"about__textContainer___3tDdM"};

/***/ },
/* 7 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"playButton":"play__playButton___1TnUq"};

/***/ },
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"footer":"footer__footer___2pTS5"};

/***/ }
/******/ ])
});
;