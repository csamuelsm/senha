function getTextForTwitter(complete_game) {
    var string;
    if (api.get('lang') == "en") {
        string = "I%20played%20Password!%0A%0A"
    } else if (api.get('lang') == "pt") {
        string = "Eu%20joguei%20Senha!%0A%0A"
    } else if (api.get('lang') == "de") {
        string = "Ich%20habe%20Passwort%20gespielt!%0A%0A"
    } else {
        string = "I%20played%20Password!%0A%0A"
    }
    for (var i = 0; i < complete_game.length; i++) {
        for (var j = 0; j < complete_game[i].length; j++) {
            //console.log(complete_game[i][j])
            if (complete_game[i][j] == "correto") {
                string = string + "%F0%9F%9F%A9"
            } else if (complete_game[i][j] == "existente") {
                string = string + "%F0%9F%9F%A8"
            } else if (complete_game[i][j] == "errado") {
                string = string + "%F0%9F%9F%A5"
            }
        }
        string = string + "%0A"
    }
    var gfg = document.URL;
    string = string + `%0A${gfg}`

    api.set("share_link", string)
    //console.log("Share link cookie now set")

    return "https://twitter.com/intent/tweet?text=" + string
}

function createShareString(complete_game) {
    var string;
    if (api.get('lang') == "en") {
        string = "I played Password!\n\n"
    } else if (api.get('lang') == "pt") {
        string = "Eu joguei Senha!\n\n"
    } else if (api.get('lang') == "de") {
        string = "Ich habe Passwort gespielt!\n\n"
    } else {
        string = "I played Password!\n\n"
    }
    for (var i = 0; i < complete_game.length; i++) {
        for (var j = 0; j < complete_game[i].length; j++) {
            //console.log(complete_game[i][j])
            if (complete_game[i][j] == "correto") {
                string = string + "🟩"
            } else if (complete_game[i][j] == "existente") {
                string = string + "🟨"
            } else if (complete_game[i][j] == "errado") {
                string = string + "🟥"
            }
        }
        string = string + "\n"
    }

    //string = string + `\n${gfg}`

    api.set(`${getGameLang()}_share_link`, string)
    //console.log("Share link cookie now set")

    return string
}

async function share(string) {
    var gfg = document.URL;

    const shareData = {
        text: string,
        url: gfg
    };

    try {
        await navigator.share(shareData)
    } catch (error) {
        navigator.clipboard.writeText(string + `\n${gfg}`);
        //alert("Copiado para a área de transferência!");
        const t = $('#copiado')
        const toast = new bootstrap.Toast(t);
        toast.show();
    }
}

async function fetchTexts(json_name) {
    const response = await fetch(json_name);
    const json = await response.json();
    return json;
}

