<wheelsettings>
	<div class='js-wheelsettings-container {opts.styles.wheelsettingsContainer}'>
		<div class='js-dial-container'>

		</div>
		<div class='{ opts.styles.selectContainer }'>
			<label>Note</label>
			<select id='js-noteSelection'>
				<option each={ note, i in opts.notes } value='{ i }'>{ note } </option>
			</select>
		</div>
		
		<div class='{ opts.styles.selectContainer }'>
			<label>Step Duration</label>
			<select id='js-stepDuration'>
				<option each={ stepDuration, i in opts.stepDurations } value='{ stepDuration.value }'>{ stepDuration.name } </option>
			</select>
		</div>

		<div class='{ opts.styles.selectContainer }'>
			<label>Midi Instrument</label>
			<select id='js-midi'>
				<option each={ instrument, i in opts.midi } value='{ i }'>{ instrument.name } </option>
			</select>
		</div>
	</div>

	this.on('mount', function() {

		// set number of steps
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

		// set number of onsets
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
			// update the onsets according to algorithm
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
</wheelsettings>