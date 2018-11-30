class DOMController {
  constructor() {
    this.main = document.querySelector('main')
    this.main.addEventListener('click', this.handleMainClick.bind(this))
  }

  init() {
    Trainer.populateFromAPI()
      .then(() => this.render())
  }

  render() {
    this.main.innerHTML = Trainer.all.map(t => t.renderCard()).join('')
  }

  handleMainClick(e) {
    if (e.target.dataset.action === "add") {
      const trainerId = e.target.dataset.trainerId
      const trainer = Trainer.findById(trainerId)
      trainer.addPokemon()
        .then(() => this.render())
        .catch(console.error)
    } else if (e.target.className === "release") {
      const pokeId = e.target.dataset.pokemonId
      const pokemon = Pokemon.findById(pokeId)
      pokemon.release()
        .then(() => this.render())
        .catch(console.error)
    }
  }
}