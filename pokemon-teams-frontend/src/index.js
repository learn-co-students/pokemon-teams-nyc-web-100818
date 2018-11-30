document.addEventListener('click', (event) => {
  if (event.target.className == "release") {
    let trainerId = event.target.parentElement.parentElement.parentElement.dataset.id
    let trainer = trainerStore.trainerz.find(trainer => trainer.id == trainerId)
    let pokemon = trainer.pokemons.find(pokemon => pokemon.id == event.target.dataset.pokemonId)
    releasePokemon(trainer, pokemon);
  }
})

document.addEventListener('click', (event) => {
  if (event.target.className == "add-pokemon") {
    let trainerId = event.target.dataset.trainerId;

    addPokemon(trainerId)
  }
})
