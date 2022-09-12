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
    for (var i = 0; i < tentativa.length; i++) {
        //let estados = []
        if (tentativa[i].toLowerCase() == palavra.toLowerCase()[i]) {
            $('.board .current .tile').eq(i).addClass('correto')
            $('.keyboard-button[value='+tentativa[i]+']').addClass('correto')
            //estados.push('correto')
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
                $('.keyboard-button[value='+tentativa[i]+']').addClass('existente')
                //estados.push('existente')
            } else {
                $('.board .current .tile').eq(i).addClass('errado')
                $('.keyboard-button[value='+tentativa[i]+']').addClass('errado')
                //estados.push('errado')
            }
        }
    }
}