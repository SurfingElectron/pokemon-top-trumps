//DEFINING VARIABLES
let userName = document.querySelector("#player-name");
let h2 = document.querySelector(`h2`);
let buttonPress = document.querySelector("#fight-button");
let playerPokemonName = document.querySelector("#pokemon-name");
let playerChoice ;
let computerChoice ;

const score = {roundCount: 0, winCount: 0, lossCount: 0, drawCount: 0};

const totalLi = document.querySelector('#games-played');
const winLi = document.querySelector('#wins');
const lossLi = document.querySelector('#losses');
const drawLi = document.querySelector('#draws');

//EVENT LISTENERS - 
userName.addEventListener(`keydown`, enterName);
playerPokemonName.addEventListener(`keydown`, handlePlayerPokemon);
buttonPress.addEventListener(`click`, pokemonFight);

//FUNCTIONS
//Player name, posts to webpage
function enterName(e){ 
    if (e.key == `Enter`){
    h2.innerText = `welcome  ${userName.value}  Are you ready to Fight? `;
    }
}

//Player's choice of pokemon, assigns to playerChoice variable
function handlePlayerPokemon(e){ 
    if (e.key == `Enter`){
    playerChoice = playerPokemonName.value;
    }   
}

    

//Computer's choice of pokemon, picked by random number 1-898
function getComputerMove() {
    let randomIndex = Math.floor(Math.random() * 898);
    console.log(randomIndex);
    return randomIndex;
}


//API fetch, takes in a reference value to create appropriate URL
async function getPokemonData(pokeRef) {
    let pokeURL = 'https://pokeapi.co/api/v2/pokemon/' + pokeRef;
    const response = await fetch(pokeURL);
    let data = await response.json(); 
    console.log(data.stats[1].base_stat);
    return data.stats[1].base_stat;
    }


//Calculating the battle result
 async function pokemonFight() {
    computerChoice = getComputerMove();
    console.log('Player Selection:', playerChoice);
    console.log('Computer selection:', computerChoice);
    let playerPokemon = await getPokemonData(playerChoice);
    let computerPokemon = await getPokemonData(computerChoice);
    console.log('Player Pokemon Strength:', playerPokemon);
    console.log('Computer Pokemon Strength:', computerPokemon);

    score.roundCount++;
    totalLi.innerText = `Games played: ${score.roundCount}`;
    if (playerPokemon < computerPokemon) {
        score.lossCount++;
        lossLi.innerText = `Losses: ${score.lossCount}`;
        console.log('Player loses');
    } else if (playerPokemon > computerPokemon) {
        score.winCount++
        winLi.innerText = `Wins: ${score.winCount}`;
        console.log('Player wins');
    } else {
        score.drawCount++
        drawLi.innerText = `Draws: ${score.drawCount}`;
        console.log('draw');
    }
 }

