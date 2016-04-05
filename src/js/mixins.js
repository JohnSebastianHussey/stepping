var OnFocus = {
  init: function() {
    this.opts.onFocus = function () {
    	console.log("FOCUS");
    }
  }
}

var FoucusOut = {
  init: function() {
    this.opts.focusOut = function () {
    	console.log("FOCUS OUT");
    }
  }
}

var addCharacterSpans = function ($p) {
  var text = $p.text()//.trim();

  var newText = '';

  for (var i = 0; i < text.length; i++) {
    var char = text[i];
    newText += '<span>' + char + '</span>';
  }

  $p.html(newText);
}

var addExtraCharacters = function ($p, opts, $hoverItem) {
  var spans = $p.children()

  var newText = '';

  for (var i = 0; i < spans.length; i++) {
    
    var span = spans[i];
    var redclone = $(span).clone()
    var cyanclone = $(span).clone()
    var blackclone = $(span).clone()

    offset = $(span).position();
    redclone.css({
      color: 'red',
      'position': 'absolute',
      'font-size': $(span).css('font-size'),
      top: offset.top + 'px',
      left: offset.left + 'px',
      opacity: 0.99
    })
    redclone.addClass( opts.styles.redclone );

    cyanclone.css({
      color: 'cyan',
      'position': 'absolute',
      'font-size': $(span).css('font-size'),
      top: offset.top + 'px',
      left: offset.left + 'px',
      opacity: 0.99
    })
    cyanclone.addClass(  opts.styles.cyanclone  );

    blackclone.css({
      color: 'black',
      'position': 'absolute',
      'font-size': $(span).css('font-size'),
      top: offset.top + 'px',
      left: offset.left + 'px',
      'z-index': 3
    });

    $($(span).parent()).append(redclone)
    $($(span).parent()).append(cyanclone)
    $($(span).parent()).append(blackclone)
  }


  $hoverItem.hover(function() {
    $hoverItem.find('.' + opts.styles.cyanclone).addClass(opts.styles.hover );
    $hoverItem.find('.' + opts.styles.redclone).addClass( opts.styles.hover );
    setTimeout(function() {
        $hoverItem.find('.' + opts.styles.cyanclone).removeClass(opts.styles.hover );
        $hoverItem.find('.' + opts.styles.redclone).removeClass( opts.styles.hover );
    }, 400)
  }, function() {
        $hoverItem.find('.' + opts.styles.cyanclone).removeClass(opts.styles.hover );
        $hoverItem.find('.' + opts.styles.redclone).removeClass( opts.styles.hover );
  });
}

var RenderLetterBlur = {
  init: function() {
    this.opts.renderLetterBlur = function(children, opts, $hoverItem) {
      $.each(children, function(i, child) {
        addCharacterSpans($(child));
        addExtraCharacters($(child), opts, $hoverItem);
      })
    }
  }
}

riot.mixin('renderLetterBlur', RenderLetterBlur)
riot.mixin('onFocus', OnFocus);
riot.mixin('focusOut', FoucusOut);