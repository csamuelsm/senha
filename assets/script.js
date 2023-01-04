var palavra;

let start_date = new Date('09/20/2022');
let date_now = new Date();
let diff = date_now.getTime() - start_date.getTime();
let index = Math.ceil(diff/(1000.0 * 3600.0 * 24.0));

var win = false;

var already_played = false;

async function fetchWords() {
    database = `./assets/words/${getGameLang()}_${palavra.length}.json`;
    const response = await fetch(database);
    const json = await response.json();
    return json;
}

/*async function fetchWords() {
    database = `./assets/words/${getGameLang()}.json`;
    console.log(database);
    const response = await fetch(database);
    const json = await response.json();
    return json;
}*/

async function read_game(lang) {
    /*
        Recebe linguagem do jogo e game mode e retorna os dados do JSON
    */
    const today = new Date();
    let timestamp = today.setUTCHours(0, 0, 0, 0);
    let url = `https://content.everydaycrossword.com/web-games/password/${lang}/${timestamp}.json`;
    let data = await $.getJSON(url);
    //console.log(data);
    return data;
}

$(document).ready(function(){

    if(api.get(`${getGameLang()}_share_link`)) {
        //SETANDO SAHRE_LINK COMO O ÚLTIMO SHARE LINK
        console.log(api.get(`${getGameLang()}_share_link`))
        //$('.twitter-share-link').attr("href", api.get(`${getGameLang()}_share_link`))
        const btn = document.querySelector('.stats_share')
        btn.addEventListener('click', async () => {
            await share(api.get(`${getGameLang()}_share_link`))
        });
    } else {
        //console.log('Share link cookie not set')
    }

    read_game(getGameLang()).then(palavras => {
        palavra = palavras['palavra'];
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

        if (api.get(`${getGameLang()}_finished`)) {
            last_played = new Date(api.get(`${getGameLang()}_last-played`))
            //console.log(last_played)
            now = new Date()

            last_played.setHours(0, 0, 0, 0);
            now.setHours(0, 0, 0, 0);

            if (last_played.getTime() === now.getTime()) {
                // USUÁRIO JÁ JOGOU HOJE
                showStats();
                const finishedModal = new bootstrap.Modal(document.getElementById('finish'))
                finishedModal.show()
                $('#quit_button').addClass("hide");

                $('.board .current').removeClass('current')
                $('.selected').removeClass('selected')
                $('.ep_banner_div').removeClass('hide')

                if(api.get(`${getGameLang()}_words`)){
                    let filled_words = api.get(`${getGameLang()}_words`).split(', ');
                    let estados = api.get(`${getGameLang()}_estados`).split(';');
                    //console.log(filled_words);
                    for (let i = 0; i < filled_words.length; i++) {
                        let filled_word = filled_words[i].split('');
                        //console.log(filled_word);
                        if (filled_word.length > 0) {
                            let estados_word = estados[i].split(',');
                            filled_word.forEach((element, index) => {
                                lines[i].append(`<div class="tile ${estados_word[index]}" id="tile1"><p>${element}</p></div>`)
                            })
                        } else {
                            for (let j = 0; j < palavra.length; j++) {
                                lines[i].append('<div class="tile" id="tile1"></div>');
                            }
                        }
                    }
                }

                already_played = true;
            } else {
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
            }
        } else {
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
        }

    })
})

