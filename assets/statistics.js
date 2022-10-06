function showStats() {
    $('.tries').html(Cookies.get('tries'))
    $('.streak').html(Cookies.get('streak'))
    $('.best_streak').html(Cookies.get('best_streak'))
    $('.times_played').html(Cookies.get('times_played'))
}

function updateStats(complete_game) {

    //tries
    let tries = complete_game.length
    Cookies.set('tries', tries)

    //tries distribution
    if (tries == 1) {
        Cookies.set('guess_1', parseInt(Cookies.get('guess_1')) + 1)
    } else if (tries == 2) {
        Cookies.set('guess_2', parseInt(Cookies.get('guess_2')) + 1)
    } else if (tries == 3) {
        Cookies.set('guess_3', parseInt(Cookies.get('guess_3')) + 1)
    } else if (tries == 4) {
        Cookies.set('guess_4', parseInt(Cookies.get('guess_4')) + 1)
    } else if (tries == 5) {
        Cookies.set('guess_5', parseInt(Cookies.get('guess_5')) + 1)
    } else if (tries == 6) {
        Cookies.set('guess_6', parseInt(Cookies.get('guess_6')) + 1)
    }

    //streak
    if (win) {
        let today = new Date()
        if (Cookies.get('last_played')) {
            let last_played = new Date(Cookies.get('last-played'))

            today.setUTCHours(0,0,0,0)
            last_played.setUTCHours(0,0,0,0)

            if (today.getTime() != last_played.getTime()) {
                Cookies.set('times_played', parseInt(Cookies.get('times_played')) + 1)
            }

            let next_day = new Date(last_played.getDate()+1)

            if (today.getTime() == next_day.getTime()) {
                curr_streak = parseInt(Cookies.get('streak'))
                Cookies.set('streak', curr_streak+1)

                let best_streak = parseInt(Cookies.get('best_streak'))
                if (curr_streak + 1 > best_streak) {
                    Cookies.set('best_streak', curr_streak + 1)
                }
            }
        } else {
            Cookies.set('streak', 1)
            Cookies.set('best_streak', 1)
        }

    } else {
        Cookies.set('streak', 0)
    }

    showStats()

}

$(document).ready(function(){
    if(!Cookies.get('streak')) Cookies.set('streak', 0)
    if(!Cookies.get('times_played')) Cookies.set('times_played', 0)
    if(!Cookies.get('best_streak')) Cookies.set('best_streak', 0)
    if(!Cookies.get('tries')) Cookies.set('tries', 0)
    if(!Cookies.get('guess_1')) Cookies.set('guess_1', 0)
    if(!Cookies.get('guess_2')) Cookies.set('guess_2', 0)
    if(!Cookies.get('guess_3')) Cookies.set('guess_3', 0)
    if(!Cookies.get('guess_4')) Cookies.set('guess_4', 0)
    if(!Cookies.get('guess_5')) Cookies.set('guess_5', 0)
    if(!Cookies.get('guess_6')) Cookies.set('guess_6', 0)
    }
)