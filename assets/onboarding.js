$(document).ready(function(){
    if (!api.get(`${getGameLang()}_onboarding`)) {
        const onboardingModal = new bootstrap.Modal(document.getElementById('onboarding-1'))
        onboardingModal.show()
        api.set(`${getGameLang()}_onboarding`, true)
    }

    $('.onboarding-show').on('click', function(){
        const onboardingModal = new bootstrap.Modal(document.getElementById('onboarding-1'))
        onboardingModal.show()
    })

    $('.configuracoes-show').on('click', function(){
        const configuracoesModal = new bootstrap.Modal(document.getElementById('configuracoes'))
        configuracoesModal.show()
    })

    $('.desistir-button').on('click', function() {
        //USUÁRIO DESISTIU
        updateStats(complete_game)
        api.set(`${getGameLang()}_finished`, true)
        api.set(`${getGameLang()}_last-played`, new Date())
        $('.board .current .selected').removeClass('selected')
        $('.board .current').removeClass('current')
        $('#quit_button').addClass("hide");
        api.set(`${getGameLang()}_words`, get_words());
        api.set(`${getGameLang()}_estados`, complete_game_string());

        $('.ep_banner_div').removeClass('hide')


        //$('#quit').modal('hide');

        //const finishedModal = new bootstrap.Modal(document.getElementById('finish'))
        //finishedModal.show()
    })
})