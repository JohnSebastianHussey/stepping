<titleText>
	<div class='{ opts.styles.container }'>
		<h1><span class='colorA js-character'>S</span>
			<span class='colorB js-character'>t</span>
			<span class='colorC js-character'>e</span>
			<span class='colorD js-character'>p</span>
			<span class='colorE js-character'>p</span>
			<span class='colorA js-character'>i</span>
			<span class='colorB js-character'>n</span>
			<span class='colorC js-character'>g</span>
		</h1>
	</div>

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
</titleText>