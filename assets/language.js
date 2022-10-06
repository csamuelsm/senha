function getTextForTwitter(complete_game) {
    var string;
    if (Cookies.get('lang') == "en") {
        string = "I%20played%20Password!%0A%0A"
    } else if (Cookies.get('lang') == "pt") {
        string = "Eu%20joguei%20Password!%0A%0A"
    } else if (Cookies.get('lang') == "de") {
        string = "Ich%20habe%20Password%20gespielt!%0A%0A"
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
    string = string + "%0Ahttps://csamuelsm.github.io/senha"

    Cookies.set("share_link", string)
    //console.log("Share link cookie now set")

    return "https://twitter.com/intent/tweet?text=" + string
}

async function fetchTexts(json_name) {
    const response = await fetch(json_name);
    const json = await response.json();
    return json;
}

function createTexts(lang) {
    fetchTexts("assets/languages/"+lang+".json").then(textos => {
        console.log(lang+".json")
        //QUIT
        $('#quit_button').html(textos['quit_title']);
        $('#quit .modal-body h6 strong').html(textos['quit_title']);
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

        //MODALS
        $('#onboarding-1 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-1 .modal-body .onboarding-text').html(textos['onboarding_1'])
        $('#onboarding-1 .modal-body .yes-button').html(textos['onboarding_1_button'])

        $('#onboarding-2 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-2 .modal-body .onboarding-text').html(textos['onboarding_2'])
        $('#onboarding-2 .modal-body .yes-button').html(textos['onboarding_2_button'])

        $('#onboarding-3 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-3 .modal-body .onboarding-text').html(textos['onboarding_3'])
        $('#onboarding-3 .modal-body .yes-button').html(textos['onboarding_3_button'])

        $('#onboarding-4 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-4 .modal-body .onboarding-text').html(textos['onboarding_4'])
        $('#onboarding-4 .modal-body .yes-button').html(textos['onboarding_4_button'])

        $('#onboarding-5 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-5 .modal-body .onboarding-text').html(textos['onboarding_5'])
        $('#onboarding-5 .modal-body .yes-button').html(textos['onboarding_5_button'])

        $('#onboarding-6 .modal-body h6 strong').html(textos['title'])
        $('#onboarding-6 .modal-body .onboarding-text').html(textos['onboarding_6'])
        $('#onboarding-6 .modal-body .yes-button').html(textos['onboarding_6_button'])
    })
}

var userLang = navigator.language || navigator.userLanguage;

var database;

//selecionando database de acordo com a linguagem
if (!Cookies.get("lang"))
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
    let lang = Cookies.get("lang")
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
    if (!Cookies.get("lang"))
    {
        // Cookies de linguagem não estão setados
        if (/^en\b/.test(userLang)) {
            $('.language-selector option[value="en"]').prop("selected", true)
            Cookies.set("lang", "en")
            createTexts("en")
        } else if (/^pt\b/.test(userLang)) {
            $('.language-selector option[value="pt"]').prop("selected", true)
            Cookies.set("lang", "pt")
            createTexts("pt")
        } else if (/^de\b/.test(userLang)) {
            $('.language-selector option[value="de"]').prop("selected", true)
            Cookies.set("lang", "de")
            createTexts("de")
        } else {
            $('.language-selector option[value="en"]').prop("selected", true)
            Cookies.set("lang", "en")
            createTexts("en")
        }
    } else {
        // Cookies de linguagem estão setados
        let lang = Cookies.get("lang")
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
            Cookies.set("lang", "en")
        } else if (selected_lang == "pt") {
            Cookies.set("lang", "pt")
        } else if (selected_lang == "de") {
            Cookies.set("lang", "de")
        } else {
            Cookies.set("lang", "en")
        }
        location.reload()
    })
})