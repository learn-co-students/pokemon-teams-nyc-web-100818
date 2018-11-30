
const trainerObserver = {
  set: () => {
    console.log("trainer array change");
    renderAllTrainers()
  }
}

const trainerPokemonObserver = {
  set: () => {
    console.log("trainer's pokemon array change");
    reRenderPokemon()
  }
}



const trainerStore = { trainerz: []};
const trainerProxy = new Proxy(trainerStore, trainerObserver)
const trainerProxy2 = new Proxy(trainerStore, trainerPokemonObserver)

class Trainer {
  constructor(trainer) {
    this.id = trainer.id;
    this.name = trainer.name;
    this.pokemons = trainer.pokemons;
    trainerStore.trainerz.push(this);
  };
};