function createTexts(lang) {
    fetchTexts("assets/languages/"+lang+".json").then(textos => {
        console.log(lang+".json")
        $('.title_top').html(textos['title']);

        //QUIT
        $('#quit_button').html(textos['quit_title']);
        $('#quit .modal-body h6 strong').html(textos['quit_question']);
        $('#quit .modal-body p').html(textos['quit_text']);
        $('#quit .modal-body .yes-button').html(textos['yes_button']);
        $('#quit .modal-body .no-button').html(textos['no_button']);

        //ENTER BUTTON
        $('#ENTER p').html(textos['send_button']);

        //SETTINGS
        $('#configuracoes .modal-body h6 strong').html(textos['settings_title'])
        $('#configuracoes .modal-body p').html(textos['settings_text'])

        //TOASTS
        $('#unfilled .toast-body').html(textos['unfilled_word'])
        $('#invalida .toast-body').html(textos['invalid_word'])

        //TITLE
        $('title').html(textos['title'])

        //MODALS
        $('#onboarding-1 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-1 .modal-body .onboarding-text').html(textos['onboarding_1'])
        $('#onboarding-1 .modal-body .yes-button').html(textos['onboarding_1_button'])

        $('#onboarding-2 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-2 .modal-body .onboarding-text').html(textos['onboarding_2'])
        $('#onboarding-2 .modal-body .secret_word').html(textos['secret_word'])
        $('#onboarding-2 .modal-body .yes-button').html(textos['onboarding_2_button'])
        $('#onboarding-2 .modal-body #tm21').html(textos['tm21'])
        $('#onboarding-2 .modal-body #tm22').html(textos['tm22'])
        $('#onboarding-2 .modal-body #tm23').html(textos['tm23'])
        $('#onboarding-2 .modal-body #tm24').html(textos['tm24'])
        $('#onboarding-2 .modal-body #tm25').html(textos['tm25'])

        $('#onboarding-3 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-3 .modal-body .onboarding-text').html(textos['onboarding_3'])
        $('#onboarding-3 .modal-body .yes-button').html(textos['onboarding_3_button'])
        $('#onboarding-3 .modal-body #tm31').html(textos['tm31'])
        $('#onboarding-3 .modal-body #tm32').html(textos['tm32'])
        $('#onboarding-3 .modal-body #tm33').html(textos['tm33'])
        $('#onboarding-3 .modal-body #tm34').html(textos['tm34'])
        $('#onboarding-3 .modal-body #tm35').html(textos['tm35'])

        $('#onboarding-4 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-4 .modal-body .onboarding-text').html(textos['onboarding_4'])
        $('#onboarding-4 .modal-body .yes-button').html(textos['onboarding_4_button'])
        $('#onboarding-4 .modal-body #tm41').html(textos['tm31'])
        $('#onboarding-4 .modal-body #tm42').html(textos['tm32'])
        $('#onboarding-4 .modal-body #tm43').html(textos['tm33'])
        $('#onboarding-4 .modal-body #tm44').html(textos['tm34'])
        $('#onboarding-4 .modal-body #tm45').html(textos['tm35'])

        $('#onboarding-5 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-5 .modal-body .onboarding-text').html(textos['onboarding_5'])
        $('#onboarding-5 .modal-body .yes-button').html(textos['onboarding_5_button'])
        $('#onboarding-5 .modal-body #tm51').html(textos['tm41'])
        $('#onboarding-5 .modal-body #tm52').html(textos['tm42'])
        $('#onboarding-5 .modal-body #tm53').html(textos['tm43'])
        $('#onboarding-5 .modal-body #tm54').html(textos['tm44'])
        $('#onboarding-5 .modal-body #tm55').html(textos['tm45'])

        $('#onboarding-6 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-6 .modal-body .onboarding-text').html(textos['onboarding_6'])
        $('#onboarding-6 .modal-body .yes-button').html(textos['onboarding_6_button'])

        $('#onboarding-6 .modal-body #tm41').html(textos['tm31'])
        $('#onboarding-6 .modal-body #tm42').html(textos['tm32'])
        $('#onboarding-6 .modal-body #tm43').html(textos['tm33'])
        $('#onboarding-6 .modal-body #tm44').html(textos['tm34'])
        $('#onboarding-6 .modal-body #tm45').html(textos['tm35'])

        $('#onboarding-6 .modal-body #tm51').html(textos['tm41'])
        $('#onboarding-6 .modal-body #tm52').html(textos['tm42'])
        $('#onboarding-6 .modal-body #tm53').html(textos['tm43'])
        $('#onboarding-6 .modal-body #tm54').html(textos['tm44'])
        $('#onboarding-6 .modal-body #tm55').html(textos['tm45'])

        $('#onboarding-6 .modal-body #tm21').html(textos['tm21'])
        $('#onboarding-6 .modal-body #tm22').html(textos['tm22'])
        $('#onboarding-6 .modal-body #tm23').html(textos['tm23'])
        $('#onboarding-6 .modal-body #tm24').html(textos['tm24'])
        $('#onboarding-6 .modal-body #tm25').html(textos['tm25'])

        //COLORS OF ENTRIES
        if (lang == 'en') {
            $('#onboarding-6 .modal-body #tm54').parent().removeClass('existente').addClass('errado');
            $('#onboarding-5 .modal-body #tm54').parent().removeClass('existente').addClass('errado');
        } else if (lang == 'de') {
            //FARBE
            $('#onboarding-6 .modal-body #tm45').parent().removeClass('errado').addClass('correto');
            $('#onboarding-6 .modal-body #tm42').parent().removeClass('correto').addClass('errado');

            $('#onboarding-4 .modal-body #tm45').parent().removeClass('errado').addClass('correto');
            $('#onboarding-4 .modal-body #tm42').parent().removeClass('correto').addClass('errado');

            //HENNA
            $('#onboarding-6 .modal-body #tm52').parent().removeClass('correto').addClass('existente')
            $('#onboarding-6 .modal-body #tm54').parent().removeClass('existente').addClass('errado')
            $('#onboarding-6 .modal-body #tm55').parent().removeClass('existente').addClass('errado')

            $('#onboarding-5 .modal-body #tm52').parent().removeClass('correto').addClass('existente')
            $('#onboarding-5 .modal-body #tm54').parent().removeClass('existente').addClass('errado')
            $('#onboarding-5 .modal-body #tm55').parent().removeClass('existente').addClass('errado')

        }

        //FINISH MODAL
        $('.finished_title').html(textos['finished_title'])
        $('.finished_text').html(textos['finished_text'])
        $('.countdown_text').html(textos['countdown_text'])
        $('.text_reveal').html(textos['text_reveal'])
        $('.answer_text').html(textos['answer_text'])
        $('.stats_streak').html(textos['stats_streak'])
        $('.stats_best').html(textos['stats_best'])
        $('.stats_tries').html(textos['stats_tries'])
        $('.stats_challenges').html(textos['stats_challenges'])
        $('.stats_share').html(textos['stats_share'])
        $('#ep_banner1').attr('src', 'assets/banners/'+textos['ep_banner'])
        $('#ep_banner2').attr('src', 'assets/banners/'+textos['ep_banner'])
        $('#finish #ep_banner').attr('src', 'assets/banners/'+textos['ep_banner'])

        //PLAY MORE BUTTON
        $('.play_more_button h2').html(textos['play_more_button'])

        //CONFIG MODAL
        $('.config-save').html(textos['config-save'])

        //INSTALL URL
        $('.install_url').each(function(index, element) {
            $(this).attr('href', getInstallUrl());
        });
    })
}

