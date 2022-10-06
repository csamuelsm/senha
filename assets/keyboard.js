let keyboard = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']]

function keyboard_entry(value) {
    //checking if modals are open
    var modal_open = false;
    if ( $('#quit').hasClass('show')
        || $('#onboarding-1').hasClass('show')
        || $('#onboarding-2').hasClass('show')
        || $('#onboarding-3').hasClass('show')
        || $('#onboarding-4').hasClass('show')
        || $('#onboarding-5').hasClass('show')
        || $('#onboarding-6').hasClass('show')
        || $('#configuracoes').hasClass('show')
        || $('#finish').hasClass('show') )
        {
            // MODAL ESTÁ ABERTO
            // USUÁRIO NÃO PODE DIGITAR NADA
            modal_open = true;
        }

    if (value == 'BACKSPACE') {
        if ($('.board .selected').html() == "") {
            backspace()
        } else {
            $('.board .selected').html("")
        }
    } else if (value == 'ENTER') {
        // TODO: ANTES DE IR PARA O VERIFY LINE, VERIFICAR SE TODOS OS TILES ESTÃO PREENCHIDOS
        if ($(".board .current .tile").toArray().some((el) => $(el).html() == "")) {
            // PALAVRA NÃO PREENCHIDA
            console.log('unfilled');
            const t = $('#unfilled');
            const toast = new bootstrap.Toast(t);
            toast.show();
            $('.board .current .tile').addClass("shake-effect")
            $('.board .current').effect("shake")
            $('.board .current').promise().done(function(){
                $('.board .current .tile').removeClass("shake-effect")
            })
        } else {
            fetchWords().then(palavras => {
                var tentativa = [];
                $('.board .current .tile').each(function() {
                    tentativa.push($(this).children('p').eq(0).html())
                })
                tentativa = tentativa.join('');
                var existe = false;
                for (var i = 0; i < palavras.length; i++) {
                    if (tentativa.toLowerCase() == palavras[i].word.toLowerCase()) existe = true;
                }
                if (existe) {
                    verify_line()
                    next_line()
                } else {
                    //PALAVRA NÃO EXISTE
                    const t = $('#invalida');
                    const toast = new bootstrap.Toast(t);
                    toast.show();
                    //$('#invalida').toast('show');
                    $('.board .current .tile').addClass("shake-effect")
                    $('.board .current').effect("shake")
                    $('.board .current').promise().done(function(){
                        $('.board .current .tile').removeClass("shake-effect")
                    })
                }
            })

        }
    } else {
        if (!modal_open) $('.board .selected').html("<p>"+value+"</p>")
        next_tile()
    }


}

$(document).ready(function(){

    // Keyboard Creation

    for (let i = 0; i < keyboard.length; i++) {
        for (let j = 0; j < keyboard[i].length; j++){
            if (keyboard[i][j] == 'ENTER' || keyboard[i][j] == 'BACKSPACE') {
                if (keyboard[i][j] == 'BACKSPACE') {
                    $("#keyboard_line"+(i+1)).append(
                        "<div><button class='keyboard-button special-button' value='"+keyboard[i][j]+"' id='"+keyboard[i][j]+"'><i class='fa-sharp fa-solid fa-delete-left'></i></button></div>"
                    )
                } else {
                    $("#keyboard_line"+(i+1)).append(
                        "<div><button class='keyboard-button special-button' value='"+keyboard[i][j]+"' id='"+keyboard[i][j]+"'><p>SEND</p></button></div>"
                    )
                }
            } else {
                $("#keyboard_line"+(i+1)).append(
                    "<div><button class='keyboard-button' value='"+keyboard[i][j]+"' id='"+keyboard[i][j]+"'><p>"+keyboard[i][j]+"</p></button></div>"
                )
            }
        }
    }

    // Keyboard click

    $('.keyboard-button').click(function() {
        keyboard_entry(this.value);
    })

})