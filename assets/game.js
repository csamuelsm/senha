var delay = 100

var complete_game = []

function verify_line() {
    var tentativa = []
    $('.board .current .tile').each(function() {
        if ($(this).children('p').eq(0).html() == "") {
            // TODO: ANIMAÇÃO PARA QUANDO O USUÁRIO NÃO ESTÁ
            // AUTORIZADO A IR PARA A PRÓXIMA LINHA
            return 0;
        } else {
            //console.log($(this).children('p').eq(0).html())
            tentativa.push($(this).children('p').eq(0).html())
        }
    })
    let estados = []
    for (var i = 0; i < tentativa.length; i++) {

        /*(function(i, tentativa) {
            setTimeout(function(){

            }, 500)
        })(i, tentativa);*/
        if (tentativa[i].toLowerCase() == palavra.toLowerCase()[i]) {
            $('.board .current .tile').eq(i).addClass('correto')
            $('.board .current .tile').eq(i).delay(i*delay).effect("bounce", {times:1}, 300)
            $('.keyboard-button[value='+tentativa[i]+']').addClass('correto')
            estados.push('correto')
        } else {
            let existe = false;
            for (var j = 0; j < palavra.length; j++) {
                if (tentativa[i].toLowerCase() == palavra.toLowerCase()[j]
                    && tentativa[j].toLowerCase() != palavra.toLowerCase()[j]) {
                        existe = true
                    }
            }
            if (existe) {
                $('.board .current .tile').eq(i).addClass('existente')
                $('.board .current .tile').eq(i).delay(i*delay).effect("bounce", {times:1}, 300)
                $('.keyboard-button[value='+tentativa[i]+']').addClass('existente')
                estados.push('existente')
            } else {
                $('.board .current .tile').eq(i).addClass('errado')
                $('.board .current .tile').eq(i).delay(i*delay).effect("bounce", {times:1}, 300)
                $('.keyboard-button[value='+tentativa[i]+']').addClass('errado')
                estados.push('errado')
            }
        }

    }

    complete_game.push(estados)
    console.log(complete_game)

    if (estados.every((e) => e == 'correto')) {
        // USUÁRIO ACERTOU
        // JOGO FINALIZA
        Cookies.set('finished', true)
        Cookies.set('last-played', new Date())
        $('.board .current .selected').removeClass('selected')
        $('.board .current').removeClass('current')

        const finishedModal = new bootstrap.Modal(document.getElementById('finish'))

        setTimeout(function(){finishedModal.show()}, 1500)

        console.log(getTextForTwitter(complete_game))
        $('.twitter-share-link').attr("href", getTextForTwitter(complete_game))
    }
}