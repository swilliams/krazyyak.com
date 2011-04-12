$(function() {
    // adjust the nav 'selected' element on scroll.
    var navElements = $('nav#nav li > a').map(function(i, n) {
        var x = {
            offset: $($(n).attr('href')).offset().top,
            link: $(n)
        };
        return x;
    });
    var doScrollEvent = true,
        currentNav = navElements[0].link;

    function changeNav(selected) {
        $('#nav li a').removeClass('selected');
        selected.addClass('selected');
        currentNav = selected;
    }

    $('#nav li a').click(function() {
        changeNav($(this));
        var $target = $(this.hash),
            offset = $target.offset().top;
        doScrollEvent = false;
        $('html,body').animate({scrollTop: (offset + 3)}, 500, 'swing', function() {
            doScrollEvent = true;
        });
        return false;
    });

    $(window).scroll(function(data) {
        var pos = $(window).scrollTop();
        if (pos === 0 || !doScrollEvent) {
            return;
        }
        var results = $.grep(navElements, function(n, i) {
            return pos > n.offset + 0;
        });
        var selected = results[results.length-1].link;
        if (selected != currentNav) {
            changeNav(selected);
        }
    });

    $('#photo_samples > a').fancyZoom();

    $('#networks').masonry({ columnWidth: 200 });

    $('#shootsy .controls > a').click(function() {
        var offset = 330,
            link = $(this),
            mult = link.index() * offset;
        link.siblings('a').removeClass('selected');
        link.addClass('selected');
        $('#slideshow_images').animate({scrollLeft: mult}, 330);
        return false;
    });
});
