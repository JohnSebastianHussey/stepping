var math = require('../utils/math')
var util = require('util');
var circlestep = require('./circlestep');
var drawing = require('../utils/drawing');

/** 
	@class multicirclestep      
	Two-dimensional circular step sequencer with step magnitudes for each step.
	```html
	<canvas nx="multicirclestep"></canvas>
	```
	<canvas nx="multicirclestep" style="margin-left:25px"></canvas>
*/

var multicirclestep = module.exports = function (target) {

	this.wheelCount = 5;

	circlestep.call(this, target);

	if (this.canvas.getAttribute("wheels")!=null) {
		this.wheelCount = parseFloat(this.canvas.getAttribute("wheelCount"));
	}
	

	/** @property {object}  val   val is an object containing the main interactive / actionable aspects of the widget.
		| &nbsp; | data
		| --- | ---
		| *step* | step poisition in the sequencer
		| *list* | steps with magnitude of step
	*/
	this.val = {
		step: null,
		list: this.list
	}

	this.place = null;


	/** @property {integer}  bpm   Beats per minute (if sequencing)
	```js
		multicirclestep.bpm = 120;
	```
	*/
	this.bpm = 120;
	this.pbpm = this.bpm;
	this.starttime;
	this.lastbeat;
	this.thisframe = 0;
	this.lastframe = 0;
	this.context.lineWidth = 1;

	this.sequencing = false;
	this.starttime = nx.starttime;
	
	this.init();
}

// inherit the widget object template
util.inherits(multicirclestep, circlestep);

