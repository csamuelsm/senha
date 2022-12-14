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

function backspace() {
    current = $('.board .current .selected')
    if (current.prev().length != 0) {
        current.removeClass('selected')
        current.prev().addClass('selected')
        current.prev().html("")
    }
}

function next_line() {
    current = $('.board .current')
    if (current.next().length != 0) {
        $('.board .current .selected').removeClass('selected')
        current.removeClass('current')
        current.next().addClass('current')
        $('.board .current .tile').first().addClass('selected')
    } else {
        // ACABARAM AS CHANCE
        // USUÁRIO PERDEU
        if(!win) {
            updateStats(complete_game)
            api.set(`${getGameLang()}_finished`, true)
            api.set(`${getGameLang()}_last-played`, new Date())
            $('.board .current .selected').removeClass('selected')
            $('.board .current').removeClass('current')
            $('#quit_button').addClass("hide");
            //api.set(`${getGameLang()}_words`, get_words());
            api.set(`${getGameLang()}_words`, get_words());
            api.set(`${getGameLang()}_estados`, complete_game_string());


            const finishedModal = new bootstrap.Modal(document.getElementById('finish'))

            setTimeout(function(){
                finishedModal.show()
                $('.ep_banner_div').removeClass('hide')
            }, 1000)

            //console.log(getTextForTwitter(complete_game))
            const btn = document.querySelector('.stats_share')
            btn.addEventListener('click', async () => {
                await share(createShareString(complete_game))
            });
        }

    }
}

$(document).ready(function(){
    $(document).on("click", ".tile", function() {
        console.log('click')
        if ($(this).parent().hasClass('current')) {
            console.log('current')
            $('.board .selected').removeClass('selected')
            $(this).addClass('selected')
        } else {
            console.log('not current')
        }
    })
})