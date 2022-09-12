function next_tile() {
    current = $('.board .current .selected')
    if (current.next().length != 0) {
        current.removeClass('selected')
        current.next().addClass('selected')
    }
}

function previous_tile() {
    current = $('.board .current .selected')
    if (current.prev().length != 0) {
        current.removeClass('selected')
        current.prev().addClass('selected')
    }
}

function next_line() {
    current = $('.board .current')
    if (current.next().length != 0) {
        $('.board .current .selected').removeClass('selected')
        current.removeClass('current')
        current.next().addClass('current')
        $('.board .current .tile').first().addClass('selected')
    }
}

$(document).ready(function(){
    $('.tile').click(function() {
        if ($(this).parent().hasClass('current')) {
            $('.board .selected').removeClass('selected');
            $(this).addClass('selected')
        }
    })
})