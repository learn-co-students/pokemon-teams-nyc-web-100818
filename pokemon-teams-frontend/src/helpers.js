const mainDiv = document.querySelector("main")

const renderAllTrainers = () => {
  trainerStore.trainerz.forEach(trainer => {
    // console.log("rendering cards");
    renderTrainerCard(trainer)
  })
}

const renderTrainerCard = (trainer) => {
mainDiv.innerHTML += `
  <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}" class="add-pokemon">Add Pokemon</button>
    <ul id="ul-${trainer.id}">
    </ul>
  </div>
  `
  renderTrainersPokemon(trainer)
}

const renderTrainersPokemon = (trainer) => {
  const ul = document.getElementById(`ul-${trainer.id}`)
  trainer.pokemons.forEach(pokemon => {
    ul.innerHTML += `
    <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
    `
  })
}

const releasePokemon = (trainer, pokemon) => {
  // TODO: insert PATCH request here

  let trainerIndex = trainer.pokemons.indexOf(pokemon)
  trainer.pokemons.splice(trainerIndex, 1);
  let mon = pokeStore.pokemonz.find(mons => mons.id == pokemon.id)
  mon.trainerId = ""
  trainerProxy2.trainerz = trainerStore.trainerz
  // console.log(trainer.id);
  // editTrainers(trainer, trainer.pokemons)

}

const reRenderPokemon = () => {
  const allUls = document.querySelectorAll("ul")
  allUls.forEach(ul => ul.innerHTML = "")
  trainerStore.trainerz.forEach(trainer => renderTrainersPokemon(trainer))
}

const addPokemon = (trainerId) => {
  console.log(trainerId);
  // TODO : add POST request
  const ul = document.getElementById(`ul-${trainerId}`)
  let trainer = trainerStore.trainerz.find(trainer => trainer.id == trainerId);
  let trainersPokemon = trainer.pokemons
  if (trainersPokemon.length < 6) {
    let randPoke = pokeStore.pokemonz[Math.floor(Math.random()*pokeStore.pokemonz.length)]
    trainersPokemon.push(randPoke)
    trainerProxy2.trainerz = trainerStore.trainerz
  }

}
