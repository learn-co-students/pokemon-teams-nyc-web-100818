const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function (){

  const main = document.getElementById('main')
  trainerAdapter = new JSONAdapter(TRAINERS_URL)
  pokemonAdapter = new JSONAdapter(POKEMONS_URL)


  function showTrainerCards(){
    main.innerHTML = ""
    trainerAdapter.getAll(function (trainers) {
      trainers.forEach(function(trainer){
        main.innerHTML += `
        <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
        <button class="add-pokemon-button" data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul>
        ${trainer.pokemons.map(function(pokemon){
          return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
        }).join(" ")}
        </ul>
        </div>
        `
      })
      addPokemonListeners()
      removePokemonListeners()
    })
  }// End showTrainerCards


  function addPokemonListeners(){
    let cards = Array.from(document.getElementsByClassName('card'))
    cards.forEach(function(card){
      card.addEventListener('click', function(event){
          if (event.target.className === "add-pokemon-button"){
            let id = parseInt(event.target.dataset.trainerId)
            console.log("trainer id: ",id);
            trainerAdapter.getSingle(id, function(trainer){
              console.log("pokemons in trainers list: ",trainer.pokemons.length);
              if (trainer.pokemons.length >= 6) return;
              pokemonAdapter.createSingle({trainer_id: id})
              showTrainerCards()
            });
          }
      })
    })
  }

  function removePokemonListeners(){
    pokemonReleases = Array.from(document.getElementsByClassName("release"))
    pokemonReleases.forEach(function(button){
      button.addEventListener("click", function(event){
        console.log(event.target.dataset.pokemonId)
        pokemonAdapter.deleteSingle(event.target.dataset.pokemonId)
        showTrainerCards()
      })
    })
  }


showTrainerCards()


});
