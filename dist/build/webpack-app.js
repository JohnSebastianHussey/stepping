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
			for (var _iterator = midi.inputs.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var input = _step.value;

				console.log(input.name);
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

		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = midi.outputs.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var output = _step2.value;

				window.midi.inputsArray.push(output);
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		console.log(input.name);

		midi.noteOn = function (source, channel, note, velocity) {
			source.send([0x90 + channel, note, velocity]);
		};

		midi.noteOff = function (source, channel, note, velocity, delay) {
			source.send([0x80 + channel, note, velocity], delay);
		};

		cb();
	}

	$(window).load(function () {

		// problem - always merging dictionaries of styles

		var mountComponents = function mountComponents() {

			riot.mount('raw');

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
				midi: window.midi.inputsArray.reverse()
			});

			multicirclestep1.on('*', function (val) {
				var instrumentIndex = val.list.midiInstrument;
				var note = val.list.note;
				var step = val.list.place;
				var velocity = Math.floor(val.list.list[step] * 127);
				if (velocity > 0) {
					var instrument = window.midi.inputsArray[instrumentIndex];
					var duration = 60000 / (BPM / val.list.stepDuration);
					window.midi.noteOn(instrument, 0, note, velocity);
					window.midi.noteOff(instrument, 0, note, velocity, window.performance.now() + duration);
				}
			});
		};

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
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"redclone":"global__redclone___34Kz7","cyanclone":"global__cyanclone___VYgC5","hover":"global__hover___3eVS9","blurContainer":"global__blurContainer___Dsm81","active":"global__active___2THSs"};

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

/***/ }
/******/ ])
});
;