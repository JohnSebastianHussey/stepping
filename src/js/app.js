import globalStyles from '../css/global.css';
import multistepperStyles from '../css/multistepper.css';
import wheeltoggleStyles from '../css/wheeltoggle.css';
import wheelsettingsStyles from '../css/wheelsettings.css';
import titleStyles from '../css/titletext.css';
import aboutStyles from '../css/about.css';
import playStyles from '../css/play.css';
import footerStyles from '../css/footer.css';



var BPM = 132;

var selectOptionsLoaded = function (tag) {
	tag.trigger('data_loaded', data);
}

function onMIDIInit( midi, cb ) {

	midi.inputsArray = [];
	window.midi = midi;
	
	for (var output of midi.outputs.values())
		window.midi.inputsArray.push(output);

	midi.noteOn = function(source, channel, note, velocity) {
    	source.send([0x90 + channel, note, velocity]);
  	};

  	midi.noteOff = function(source, channel, note, velocity, delay) {
    	source.send([0x80 + channel, note, velocity], delay);
  	};

  	cb();
}

window.samples = [
	new Tone.Player("./samples/senA.mp3").toMaster(),
	new Tone.Player("./samples/senB.mp3").toMaster(),
	new Tone.Player("./samples/senC.mp3").toMaster(),
	new Tone.Player("./samples/senD.mp3").toMaster(),
	new Tone.Player("./samples/senE.mp3").toMaster()];


$(window).load(function() {


	// problem - always merging dictionaries of styles

	var mountComponents = function() {

		riot.mount('raw');

		$.extend(titleStyles, globalStyles)
		riot.mount('titletext', {
			styles: titleStyles
		});

		$.extend(aboutStyles, globalStyles)
		riot.mount('about', {
			styles: aboutStyles
		});

		$.extend(playStyles, globalStyles)
		riot.mount('play', {
			styles: playStyles
		});

		$.extend(footerStyles, globalStyles)
		riot.mount('footer', {
			styles: footerStyles
		});


		var colors = [
			{
				accent: "#00AAFF",
				accenthl: "#4DC4FF" 
			},
			{
				accent: "#FF9600",
				accenthl: "#FAC271"
			},
			{
				accent: "#FF00BF",
				accenthl: "#FF73DC"
			},
			{
				accent: "#00FF63",
				accenthl: "#79FFAD"
			},
			{
				accent: "#8200FF",
				accenthl: "#C180FF"
			}
		]

		var notes = ["C", "C#", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
		var stepDurations = [
			{
				name: "Whole",
				value: 1
			},
			{
				name: "Half",
				value: 0.5
			},
			{
				name: "Quater",
				value: 0.25
			},
			{
				name: "Eighth",
				value: 0.125
			}
		]

		var fullNotes = [];
		for (var i = 0; i<7; i++) {
			for (var j = 0; j<notes.length; j++) {
				var note = notes[j] + i;
				fullNotes.push(note);
			}
		}

		$.extend(wheeltoggleStyles, globalStyles)
		riot.mount('wheeltoggle', {
			styles: wheeltoggleStyles,
			colors: colors
		})

		riot.mount('multistepper', {
			styles: multistepperStyles
		})

		$.extend(wheelsettingsStyles, globalStyles)
		riot.mount('wheelsettings', {
			styles: wheelsettingsStyles,
			colors: colors,
			notes: fullNotes,
			stepDurations: stepDurations,
			midi: (window.midi) ? window.midi.inputsArray.reverse() : []
		});

		multicirclestep1.on('*', function(val) {
			var instrumentIndex = val.list.midiInstrument;
			var note = val.list.note;
			var step = val.list.place;
			var velocity = Math.floor(val.list.list[step]*127);
			if (velocity>0) {
				//var instrument = window.midi.inputsArray[instrumentIndex];
				var duration  = 60000/(BPM/val.list.stepDuration);
				var sample = window.samples[val.wheel];
				sample.volume.value = -30 + 30 * (velocity*(1/127));
				sample.stop();
				sample.start();
				//window.midi.noteOn(instrument, 0, note, velocity);
				//window.midi.noteOff(instrument, 0, note, velocity, window.performance.now() + duration);
			}
		});
	};

	if (navigator.requestMIDIAccess) {
		navigator.requestMIDIAccess().then(function(access) {
		    onMIDIInit(access, mountComponents);
		}, function(err) { // well at least we tried!
		    if (window.AudioContext) { // Chrome
		        opts.api = 'webaudio';
		    } else if (window.Audio) { // Firefox
		        opts.api = 'audiotag';
		    } else { // no support
		        return;
		    }
		});
	}
	else {
		mountComponents();
	}

})