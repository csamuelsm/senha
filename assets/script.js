let palavra = "filha"

$(document).ready(function(){
    let lines = [
        $('#line1'),
        $('#line2'),
        $('#line3'),
        $('#line4'),
        $('#line5'),
        $('#line6')
    ]

    for (var i = 0; i < lines.length; i++) {
        for (var j = 0; j < palavra.length; j++) {
            if (i == 0 && j == 0) {
                lines[i].append('<div class="tile selected" id="tile1"></div>')
            } else {
                lines[i].append('<div class="tile" id="tile1"></div>')
            }
        }
    }
})