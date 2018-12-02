class ApiAdapter {
  constructor() {
    this.trainerUrl = 'http://localhost:3000/trainers'
    this.pokemonUrl = 'http://localhost:3000/pokemons'
  }

  getTrainers() {
    return fetch(`${this.trainerUrl}`)
    .then(r => r.json())
    .then(p=> p)
  }

  getPokemon() {
    return fetch(this.pokemonUrl)
    .then(r => r.json())
  }

  releasePokemon(pokemon) {
    fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }

  makePoke(id) {
    return fetch(`http://localhost:3000/pokemons/`, {
      method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    body: JSON.stringify({
          trainer_id: id
      })
    })
  }


}
