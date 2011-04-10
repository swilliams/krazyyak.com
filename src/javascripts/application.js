$(function() {

    $('#nav li a').click(function() {
        $('#nav li a').removeClass('selected');
        $(this).addClass('selected');
        var $target = $(this.hash),
            offset = $target.offset().top;
        $('html,body').animate({scrollTop: offset}, 500);
        return false;
    });

});
