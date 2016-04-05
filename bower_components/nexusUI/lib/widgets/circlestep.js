var math = require('../utils/math')
var util = require('util');
var widget = require('../core/widget');
var drawing = require('../utils/drawing');

/** 
	@class circlestep      
	Two-dimensional circular step sequencer with step magnitudes for each step.
	```html
	<canvas nx="circlestep"></canvas>
	```
	<canvas nx="circlestep" style="margin-left:25px"></canvas>
*/

var circlestep = module.exports = function (target) {

	// define a default size
	this.defaultSize = { width: 450, height: 450 };

	widget.call(this, target);
	
	if (this.canvas.getAttribute("steps")!=null) {
		this.steps = parseFloat(this.canvas.getAttribute("steps"));
	}
	else {
		this.steps = 16;
	}

	if (this.canvas.getAttribute("stepDuration")!=null) {
		this.stepDuration = parseFloat(this.canvas.getAttribute("stepDuration"));
	}
	else {
		this.stepDuration = 1/4;
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
		circlestep.bpm = 120;
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
util.inherits(circlestep, widget);

// .init() is called automatically when the widget is created on a webpage.
circlestep.prototype.init = function() {

	this.defaultSize = { width: this.GUI.w, height: this.GUI.w };

	this.outerRadius = this.defaultSize.width * 0.5;
	this.innerRadius = this.defaultSize.width * 0.16;
	this.list = new Array();

	for(var i = 0; i<this.steps; i++) {
		this.list.push(0);
	}

	this.actualWid = this.GUI.w;
	this.actualHgt = this.GUI.w;

	this.sequencerCenterX = this.actualWid/2;
	this.sequencerCenterY = this.actualHgt/2;
	this.draw();
}

// .draw() should be used for any graphics activity
circlestep.prototype.draw = function() {
	this.erase();
	with (this.context) {

		// use this.colors.fill for the widget background color (default: very light gray)
		// use this.colors.border for any extra structural needs (default: light gray)
		// use this.colors.accent for important or highlighted parts (default: a bright color)


		var drawingX = 0.5 * this.actualWid;
		var drawingY = math.invert(0.5) * this.actualHgt;

		with (this.context) {

			var arcSize = (Math.PI*2/this.steps);
			var arcStart = -Math.PI/2;

			var gap = this.defaultSize.width / 2;
			var bottomGap = (Math.PI*2/gap);
			var topGap = (Math.PI*2/( gap * this.outerRadius/this.innerRadius ));

			for (var i = 0; i<this.list.length; i++) {
				// draw step
				beginPath();
				fillStyle = this.colors.border;
				if (this.place==i) {
					fillStyle = this.colors.fill;
				}
				arc(this.sequencerCenterX, this.sequencerCenterY, this.innerRadius, arcStart, arcStart + arcSize - bottomGap, false);
				arc(this.sequencerCenterX, this.sequencerCenterY, this.outerRadius, arcStart + arcSize - topGap, arcStart, true);	
				closePath();				
				fill();

				// draw impulse
				if (this.list[i]!=0) {
					var stepMagnitude = this.list[i];
					var outerRadius = ((this.outerRadius - this.innerRadius) * stepMagnitude) + this.innerRadius;
					var impulseGap = (Math.PI*2/( gap * outerRadius/this.innerRadius ));
					beginPath();
					fillStyle = this.colors.accent;
					if (this.place==i) {
						fillStyle = this.colors.accenthl;
					}
					arc(this.sequencerCenterX, this.sequencerCenterY, this.innerRadius, arcStart, arcStart + arcSize - bottomGap, false);
					arc(this.sequencerCenterX, this.sequencerCenterY, outerRadius, arcStart + arcSize - impulseGap, arcStart, true);	
					closePath();				
					fill();
				}

				arcStart = arcStart + arcSize;
			}
		}
	}
	
	this.drawLabel();
}

circlestep.prototype.setSteps = function(stepCount) {
	this.steps = stepCount;
	this.list = new Array();
	for(var i = 0; i<this.steps; i++) {
		this.list.push(0);
	}
	this.val.list = this.list;
	this.draw();
}

// .click() will be fired when the interface is interacted with
// this.clicked is automatically set to true
// this.clickPos is already and object with x and y properties detailing click point.
circlestep.prototype.click = function(e) {

	var x = this.clickPos.x,
		y = this.clickPos.y;
	
	this.toggleStep(x, y);
	this.val.list = this.list;
	this.draw();
}

// .move() will be fired when the interface is moved over after being clicked
// this.clickPos is already and object with x and y properties detailing click point.
circlestep.prototype.move = function() {

	var x = this.clickPos.x,
		y = this.clickPos.y;

	this.handleClick(x, y);
	this.val.list = this.list;
	this.draw();
}

// .release() will be fired on mouse up (unclick)
circlestep.prototype.release = function() {
	this.val.list = this.list;
	this.draw();
}

/* 
 extra functions pertaining only to this widget 
*/

circlestep.prototype.toggleStep = function(x, y) {
	var isHitSequencer = this.hitSequencer(x, y);
	if (isHitSequencer) {
		var index = this.getSegmentIndex(x, y, this.steps);
		var stepMagnitude = this.list[index];
		var centerX = this.sequencerCenterX;
		var centerY = this.sequencerCenterY;
		var stepRadius = (this.outerRadius - this.innerRadius) * stepMagnitude + this.innerRadius;
		var withinStepRadius = Math.pow((x - centerX), 2) + Math.pow((y - centerY), 2) < Math.pow(stepRadius,2);
		if (withinStepRadius) {
			this.list[index] = 0;
		}
		else {
			var magnitude = this.hitMagnitude(x, y, this.outerRadius, this.innerRadius);
			this.list[index] = magnitude;		
		}
	}
}

circlestep.prototype.handleClick = function(x, y) {
	var isHitSequencer = this.hitSequencer(x, y);
	if (isHitSequencer) {
		var index = this.getSegmentIndex(x, y, this.steps);
		var magnitude = this.hitMagnitude(x, y, this.outerRadius, this.innerRadius);
		this.list[index] = magnitude;
	}
}

circlestep.prototype.hitSequencer = function(x, y) {
	var centerX = this.sequencerCenterX;
	var centerY = this.sequencerCenterY;
	var withinOuterRadius = Math.pow((x - centerX), 2) + Math.pow((y - centerY), 2) < Math.pow(this.outerRadius,2);
	var withinInnerRadius = Math.pow((x - centerX), 2) + Math.pow((y - centerY), 2) < Math.pow(this.innerRadius,2);
	return withinOuterRadius && !withinInnerRadius;
}

circlestep.prototype.getSegmentIndex = function(x, y, steps) {
	var centerX = this.sequencerCenterX;
	var centerY = this.sequencerCenterY;
	var opposite = x - centerX;
	var adjacent = centerY - y;
	var angle = Math.atan(opposite/adjacent);
	
	if ((x > centerX && y > centerY) || (x < centerX && y > centerY)){
		angle = angle + Math.PI
	}
	else if (x < centerX && y < centerY){
		angle = angle + 2*Math.PI
	}
	
	var index = Math.floor(angle/(Math.PI*2/steps));
	return index;
}

circlestep.prototype.hitMagnitude = function(x, y, outerRadius, innerRadius) {
	var centerX = this.sequencerCenterX
	var centerY = this.sequencerCenterY;
	var distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
	var magnitude = (distanceFromCenter - innerRadius) / (outerRadius - innerRadius);
	if (magnitude<0.01) {
		magnitude = 0;
	}
	return magnitude;
}

/** @method sequence
@param {float} [bpm] Beats per minute of the pulse
Turns the circlestep into a sequencer.

```js
	circlestep.sequence(240);
```
*/
circlestep.prototype.sequence = function(bpm) {

	if (bpm) {
		this.bpm = bpm;
	}	
	this.sequencing = true;
	requestAnimationFrame(this.seqStep.bind(this));

}

circlestep.prototype.setBPM = function(bpm) {
	this.bpm = bpm
}

/** @method stop
Stops the circlestep sequencer.

```js
	circlestep.stop();
```
*/
circlestep.prototype.stop = function() {
	this.sequencing = false;
}

circlestep.prototype.seqStep = function() {

	if (this.bpm == 0) { this.bpm = 1 }

	//current time
	var now = new Date().getTime();

	//delta time since start
	var dt = now - this.starttime;

	if (this.bpm != this.pbpm) {

		//frame + decimal since last beat, in old bpm
		var timeP = (dt/(60000/this.pbpm))

		// scale to new bpm
		dt = timeP * (60000/this.bpm)

		//adjust the starttime reference point
		this.starttime = now - dt

		//calculate new frame #
		this.thisframe = ~~(dt/(60000/(this.bpm/this.stepDuration)));

	} else {

	    //this.thisframe is a constantly ascending integer counter
	    //to compare with this.lastframe to determine when to increment this.place
	    //this.thisframe IS NOT the current column.
	    //the current column is this.place, which is set conditionally below.
		this.thisframe = ~~(dt/(60000/(this.bpm/this.stepDuration)));

	}

	this.pbpm = this.bpm;

    if (this.thisframe != this.lastframe) {

		this.lastbeat = now;

		this.place++;
		if (this.place>=this.list.length) {
			this.place = 0;
		}

		if (this.place==null) {
			this.place = 0;
		}

		this.jumpToNextStep(this.place);

    }

	this.lastframe = this.thisframe;
    if (this.sequencing) {
		requestAnimationFrame(this.seqStep.bind(this));
	}  
}

/** @method jumpToNextStep
Jump to a certain segment of the sequencer, highlight it, and output its values as an array. Column numbers start at 0.

```js
	circlestep.jumpToNextStep(1);
```
*/

circlestep.prototype.jumpToNextStep = function(place) {
		this.place = place
		this.val = {
			step: this.place,
			list: this.steps
		}
		this.transmit(this.val);
		this.draw();
}
