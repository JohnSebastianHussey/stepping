riot.tag2('about', '<div class="{opts.styles.textContainer}"> <p> <span class="colorA">S</span><span class="colorB">t</span><span class="colorC">e</span><span class="colorD">p</span><span class="colorE">p</span><span class="colorA">i</span><span class="colorB">n</span><span class="colorC">g</span> is a 5 track circular step sequencer inspired by <a href="http://www.olympianoiseco.com/apps/patterning/" class="linkColorA">patterning</a>. The number of steps for each track can be set with the top dial and the placement of beats can be automated with the second dial, which uses the <a href="http://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf" class="linkColorB">euclidean beats</a> algorithm. Beats can also be placed manually with variable velocity by clicking on the steps of the sequencer. The sequencer plays samples from <a href="https://vimeo.com/110633932" class="linkColorC">Görkem Şen\'s</a> Yaybahar. </p> </div>', '', '', function(opts) {

	this.on('mount', function() {

	});
}, '{ }');

riot.tag2('footer', '<div class="{opts.styles.footer}"> <p>Stepping was made by <a class="linkColorA" href="https://twitter.com/js_hussey">John Hussey</a> with <a class="linkColorB" href="http://nexusosc.com/">nexusOSC</a>, <a class="linkColorC" href="http://tonejs.org/">Tone.js</a>, <a class="linkColorD" href="http://riotjs.com/">Riot.js</a> and <a class="linkColorE" href="https://github.com/JohnSebastianHussey/midilearn/">midilearn</a></p> </div>', '', '', function(opts) {

 	this.on('mount', function() {

	});
}, '{ }');



riot.tag2('multistepper', '<div class="js-multistepper-container {opts.styles.multistepper}"> </div>', '', '', function(opts) {

	this.on('mount', function() {
		nx.add('multicirclestep', {
			h: 550,
			w: 550,
			parent: $('.js-multistepper-container')
		});

		var demoLoop = [[0.8645906647592759, 0, 0, 0, 0.9981323924733413, 0, 0, 0, 0.905420931348198, 0, 0, 0, 0.9471031672208983, 0, 0, 0],
			[0.1246250457803101, 0.24832121322357517, 0.366807941407015, 0.5701820818137647, 0, 0, 0, 0, 0.2743379863013952, 0.279860157980911, 0, 0.4754565969154526, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.7685664078112888],
			[0, 0, 0, 0, 0.9376970762195217, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0.4615664336479542, 0, 0, 0, 0.5856159367142114, 0, 0, 0, 0.43524468231410784, 0, 0, 0, 0.3571203213484141, 0]];

		$.each(multicirclestep1.wheels, function(index, wheel) {
			wheel.list = demoLoop[index];
		});

		multicirclestep1.draw();

	});

}, '{ }');
riot.tag2('play', '<div class="{opts.styles.playButton} js-play-button"> <div><span class="colorA">P</span><span class="colorB">l</span><span class="colorC">a</span><span class="colorD">y</span></div> <div class="hidden"><span class="colorA">S</span><span class="colorB">t</span><span class="colorC">o</span><span class="colorD">p</span></div> </div>', '', '', function(opts) {

 	this.on('mount', function() {
		$('.js-play-button').click(function(e) {
			$(e.currentTarget).children().toggleClass('hidden');
			if (multicirclestep1.sequencing) {
				multicirclestep1.stop()
			}
			else {
				multicirclestep1.sequence(132);
			}
		});
	});
}, '{ }');

riot.tag2('raw', '<span></span>', '', '', function(opts) {

  this.root.innerHTML = opts.content
});

