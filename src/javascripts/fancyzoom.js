(function($){
$.fn.fancyZoom = function(options){

    var options   = options || {},
        zooming   = false,
        link = $(this);

    // preload image
    var img = new Image();
    img.src = link.attr('href');

    if ($('#zoom').length == 0) {
        var ext = $.browser.msie ? 'gif' : 'png';
        var html = '<div id="zoom" style="display:none;"></div>';

        $('body').append(html);

        $('html').click(function(e){if($(e.target).parents('#zoom:visible').length == 0) hide();});
        $(document).keyup(function(event){
            if (event.keyCode == 27 && $('#zoom:visible').length > 0) hide();
        });

    }

    var zoom = $('#zoom');
    zoom.live('click', hide);

    this.each(function(i) {
        $(this).click(show);
    });

    return this;

    function show(e) {
        if (zooming) { 
            return false; 
        }
        var link = $(this);

        zoom.html('<img src="' + link.attr('href') + '" alt="" />');
        if (link.data('width') === null || link.data('width') === undefined) {
            link.data('width', zoom.width());
            link.data('height', zoom.height());
        }

        zooming         = true;

        var width       = window.innerWidth || (window.document.documentElement.clientWidth || window.document.body.clientWidth);
        var height      = window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight);
        var x           = window.pageXOffset || (window.document.documentElement.scrollLeft || window.document.body.scrollLeft);
        var y           = window.pageYOffset || (window.document.documentElement.scrollTop || window.document.body.scrollTop);
        var window_size = {'width':width, 'height':height, 'x':x, 'y':y}

        var width              = 860;
        var height             = 560;
        var d                  = window_size;

        // ensure that newTop is at least 0 so it doesn't hide close button
        var newTop             = Math.max((d.height/2) - (height/2) + y, 0);
        var newLeft            = (d.width/2) - (width/2);
        var curTop             = e.pageY;
        var curLeft            = e.pageX;

        zoom.data('curTop', curTop);
		zoom.data('curLeft', curLeft);
        


        $('#zoom').hide().css({
            position	: 'absolute',
            top				: curTop + 'px',
            left			: curLeft + 'px',
            width     : '1px',
            height    : '1px',
        });


        $('#zoom').animate({
          top     : newTop + 'px',
          left    : newLeft + 'px',
          opacity : "show",
          width   : width,
          height  : height
        }, 500, null, function() {
            zooming = false;
        });
        return false;
    }

  function hide() {
    if (zooming) { 
        return false; 
    }
    zooming = true;

	$('#zoom').unbind('click');
	$('#zoom').animate({
      top     : zoom.data('curTop') + 'px',
      left    : zoom.data('curLeft') + 'px',
      opacity : "hide",
      width   : '1px',
      height  : '1px'
    }, 500, null, function() {
			zooming = false;
            zoom.html('');
    });
    return false;
  }

}
})(jQuery);
