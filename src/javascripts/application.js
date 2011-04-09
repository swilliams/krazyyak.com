$(function() {

    $('#nav li a').click(function() {
        $('#nav li a').removeClass('selected');
        $(this).addClass('selected');
    });

});
