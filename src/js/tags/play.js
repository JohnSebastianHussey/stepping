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
