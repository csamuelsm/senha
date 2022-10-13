$(document).ready(function(){
    if (!api.get('onboarding')) {
        const onboardingModal = new bootstrap.Modal(document.getElementById('onboarding-1'))
        onboardingModal.show()
        api.set('onboarding', true)
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
        api.set('finished', true)
        api.set('last-played', new Date())
        $('.board .current .selected').removeClass('selected')
        $('.board .current').removeClass('current')

        $('.ep_banner_div').removeClass('hide')


        //$('#quit').modal('hide');

        //const finishedModal = new bootstrap.Modal(document.getElementById('finish'))
        //finishedModal.show()
    })
})