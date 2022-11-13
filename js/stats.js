export { initState }
//export { successRate, getStats, updateStats };

let initState = function (what, solutionId) {

    // YOUR CODE HERE
    let situacion = [{ "guesses": [], "solution": solutionId }]
    localStorage.setItem("WAYgameState", JSON.stringify(situacion));


    let objetua = localStorage.getItem(what);
    let funtzioa = function (guess) {
        let objetua2 = JSON.parse(localStorage.getItem("WAYgameState"));
        console.log(objetua2)
        objetua2[0]["guesses"].push(guess)

        localStorage.setItem("WAYgameState", JSON.stringify(objetua2));


    }
    return [objetua, funtzioa];

}

