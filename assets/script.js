var palavra;

async function fetchWords() {
    const response = await fetch('./assets/words/pt_5.json');
    const json = await response.json();
    return json;
}

$(document).ready(function(){

    fetchWords().then(palavras => {
        palavra = palavras[1].word;
        console.log(palavra);

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
})