//var userLang = navigator.language || navigator.userLanguage;
var userLang = getGameLang() || 'en';

var database;

//selecionando database de acordo com a linguagem
if (!api.get("lang"))
{
    if (/^en\b/.test(userLang)) {
        database = './assets/words/en_5.json'
    } else if (/^pt\b/.test(userLang)) {
        database = './assets/words/pt_5.json'
    } else if (/^de\b/.test(userLang)) {
        database = './assets/words/de_5.json'
    } else {
        database = './assets/words/en_5.json'
    }
} else {
    let lang = api.get("lang")
    if (lang == "en") {
        database = './assets/words/en_5.json'
    } else if (lang == "pt") {
        database = './assets/words/pt_5.json'
    } else if (lang == "de") {
        database = './assets/words/de_5.json'
    } else {
        database = './assets/words/en_5.json'
    }
}

//console.log(userLang)

$(document).ready(function(){
    if (!api.get("lang"))
    {
        // Cookies de linguagem não estão setados
        if (/^en\b/.test(userLang)) {
            $('.language-selector option[value="en"]').prop("selected", true)
            api.set("lang", "en")
            setGameLang("en")
            createTexts("en")
        } else if (/^pt\b/.test(userLang)) {
            $('.language-selector option[value="pt"]').prop("selected", true)
            api.set("lang", "pt")
            setGameLang("pt")
            createTexts("pt")
        } else if (/^de\b/.test(userLang)) {
            $('.language-selector option[value="de"]').prop("selected", true)
            api.set("lang", "de")
            setGameLang("de")
            createTexts("de")
        } else {
            $('.language-selector option[value="en"]').prop("selected", true)
            api.set("lang", "en")
            setGameLang("en")
            createTexts("en")
        }
    } else {
        // Cookies de linguagem estão setados
        let lang = api.get("lang")
        if (lang == "en") {
            $('.language-selector option[value="en"]').prop("selected", true)
            createTexts("en")
        } else if (lang == "pt") {
            $('.language-selector option[value="pt"]').prop("selected", true)
            createTexts("pt")
        } else if (lang == "de") {
            $('.language-selector option[value="de"]').prop("selected", true)
            createTexts("de")
        } else {
            $('.language-selector option[value="en"]').prop("selected", true)
            createTexts("en")
        }
    }

    // SELECTING LANGUAGEM FROM MODAL
    $('#configuracoes .yes-button').on('click', function() {
        // TODO: pegar linguagem selecionada, setar o cookie lang e reiniciar pagina
        let selected_lang = $('.language-selector').children("option:selected").val()
        if (selected_lang == "en") {
            api.set("lang", "en")
            setGameLang("en")
        } else if (selected_lang == "pt") {
            api.set("lang", "pt")
            setGameLang("pt")
        } else if (selected_lang == "de") {
            api.set("lang", "de")
            setGameLang("de")
        } else {
            api.set("lang", "en")
            setGameLang("en")
        }
        location.reload()
    })
})