riot.tag2('title', '<div class="{opts.styles.container}"> <h1><span class="{opts.styles.colorA}">S</span> <span class="{opts.styles.colorB}">t</span> <span class="{opts.styles.colorC}">e</span> <span class="{opts.styles.colorD}">p</span> <span class="{opts.styles.colorE}">p</span> <span class="{opts.styles.colorA}">i</span> <span class="{opts.styles.colorB}">n</span> <span class="{opts.styles.colorC}">g</span> </h1> </div>', '', '', function(opts) {

	this.on('mount', function() {

	});
}, '{ }');
riot.tag2('titletext', '<div class="{opts.styles.container}"> <h1><span class="colorA js-character">S</span> <span class="colorB js-character">t</span> <span class="colorC js-character">e</span> <span class="colorD js-character">p</span> <span class="colorE js-character">p</span> <span class="colorA js-character">i</span> <span class="colorB js-character">n</span> <span class="colorC js-character">g</span> </h1> </div>', '', '', function(opts) {

	this.on('mount', function() {
		var characters = $('.js-character')
		var charactersLength = characters.length;
		var count = 0;

		var interval = setInterval(function(){
			$('.js-character').removeClass('accent');
			$(characters[count]).addClass('accent');
			count++;
		}, 200);

		setTimeout(function() {
			clearInterval(interval);
		}, 200*(charactersLength+1))

	});
}, '{ }');
riot.tag2('wheelsettings', '<div class="js-wheelsettings-container {opts.styles.wheelsettingsContainer}"> <div class="js-dial-container"> </div> </div>', '', '', function(opts) {

	this.on('mount', function() {

		stepCountDial = nx.add('dial', {
			h: 56,
			w: 56,
			parent: $('.js-dial-container')
		})

		stepCountDial.max = 16;
		stepCountDial.min = 2;
		stepCountDial.responsivity = 1/(stepCountDial.max - stepCountDial.min);
		stepCountDial.step = 1/(stepCountDial.max - stepCountDial.min);
		stepCountDial.colors.accent = opts.colors[1].accent;
		stepCountDial.val.value = 16;
		stepCountDial.init();

		midiLearn($("#dial1")[0], function(val) {
			var scaledVal = Math.floor(val * (stepCountDial.max/127));
			if (scaledVal < stepCountDial.min) {
				scaledVal = stepCountDial.min;
			}
			multicirclestep1.setWheelStepCount(scaledVal);
			stepCountDial.set({value: scaledVal});
			onsetCountDial.set({value: 0})
		});

		stepCountDial.on('value', function(stepCountDial) {
			multicirclestep1.setWheelStepCount(stepCountDial);
			onsetCountDial.set({value: 0})
		})

		onsetCountDial = nx.add('dial', {
			h: 56,
			w: 56,
			parent: $('.js-dial-container')
		})

		onsetCountDial.max = stepCountDial.max;
		onsetCountDial.min = 0;
		onsetCountDial.responsivity = 1/(stepCountDial.max - onsetCountDial.min);
		onsetCountDial.step = 1/(stepCountDial.max - onsetCountDial.min);
		onsetCountDial.colors.accent = opts.colors[1].accent;
		onsetCountDial.val.value = 0;
		onsetCountDial.init();

		var onsetCountHanlder = function(val) {

			onsetCountDial.set({value: val})
			var activeWheel = multicirclestep1.activeWheel;
			var steps = multicirclestep1.wheels[activeWheel].list.length;
			var beats = euclideanBeat(steps, val);
			multicirclestep1.wheels[activeWheel].list = beats;
			multicirclestep1.draw();
		}

		midiLearn($("#dial2")[0], function(val) {
			var scaledVal = Math.floor(val * (onsetCountDial.max/127));
			if (scaledVal < onsetCountDial.min) {
				scaledVal = onsetCountDial.min;
			}
			onsetCountHanlder(scaledVal);
		});

		onsetCountDial.on('value', onsetCountHanlder);

		$('#js-stepDuration').val(multicirclestep1.stepDuration);
		$('#js-stepDuration').on('change', function(e) {
			var activeWheel = multicirclestep1.activeWheel;
			multicirclestep1.wheels[activeWheel].stepDuration = Number(e.currentTarget.value);
		});

		$('#js-noteSelection').on('change', function(e) {
			var activeWheel = multicirclestep1.activeWheel;
			multicirclestep1.wheels[activeWheel]['note'] = Number(e.currentTarget.value);
		});

		$('#js-midi').on('change', function(e) {
			var activeWheel = multicirclestep1.activeWheel;
			multicirclestep1.wheels[activeWheel]['midiInstrument'] = e.currentTarget.value;
		});
	});
}, '{ }');
riot.tag2('wheeltoggle', '<div class="js-toggle-container {opts.styles.toggleContainer}"> <div each="{color, i in opts.colors}" toggleindex="{i}" class="js-toggle {parent.opts.styles.toggle} {⁗toggle⁗ + i} {i==1 ? ⁗active⁗ : ⁗⁗}"></div> </div>', '', '', function(opts) {

	this.on('mount', function() {
		var self = this;
		$('.js-toggle').click(function(e) {
			$('.js-toggle.active').removeClass('active');
			var toggle = $(e.currentTarget);
			toggle.addClass('active');
			var index = Number(toggle.attr('toggleIndex'));
			multicirclestep1.selectWheel(index);

			var wheel = multicirclestep1.wheels[index];

			stepCountDial.colors.accent = opts.colors[index].accent;
			stepCountDial.set({value: wheel.list.length})
			onsetCountDial.colors.accent = opts.colors[index].accent;

			var onsetCount = 0;
			for(var i = 0; i < wheel.list.length; i++) {
				if (wheel.list[i]>0) {
					onsetCount++;
				}
			}
			onsetCountDial.set({value: onsetCount})

			onsetCountDial.draw();
			stepCountDial.draw();

			$('#js-stepDuration').val(wheel.stepDuration)
			$('#js-noteSelection').val(wheel.note)
		})
	});
}, '{ }');
function euclideanBeat(sequenceLength, onsets) {
    var r = new Array();
    if (onsets >= sequenceLength || sequenceLength == 1 || onsets == 0) { //test for input for sanity
        if (onsets >= sequenceLength) {
            for (i = 0; i < sequenceLength; i++) { //give trivial rhythm of a pulse on every step
                r.push(1);
            }
        } else if (sequenceLength == 1) {
            if (onsets == 1) {
                r.push(1);
            } else {
                r.push(0);
            }
        } else {
            for (i = 0; i < sequenceLength; i++) {
                r.push(0);
            }
        }
    } else { //sane input
        pauses = sequenceLength - onsets;
        if (pauses >= onsets) { //first case more pauses than onsets
            per_pulse = Math.floor(pauses / onsets);
            remainder = pauses % onsets;
            for (i = 0; i < onsets; i++) {
                r.push(1);
                for (j = 0; j < per_pulse; j++) {
                    r.push(0);
                }
                if (i < remainder) {
                    r.push(0);
                }
            }
        } else { //second case more onsets than pauses
            per_pause = Math.floor( (onsets - pauses) / pauses);
            remainder = (onsets - pauses) % pauses;
            for (i = 0; i < pauses; i++) {
                r.push(1);
                r.push(0);
                for (j = 0; j < per_pause; j++) {
                    r.push(1);
                }
                if (i < remainder) {
                    r.push(1);
                }
            }
        }
    }
    return r;
}
var OnFocus = {
  init: function() {
    this.opts.onFocus = function () {
    	console.log("FOCUS");
    }
  }
}

