// YOUR CODE HERE :  
// .... stringToHTML ....
// .... setupRows .....

import { fetchJSON } from "./loaders.js";
import { getSolution, differenceInDays} from "./main.js";
import {stringToHTML} from  "./fragments.js";
import { higher,lower } from "./fragments.js";
export {setupRows}


const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate']


let setupRows = function (game) {


    function leagueToFlag(leagueId) {
        // YOUR CODE HERE
        return (leagueId == 564) ? "es1" :
            (leagueId == 8) ? "en1" :
            (leagueId == 82) ? "de1" :
            (leagueId == 384) ? "it1" :
            (leagueId == 301) ? "fr1" : "NaN"
    }

    function getAge(dateString) {
        // YOUR CODE HERE
        let gaur = new Date()
        let date = new Date(dateString.substr(5,2) + "-" + dateString.substr(8,2) + "-" + dateString.substr(0,4))
        let edad = gaur.getFullYear() - date.getFullYear()
        if (gaur.getMonth() < date.getMonth()){
            edad = edad - 1;
        } else if (gaur.getMonth() == date.getMonth() && gaur.getDate() < date.getDate()) {
            edad = edad - 1;
        }
        return edad
    }
    
    let check = function (theKey, theValue) {
        // YOUR CODE HERE
        let misterioso = game.solution
        let atributo
        attribs.forEach(a => {
            if (a == theKey){
                atributo = theKey
            }
        })
        if (atributo == "birthdate"){
            if (misterioso[atributo] == theValue){
                return "correct"
            }else if (misterioso[atributo] > theValue){
                return "lower"
            }else{
                return "higher"
            }
        }else{
            if (misterioso[atributo] == theValue){
                return "correct"
            } else{
                return "incorrect"
            }
        }
    }

    function setContent(guess) {
    
        return [
            `<img src="https://playfootball.games/who-are-ya/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
            `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
            `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
            `${guess.position}`,
            `${getAge(guess.birthdate)}`

        ]

    }

    function showContent(content, guess) {
        let fragments = '', s = '';
        for (let j = 0; j < content.length; j++) {
            s = "".concat(((j + 1) * delay).toString(), "ms")
            fragments += `<div class="w-1/5 shrink-0 flex justify-center ">
                            <div class="mx-1 overflow-hidden w-full max-w-2 shadowed font-bold text-xl flex aspect-square rounded-full justify-center items-center bg-slate-400 text-white ${check(attribs[j], guess[attribs[j]]) == 'correct' ? 'bg-green-500' : ''} opacity-0 fadeInDown" style="max-width: 60px; animation-delay: ${s};">
                                ${content[j]}
                            </div>
                         </div>`
        }

        let child = `<div class="flex w-full flex-wrap text-l py-2">
                        <div class=" w-full grow text-center pb-2">
                            <div class="mx-1 overflow-hidden h-full flex items-center justify-center sm:text-right px-4 uppercase font-bold text-lg opacity-0 fadeInDown " style="animation-delay: 0ms;">
                                ${guess.name}
                            </div>
                        </div>
                        ${fragments}`

        let playersNode = document.getElementById('players')
        playersNode.prepend(stringToHTML(child))
    }

    let getPlayer = function (playerId) {
            // YOUR CODE HERE 
            let jokalaria = game.players.filter(jokalaria => jokalaria.id == playerId);
            return jokalaria[0]
    }

    return /* addRow */ function (playerId) {

        let guess = getPlayer(playerId)
        console.log(guess)

        let content = setContent(guess)
        showContent(content, guess)
    }
}
