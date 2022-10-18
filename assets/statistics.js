function showStats() {
    $('.tries').html(api.get('tries'))
    $('.streak').html(api.get('streak'))
    $('.best_streak').html(api.get('best_streak'))
    $('.times_played').html(api.get('times_played'))
}

function updateStats(complete_game) {

    //tries
    if (complete_game.length != 0) {
	let tries = complete_game.length
    	api.set('tries', tries)
    }

    //streak
    let today = new Date()
    let last_played = new Date(api.get('last-played'))
    today.setUTCHours(0,0,0,0)
    last_played.setUTCHours(0,0,0,0)
    if (today.getTime() != last_played.getTime()){
	    api.set('times_played', parseInt(api.get('times_played'))+1)
	    api.set('last-played', new Date())
    }

    if (win) {
        let currStreak = parseInt(api.get('streak'))
        api.set('streak', currStreak+1)

	    if (currStreak + 1 > parseInt(api.get('best_streak'))) 
		    api.set('best_streak', currStreak+1)
	    
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
