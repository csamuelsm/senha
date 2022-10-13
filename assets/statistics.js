function showStats() {
    $('.tries').html(api.get('tries'))
    $('.streak').html(api.get('streak'))
    $('.best_streak').html(api.get('best_streak'))
    $('.times_played').html(api.get('times_played'))
}

function updateStats(complete_game) {

    //tries
    let tries = complete_game.length
    api.set('tries', tries)

    //tries distribution
    if (tries == 1) {
        api.set('guess_1', parseInt(api.get('guess_1')) + 1)
    } else if (tries == 2) {
        api.set('guess_2', parseInt(api.get('guess_2')) + 1)
    } else if (tries == 3) {
        api.set('guess_3', parseInt(api.get('guess_3')) + 1)
    } else if (tries == 4) {
        api.set('guess_4', parseInt(api.get('guess_4')) + 1)
    } else if (tries == 5) {
        api.set('guess_5', parseInt(api.get('guess_5')) + 1)
    } else if (tries == 6) {
        api.set('guess_6', parseInt(api.get('guess_6')) + 1)
    }

    //streak
    let today = new Date()
    if (api.get('last_played')) {
        let last_played = new Date(api.get('last-played'))

        today.setUTCHours(0,0,0,0)
        last_played.setUTCHours(0,0,0,0)

        if (today.getTime() != last_played.getTime()) {
            api.set('times_played', parseInt(api.get('times_played')) + 1)
        }
    } else {
        api.set('times_played', 1)
    }

    if (win) {

        if (api.get('last_played')) {
            let last_played = new Date(api.get('last-played'))

            today.setUTCHours(0,0,0,0)
            last_played.setUTCHours(0,0,0,0)

            if (today.getTime() != last_played.getTime()) {
                api.set('times_played', parseInt(api.get('times_played')) + 1)
            }

            let next_day = new Date(last_played.getDate()+1)

            if (today.getTime() == next_day.getTime()) {
                curr_streak = parseInt(api.get('streak'))
                api.set('streak', curr_streak+1)

                let best_streak = parseInt(api.get('best_streak'))
                if (curr_streak + 1 > best_streak) {
                    api.set('best_streak', curr_streak + 1)
                }
            }
        } else {
            api.set('streak', 1)
            api.set('best_streak', 1)
        }

    } else {
        api.set('streak', 0)
    }

    showStats()

}

$(document).ready(function(){
    if(!api.get('streak')) api.set('streak', 0)
    if(!api.get('times_played')) api.set('times_played', 0)
    if(!api.get('best_streak')) api.set('best_streak', 0)
    if(!api.get('tries')) api.set('tries', 0)
    if(!api.get('guess_1')) api.set('guess_1', 0)
    if(!api.get('guess_2')) api.set('guess_2', 0)
    if(!api.get('guess_3')) api.set('guess_3', 0)
    if(!api.get('guess_4')) api.set('guess_4', 0)
    if(!api.get('guess_5')) api.set('guess_5', 0)
    if(!api.get('guess_6')) api.set('guess_6', 0)
    }
)