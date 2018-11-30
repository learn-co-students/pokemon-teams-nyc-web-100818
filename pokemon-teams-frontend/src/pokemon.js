class Pokemon {
  constructor({ id, nickname, species, trainer_id }) {
    this.id = id
    this.nickname = nickname
    this.species = species
    this.trainer_id = trainer_id
    Pokemon.all.push(this)
  }

  render() {
    return `<li>${this.nickname} (${this.species}) <button class="release" data-pokemon-id="${this.id}">Release</button></li>`
  }

  release() {
    // remove local
    Pokemon.remove(this.id)
    
    // remove from API
    return Pokemon.adapter.delete(this.id)
  }

  static remove(id) {
    Pokemon.all = Pokemon.all.filter(p => p.id != id)
  }

  static findById(id) {
    return Pokemon.all.find(t => t.id == id)
  }

  static filterByTrainerId(trainerId) {
    return Pokemon.all.filter(pokemon => pokemon.trainer_id == trainerId)
  }
}

Pokemon.all = []
Pokemon.adapter = new JSONAPIAdapter('http://localhost:3000/pokemons')