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
        if (/^en\b/.test(userLang)) {
            $('.language-selector option[value="en"]').prop("selected", true)
            Cookies.set("lang", "en")
        } else if (/^pt\b/.test(userLang)) {
            $('.language-selector option[value="pt"]').prop("selected", true)
            Cookies.set("lang", "pt")
        } else if (/^de\b/.test(userLang)) {
            $('.language-selector option[value="de"]').prop("selected", true)
            Cookies.set("lang", "de")
        } else {
            $('.language-selector option[value="en"]').prop("selected", true)
            Cookies.set("lang", "en")
        }
    } else {
        let lang = Cookies.get("lang")
        if (lang == "en") {
            $('.language-selector option[value="en"]').prop("selected", true)
        } else if (lang == "pt") {
            $('.language-selector option[value="pt"]').prop("selected", true)
        } else if (lang == "de") {
            $('.language-selector option[value="de"]').prop("selected", true)
        } else {
            $('.language-selector option[value="en"]').prop("selected", true)
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