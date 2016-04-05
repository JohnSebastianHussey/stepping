<about>
	<div class='{ opts.styles.about }'>
		<div class='{ opts.styles.title }'>
			<h2>{ opts.title }</h2>
			<div class='{ opts.styles.titleBorder }'></div>
		</div>
		<div class='{ opts.styles.imageContainer }'>
			<div class='{ opts.styles.imageBorder }'>
				<img src='{opts.img}' class='{ opts.styles.image }'/>
			</div>
		</div>
		<div class='{ opts.styles.textContainer }'>
			<p class='{ opts.styles.text }'></p>
		</div>
	</div>

	this.on('mount', function() {
		
		$(this.root).find('.' + this.opts.styles.textContainer).html(this.opts.text)

		var self = this;
		setTimeout(function() {
			self.opts.renderLetterBlur([$('.js-email')], opts, $('.js-email'));
		}, 100)
	});

	this.mixin('renderLetterBlur')
</about>