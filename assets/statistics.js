function showStats() {
    $('.tries').html(api.get(`${getGameLang()}_tries`))
    $('.streak').html(api.get(`${getGameLang()}_streak`))
    $('.best_streak').html(api.get(`${getGameLang()}_best_streak`))
    $('.times_played').html(api.get(`${getGameLang()}_times_played`))
}

function updateStats(complete_game) {

    //tries
    if (complete_game.length != 0) {
	let tries = complete_game.length
    	api.set(`${getGameLang()}_tries`, tries)
    }

    //streak
    let today = new Date()
    let last_played = new Date(api.get(`${getGameLang()}_last-played`))
    today.setUTCHours(0,0,0,0)
    last_played.setUTCHours(0,0,0,0)
    if (today.getTime() != last_played.getTime()){
	    api.set(`${getGameLang()}_times_played`, parseInt(api.get(`${getGameLang()}_times_played`))+1)
	    api.set(`${getGameLang()}_last-played`, new Date())
    }

    if (win) {
        let currStreak = parseInt(api.get(`${getGameLang()}_streak`))
        api.set(`${getGameLang()}_streak`, currStreak+1)

	    if (currStreak + 1 > parseInt(api.get(`${getGameLang()}_best_streak`)))
		    api.set(`${getGameLang()}_best_streak`, currStreak+1)

    }

    showStats()

}

$(document).ready(function(){
    if(!api.get(`${getGameLang()}_streak`)) api.set(`${getGameLang()}_streak`, 0)
    if(!api.get(`${getGameLang()}_times_played`)) api.set(`${getGameLang()}_times_played`, 0)
    if(!api.get(`${getGameLang()}_best_streak`)) api.set(`${getGameLang()}_best_streak`, 0)
    if(!api.get(`${getGameLang()}_tries`)) api.set(`${getGameLang()}_tries`, 0)
    if(!api.get(`${getGameLang()}_guess_1`)) api.set(`${getGameLang()}_guess_1`, 0)
    if(!api.get(`${getGameLang()}_guess_2`)) api.set(`${getGameLang()}_guess_2`, 0)
    if(!api.get(`${getGameLang()}_guess_3`)) api.set(`${getGameLang()}_guess_3`, 0)
    if(!api.get(`${getGameLang()}_guess_4`)) api.set(`${getGameLang()}_guess_4`, 0)
    if(!api.get(`${getGameLang()}_guess_5`)) api.set(`${getGameLang()}_guess_5`, 0)
    if(!api.get(`${getGameLang()}_guess_6`)) api.set(`${getGameLang()}_guess_6`, 0)
    }
)