// .init() is called automatically when the widget is created on a webpage.
multicirclestep.prototype.init = function() {

	this.defaultSize = { width: this.GUI.w, height: this.GUI.w };

	this.outerRadius = this.defaultSize.width * 0.5;
	this.innerRadius = this.defaultSize.width * 0.16;
	this.list = new Array();

	this.wheels = [];
	for(var i = 0; i<this.wheelCount; i++) {
		
		var wheelSettings = {
			steps: this.steps,
			stepDuration: this.stepDuration,
			midiInstrument: 0,
			list: new Array(),
			thisframe: null,
			lastframe: null,
			place: null,
			note: 0.0
		}

		for(var j = 0; j<this.steps; j++) {
			wheelSettings.list.push(0);
		}	
		this.wheels.push(wheelSettings)
	}
	
	this.activeWheel = 1;
	this.steps = this.wheels[this.activeWheel].steps;
	

	this.actualWid = this.GUI.w;
	this.actualHgt = this.GUI.w;

	this.pallette = [
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

	this.wheelGap = 3;
	this.inactiveWheelWidth = 6;
	this.activeWheelWidth = this.defaultSize.width * 0.25;

	this.sequencerCenterX = this.actualWid/2;
	this.sequencerCenterY = this.actualHgt/2;
	this.draw();
}

multicirclestep.prototype.draw = function() {
	this.erase();
	with (this.context) {

		// use this.colors.fill for the widget background color (default: very light gray)
		// use this.colors.border for any extra structural needs (default: light gray)
		// use this.colors.accent for important or highlighted parts (default: a bright color)


		var drawingX = 0.5 * this.actualWid;
		var drawingY = math.invert(0.5) * this.actualHgt;

		with (this.context) {

			
			var arcStart = -Math.PI/2;

			var outerRadius = this.defaultSize.width * 0.5;
			var wheelGap = this.wheelGap;
			var inactiveWheelWidth = this.inactiveWheelWidth;
			var activeWheelWidth = this.activeWheelWidth;

			for (var i = 0; i<this.wheels.length; i++) {

				var innerRadius = (i==this.activeWheel) ? outerRadius - activeWheelWidth : outerRadius - inactiveWheelWidth;
				var wheel = this.wheels[i];
				var gap = (Math.PI*2/(this.defaultSize.width / 2));
				var arcSize = (Math.PI*2/wheel.steps);
				var colors = this.pallette[i % this.pallette.length];

				for (var j = 0; j<wheel.list.length; j++) {
					// draw step
					beginPath();
					fillStyle = this.colors.border;
					if (this.activeWheel==i && wheel.place==j) {
						fillStyle = this.colors.fill;
					}
					arc(this.sequencerCenterX, this.sequencerCenterY, innerRadius, arcStart, arcStart + arcSize - gap, false);
					arc(this.sequencerCenterX, this.sequencerCenterY, outerRadius, arcStart + arcSize - gap, arcStart, true);	
					closePath();				
					fill();

					// draw impulse for active wheels, fill wheel with color of inactive
					if (wheel.list[j]!=0 || this.activeWheel!=i) {
						var stepMagnitude = wheel.list[j];
						var impulseOuterRadius = (this.activeWheel==i)  ? ((outerRadius - innerRadius) * stepMagnitude) + innerRadius : outerRadius;
						beginPath();
						fillStyle = colors.accent;
						if ((this.activeWheel==i && wheel.place==j) || this.activeWheel!=i) {
							fillStyle = colors.accenthl;
						}
						arc(this.sequencerCenterX, this.sequencerCenterY, innerRadius, arcStart, arcStart + arcSize - gap, false);
						arc(this.sequencerCenterX, this.sequencerCenterY, impulseOuterRadius, arcStart + arcSize - gap, arcStart, true);	
						closePath();				
						fill();
					}
					arcStart = arcStart + arcSize;
				}
				outerRadius = (i==this.activeWheel) ? outerRadius - activeWheelWidth - wheelGap : outerRadius - inactiveWheelWidth - wheelGap;
			}
		}
	}
	
	this.drawLabel();
}

multicirclestep.prototype.handleClick = function(x, y) {
	var isHitSequencer = this.hitSequencer(x, y);
	if (isHitSequencer) {
		var steps = this.wheels[this.activeWheel].steps;
		var index = this.getSegmentIndex(x, y, steps);
		var outerRadius = this.outerRadius - ((this.wheelGap + this.inactiveWheelWidth) * this.activeWheel);
		var innerRadius = outerRadius - this.activeWheelWidth;


		var magnitude = this.hitMagnitude(x, y, outerRadius, innerRadius);
		this.wheels[this.activeWheel].list[index] = magnitude;
	}
}


multicirclestep.prototype.toggleStep = function(x, y) {
	var isHitSequencer = this.hitSequencer(x, y);
	if (isHitSequencer) {
		var steps = this.wheels[this.activeWheel].steps;
		var index = this.getSegmentIndex(x, y, steps);
		var stepMagnitude = this.wheels[this.activeWheel].list[index];
		var centerX = this.sequencerCenterX;
		var centerY = this.sequencerCenterY;

		var outerRadius = this.outerRadius - ((this.wheelGap + this.inactiveWheelWidth) * this.activeWheel);
		var innerRadius = outerRadius - this.activeWheelWidth;
		
		var stepRadius = (outerRadius - innerRadius) * stepMagnitude + innerRadius;
		var withinStepRadius = Math.pow((x - centerX), 2) + Math.pow((y - centerY), 2) < Math.pow(stepRadius,2);
		if (withinStepRadius) {
			this.wheels[this.activeWheel].list[index] = 0;
		}
		else {
			var magnitude = this.hitMagnitude(x, y, outerRadius, innerRadius);
			this.wheels[this.activeWheel].list[index] = magnitude;		
		}		
	}
}

multicirclestep.prototype.hitSequencer = function(x, y) {
	var centerX = this.sequencerCenterX;
	var centerY = this.sequencerCenterY;
	var outerRadius = this.outerRadius - ((this.wheelGap + this.inactiveWheelWidth) * this.activeWheel);
	var innerRadius = outerRadius - this.activeWheelWidth;

	var withinOuterRadius = Math.pow((x - centerX), 2) + Math.pow((y - centerY), 2) < Math.pow(outerRadius,2);
	var withinInnerRadius = Math.pow((x - centerX), 2) + Math.pow((y - centerY), 2) < Math.pow(innerRadius,2);
	return withinOuterRadius && !withinInnerRadius;
}

multicirclestep.prototype.selectWheel = function(wheel) {
	this.activeWheel = wheel;
	this.steps = this.wheels[this.activeWheel].steps;
	this.draw();
}

multicirclestep.prototype.setWheelStepDuration = function(stepDuration) {
	var wheel = this.wheels[this.activeWheel];
	wheel.stepDuration = stepDuration;
	this.wheels[this.activeWheel] = wheel;
	this.draw();
}

multicirclestep.prototype.setWheelStepCount = function(stepCount) {
	var wheel = this.wheels[this.activeWheel];
	wheel.steps = stepCount;
	this.wheels[this.activeWheel] = wheel;
	wheel.list = new Array();
	for(var i = 0; i<wheel.steps; i++) {
		wheel.list.push(0);
	}
	this.wheels[this.activeWheel] = wheel;
	this.draw();
}

multicirclestep.prototype.sequence = function(bpm) {

	if (bpm) {
		this.bpm = bpm;
	}	
	this.sequencing = true;
	requestAnimationFrame(this.seqStep.bind(this));
}

multicirclestep.prototype.seqStep = function() {

	if (this.bpm == 0) { this.bpm = 1 }

	//current time
	var now = new Date().getTime();

	//delta time since start
	var dt = now - this.starttime;

	// TODO need to step through for each wheel - each wheel has its own deltas thisframe, lastframe, stepduration
	for (var i=0; i<this.wheels.length; i++) {
		var wheel = this.wheels[i];
		if (this.bpm != this.pbpm) {

			//frame + decimal since last beat, in old bpm
			var timeP = (dt/(60000/this.pbpm))

			// scale to new bpm
			dt = timeP * (60000/this.bpm)

			//adjust the starttime reference point
			wheel.starttime = now - dt

			//calculate new frame #
			wheel.thisframe = ~~(dt/(60000/(this.bpm/wheel.stepDuration)));

		} else {

		    //this.thisframe is a constantly ascending integer counter
		    //to compare with this.lastframe to determine when to increment this.place
		    //this.thisframe IS NOT the current column.
		    //the current column is this.place, which is set conditionally below.
			wheel.thisframe = ~~(dt/(60000/(this.bpm/wheel.stepDuration)));

		}

		this.pbpm = this.bpm;

	    if (wheel.thisframe != wheel.lastframe) {

			this.lastbeat = now;

			wheel.place++;
			if (wheel.place>=wheel.list.length) {
				wheel.place = 0;
			}

			if (wheel.place==null) {
				wheel.place = 0;
			}

			this.jumpToNextStep(i, wheel.place);

	    }

		wheel.lastframe = wheel.thisframe;

	}

    if (this.sequencing) {
		requestAnimationFrame(this.seqStep.bind(this));
	}  
}


multicirclestep.prototype.jumpToNextStep = function(wheelIndex, place) {
		this.val = {
			step: place,
			wheel: wheelIndex,
			list: this.wheels[wheelIndex]
		}
		this.transmit(this.val);
		this.draw();
}
