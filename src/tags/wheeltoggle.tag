<wheeltoggle>
	<div class='js-toggle-container {opts.styles.toggleContainer}'>
		<div each={ color, i in opts.colors } toggleIndex='{ i }' class='js-toggle {parent.opts.styles.toggle} { "toggle" + i } { i==1 ? "active" : ""}'></div>
	</div>

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
</wheeltoggle>