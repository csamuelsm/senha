$(document).ready(function(){
    if (!Cookies.get('onboarding')) {
        const onboardingModal = new bootstrap.Modal(document.getElementById('onboarding-1'))
        onboardingModal.show()
        Cookies.set('onboarding', true)
    }

    $('.onboarding-show').on('click', function(){
        const onboardingModal = new bootstrap.Modal(document.getElementById('onboarding-1'))
        onboardingModal.show()
    })

    $('.configuracoes-show').on('click', function(){
        const configuracoesModal = new bootstrap.Modal(document.getElementById('configuracoes'))
        configuracoesModal.show()
    })

    $('desistir-button').on('click', function() {
        //USUÁRIO DESISTIU
        updateStats(complete_game)
        Cookies.set('finished', true)
        Cookies.set('last-played', new Date())
        $('.board .current .selected').removeClass('selected')
        $('.board .current').removeClass('current')

        //$('#quit').modal('hide');

        //const finishedModal = new bootstrap.Modal(document.getElementById('finish'))
        //finishedModal.show()
    })
})