const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(`${BASE_URL}/trainers`, { method: 'GET'})
.then(response => response.json())
.then(trainers => {
  console.log(trainers);
  trainers.forEach(trainer => {
    let newTrainer = new Trainer(trainer);
    trainer.pokemons.forEach(pokemon => {
      let newPokemon = new Pokemon(pokemon);
    })
  })
  trainerProxy.trainerz = trainerStore.trainerz
  pokemonProxy.pokemonz = pokeStore.pokemonz
})

const editTrainers = (trainer, pokemons) => {
  fetch(`${BASE_URL}/trainers/${trainer.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      pokemons: pokemons
    })
  })
  // .then()
}
