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