var FoucusOut = {
  init: function() {
    this.opts.focusOut = function () {
    	console.log("FOCUS OUT");
    }
  }
}

var addCharacterSpans = function ($p) {
  var text = $p.text()//.trim();

  var newText = '';

  for (var i = 0; i < text.length; i++) {
    var char = text[i];
    newText += '<span>' + char + '</span>';
  }

  $p.html(newText);
}

var addExtraCharacters = function ($p, opts, $hoverItem) {
  var spans = $p.children()

  var newText = '';

  for (var i = 0; i < spans.length; i++) {
    
    var span = spans[i];
    var redclone = $(span).clone()
    var cyanclone = $(span).clone()
    var blackclone = $(span).clone()

    offset = $(span).position();
    redclone.css({
      color: 'red',
      'position': 'absolute',
      'font-size': $(span).css('font-size'),
      top: offset.top + 'px',
      left: offset.left + 'px',
      opacity: 0.99
    })
    redclone.addClass( opts.styles.redclone );

    cyanclone.css({
      color: 'cyan',
      'position': 'absolute',
      'font-size': $(span).css('font-size'),
      top: offset.top + 'px',
      left: offset.left + 'px',
      opacity: 0.99
    })
    cyanclone.addClass(  opts.styles.cyanclone  );

    blackclone.css({
      color: 'black',
      'position': 'absolute',
      'font-size': $(span).css('font-size'),
      top: offset.top + 'px',
      left: offset.left + 'px',
      'z-index': 3
    });

    $($(span).parent()).append(redclone)
    $($(span).parent()).append(cyanclone)
    $($(span).parent()).append(blackclone)
  }


  $hoverItem.hover(function() {
    $hoverItem.find('.' + opts.styles.cyanclone).addClass(opts.styles.hover );
    $hoverItem.find('.' + opts.styles.redclone).addClass( opts.styles.hover );
    setTimeout(function() {
        $hoverItem.find('.' + opts.styles.cyanclone).removeClass(opts.styles.hover );
        $hoverItem.find('.' + opts.styles.redclone).removeClass( opts.styles.hover );
    }, 400)
  }, function() {
        $hoverItem.find('.' + opts.styles.cyanclone).removeClass(opts.styles.hover );
        $hoverItem.find('.' + opts.styles.redclone).removeClass( opts.styles.hover );
  });
}

var RenderLetterBlur = {
  init: function() {
    this.opts.renderLetterBlur = function(children, opts, $hoverItem) {
      $.each(children, function(i, child) {
        addCharacterSpans($(child));
        addExtraCharacters($(child), opts, $hoverItem);
      })
    }
  }
}

riot.mixin('renderLetterBlur', RenderLetterBlur)
riot.mixin('onFocus', OnFocus);
riot.mixin('focusOut', FoucusOut);
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