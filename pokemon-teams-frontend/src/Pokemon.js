class Pokemon {
  constructor(pokemon) {
    this.id = pokemon.id
    this.nickname = pokemon.nickname
    this.species = pokemon.species
    this.trainer_id = pokemon.trainer_id
    allPokemon.push(this)
  }

}

allPokemon = []
