class Trainer {
  constructor({ id, name }) {
    this.id = id
    this.name = name
    Trainer.all.push(this)
  }

  get pokemons() {
    return Pokemon.filterByTrainerId(this.id)
  }

  addPokemon() {
    return Pokemon.adapter.post({ trainer_id: this.id })
      .then(pokemonObj => {
        new Pokemon(pokemonObj)
      })
  }

  renderPokemons() {
    return this.pokemons.map(p => p.render()).join("")
  }

  renderCard() {
    return `<div class="card" data-id="${this.id}"><p>${this.name}</p>
              <button data-action="add" data-trainer-id="${this.id}">Add Pokemon</button>
              <ul>
                ${this.renderPokemons()}
              </ul>
            </div>`
  }

  static findById(id) {
    return Trainer.all.find(t => t.id == id)
  }

  static populateFromAPI() {
    return Trainer.adapter.getAll()
      .then(json => {
        json.forEach(trainerObj => {
          new Trainer(trainerObj)
          trainerObj.pokemons.forEach(pokemonObj => {
            new Pokemon(pokemonObj)
          })
        })
      })
  }
}

Trainer.all = []
Trainer.adapter = new JSONAPIAdapter('http://localhost:3000/trainers')