class Trainer {
  constructor(trainer) {
    this.name = trainer.name
    this.id = trainer.id
    this.pokemons = trainer.pokemons
    Trainer.all.push(this)
  }

  static renderTrainers() {
    return Trainer.all.map(t=> t.render())
  }

  static renderPokemons() {
    return Trainer.all.map(t=> t.renderPoke()).flat()
  }

  render() {
    let trainerCard = document.createElement('div')

    trainerCard.className = "card"
    trainerCard.innerHTML = `
      <button data-trainer-id="${this.id}" data-action="create">Make a Pokemon</button>
      <h2>${this.name}</h2>
      <ul data-id= ${this.id}>

      </ul>
    `
    return trainerCard
  }

  //creates an array of list items for a single trainer
  renderPoke() {
    return this.pokemons.map(pokemon => {
      let singlePokemon = document.createElement('li')
      singlePokemon.id = pokemon.trainer_id, singlePokemon.dataset.name = pokemon.nickname
      let releaseButton = document.createElement('button')
      let ul = document.querySelector(`.${this.name}-list`)
      releaseButton.innerText = 'Release', releaseButton.dataset.id = pokemon.id, releaseButton.dataset.trainerId = pokemon.trainer_id, releaseButton.dataset.action = 'release'
      singlePokemon.innerText = `${pokemon.nickname} (${pokemon.species})`
      singlePokemon.dataset.id = pokemon.trainer_id
      singlePokemon.appendChild(releaseButton)
      return singlePokemon
    })
  }

  renderSinglePoke(pokemon) {
    let singlePokemon = document.createElement('li')
    singlePokemon.id = pokemon.trainer_id, singlePokemon.dataset.name = pokemon.nickname
    let releaseButton = document.createElement('button')
    let ul = document.querySelector(`.${this.name}-list`)
    releaseButton.innerText = 'Release', releaseButton.dataset.id = pokemon.id, releaseButton.dataset.trainerId = pokemon.trainer_id, releaseButton.dataset.action = 'release'
    singlePokemon.innerText = `${pokemon.nickname} (${pokemon.species})`
    singlePokemon.dataset.id = pokemon.trainer_id
    singlePokemon.appendChild(releaseButton)
    return singlePokemon
  }
}

Trainer.all = []
