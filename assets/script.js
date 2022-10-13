var palavra;

let start_date = new Date('09/20/2022');
let date_now = new Date();
let diff = date_now.getTime() - start_date.getTime();
let index = Math.ceil(diff/(1000.0 * 3600.0 * 24.0));

var win = false;

var already_played = false;

async function fetchWords() {
    const response = await fetch(database);
    const json = await response.json();
    return json;
}

$(document).ready(function(){

    if(api.get('share_link')) {
        //SETANDO SAHRE_LINK COMO O ÚLTIMO SHARE LINK
        console.log(api.get('share_link'))
        $('.twitter-share-link').attr("href", api.get('share_link'))
    } else {
        //console.log('Share link cookie not set')
    }

    if (api.get('finished')) {
        last_played = new Date(api.get('last-played'))
        //console.log(last_played)
        now = new Date()

        last_played.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);

        if (last_played.getTime() === now.getTime()) {
            // USUÁRIO JÁ JOGOU HOJE
            showStats();
            const finishedModal = new bootstrap.Modal(document.getElementById('finish'))
            finishedModal.show()

            $('.board .current').removeClass('current')
            $('.selected').removeClass('selected')
            $('.ep_banner_div').removeClass('hide')

            already_played = true;
        }
    }

    fetchWords().then(palavras => {
        palavra = palavras[index].word;
        $('#resposta .accordion-body strong').html(palavra);
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
                    if (!already_played) lines[i].append('<div class="tile selected" id="tile1"></div>')
                    else lines[i].append('<div class="tile" id="tile1"></div>')
                } else {
                    lines[i].append('<div class="tile" id="tile1"></div>')
                }
            }
        }
    })
})

