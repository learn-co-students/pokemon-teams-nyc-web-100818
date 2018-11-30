
const pokemonObserver = {
  set: () => {
    console.log("pokemon array change");
  }
}

const pokeStore = { pokemonz: []};
const pokemonProxy = new Proxy(pokeStore, pokemonObserver)

class Pokemon {
  constructor(pokemon) {
    this.id = pokemon.id;
    this.nickname = pokemon.nickname;
    this.species = pokemon.species;
    this.trainerId = pokemon.trainer_id;
    pokeStore.pokemonz.push(this);
  };
};
