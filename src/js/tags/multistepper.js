riot.tag2('multistepper', '<div class="js-multistepper-container {opts.styles.multistepper}"> </div>', '', '', function(opts) {

	this.on('mount', function() {
		nx.add('multicirclestep', {
			h: 550,
			w: 550,
			parent: $('.js-multistepper-container')
		})
	});

}, '{ }');