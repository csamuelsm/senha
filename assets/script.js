var palavra;
var database = './assets/words/pt_5.json'

let start_date = new Date('09/20/2022');
let date_now = new Date();
let diff = date_now.getTime() - start_date.getTime();
let index = Math.ceil(diff/(1000.0 * 3600.0 * 24.0));

async function fetchWords() {
    const response = await fetch(database);
    const json = await response.json();
    return json;
}

$(document).ready(function(){

    if (Cookies.get('finished')) {
        last_played = new Date(Cookies.get('last-played'))
        //console.log(last_played)
        now = new Date()

        last_played.setUTCHours(0, 0, 0, 0);
        now.setUTCHours(0, 0, 0, 0);

        if (last_played.getTime() === now.getTime()) {
            // USUÁRIO JÁ JOGOU HOJE
            const finishedModal = new bootstrap.Modal(document.getElementById('finish'))
            finishedModal.show()
        }
    }

    fetchWords().then(palavras => {
        palavra = palavras[index].word;
        //console.log(palavra);

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

