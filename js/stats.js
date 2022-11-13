export { initState, successRate, getStats, updateStats }


let initState = function(what, solutionId) { 

    let situacion =[
        {
            "guesses": [],
            "solution": solutionId
        },
    ]
    let stats = [
        {
            winDistribution: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            gamesFailed: 0,
            currentStreak: 0,
            bestStreak: 0,
            totalGames: 0,
            successRate: 0
        }
    ]
    localStorage.setItem("WAYgameState", JSON.stringify(situacion))
    localStorage.setItem("gameStats", JSON.stringify(stats))

    // YOUR CODE HERE
    let valor1 = localStorage.getItem(what)
    console.log(valor1)
    return [valor1, function(guess){
        let valor2 = JSON.parse(localStorage.getItem("WAYgameState"))
        valor2[0].guesses.push(guess)
        localStorage.setItem("WAYgameState", JSON.stringify(valor2))
    }]
}



function successRate(e) {
    // YOUR CODE HERE
    return e.successRate;
}

let getStats = function(what) {
    // YOUR CODE HERE
    let objetua = localStorage.getItem(what)
    if (objetua != null){
        return objetua
    } else{
        let stats = [
            {
                winDistribution: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                gamesFailed: 0,
                currentStreak: 0,
                bestStreak: 0,
                totalGames: 0,
                successRate: 0
            }
        ]
        localStorage.setItem(what, JSON.stringify(stats))
        return localStorage.getItem(what)
    }
};


function updateStats(t) {
    // YOUR CODE HERE
    let winobjetua = JSON.parse(getStats("gameStats"))
    console.log(winobjetua)
    if (t < 8) {

        winobjetua[0].currentStreak ++;
        if (winobjetua[0].bestStreak < winobjetua[0].currentStreak) {
            winobjetua[0].bestStreak = winobjetua[0].currentStreak
        }
    } else if(t>=8 ) {
        winobjetua[0].gamesFailed ++; 
        winobjetua[0].currentStreak = 0
    }
    winobjetua[0].totalGames ++;
    winobjetua[0].successRate = (winobjetua[0].totalGames-winobjetua[0].gamesFailed) / (winobjetua[0].totalGames) * 100
    winobjetua[0].winDistribution[t] ++;
    console.log(winobjetua[0])
    localStorage.setItem('gameStats', JSON.stringify(winobjetua[0]))
   

}



let gamestats = getStats('gameStats');
