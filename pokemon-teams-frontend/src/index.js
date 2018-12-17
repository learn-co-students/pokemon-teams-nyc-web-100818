const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
    const mainDiv = document.querySelector('#mainDiv')
    let allTeamsData = []
    let trainers = []

    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(teamJson => {
            console.log(teamJson)
            allTeamsData = teamJson
            mainDiv.innerHTML = renderAllCards(allTeamsData)
        })

    function renderPokemonLi(pokemonArr) {
        return pokemonArr.map(pokemon => {
            return `<li data-id="${pokemon.id}">${pokemon.nickname} (${pokemon.species}) <button class="release" data-action='release' data-id="${pokemon.id}">Release</button></li>`
        }).join('')
    }

    function renderCard(trainer) {
        return `
        <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
        <button data-action='add' data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul data-id='${trainer.id}'>
            ${renderPokemonLi(trainer.pokemons)}
            
        </ul>
      </div>
        `

    }

    function renderAllCards(allCards) {
        return allCards.map(renderCard)
    }

    mainDiv.addEventListener('click', e => {
        const targetId = e.target.dataset.trainerId
        const trainerIdx = allTeamsData.findIndex(trainer => trainer.id == targetId)
        const targetTrainer = allTeamsData[trainerIdx]

        if (targetId != undefined) {

            if (e.target.dataset.action === 'add') {
                console.log(targetTrainer.pokemons)
                let pokeCount = targetTrainer.pokemons.length;
                if (pokeCount < 6) {
                    fetch(POKEMONS_URL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json'
                            },
                            body: JSON.stringify({
                                "trainer_id": targetTrainer.id
                            })
                        })
                        .then(res => res.json())
                        .then(newPokemon => {
                            const pokemonUl = mainDiv.querySelector(`ul[data-id="${targetId}"]`)
                            targetTrainer.pokemons.push(newPokemon)
                            pokemonUl.innerHTML = renderPokemonLi(targetTrainer.pokemons)
                        })
                }
            }
        } else if (e.target.dataset.action === 'release') {
            const targetLi = e.target.parentElement;
            const targetUl = targetLi.parentElement;
            const pokeId = targetLi.dataset.id;


            fetch(`${POKEMONS_URL}/${pokeId}`, {
                    method: 'DELETE'
                })
                .then(res => {
                    if (res.ok) {
                        targetTrainer.pokemons = targetTrainer.pokemons.filter(poke => poke.id == pokeId)
                        //  let targetLi = pokemonUl.querySelector(`li[data-id="${e.target.datset.id}"]`)
                        targetUl.removeChild(targetLi)

                    }


                })
        }
    })


})