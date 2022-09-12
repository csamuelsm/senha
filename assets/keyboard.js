let keyboard = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']]

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
                        "<div><button class='keyboard-button special-button' value='"+keyboard[i][j]+"' id='"+keyboard[i][j]+"'><p>"+keyboard[i][j]+"</p></button></div>"
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
        if (this.value == 'BACKSPACE') {
            if ($('.board .selected').html() == "") {
                previous_tile()
            } else {
                $('.board .selected').html("")
            }
        } else if (this.value == 'ENTER') {
            // TODO: ANTES DE IR PARA O VERIFY LINE, VERIFICAR SE TODOS OS TILES ESTÃO PREENCHIDOS
            if ($(".board .current .tile").toArray().some((el) => $(el).html() == "")) {
                $('.board .current').effect("shake")
            } else {
                verify_line()
                next_line()
            }
        } else {
            $('.board .selected').html("<p>"+this.value+"</p>")
            next_tile()
        }
    })

})