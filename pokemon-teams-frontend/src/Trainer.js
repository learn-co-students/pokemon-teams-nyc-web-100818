class Trainer {
  constructor(trainer) {
    this.id = trainer.id
    this.name = trainer.name
    this.pokemons = trainer.pokemons
    allTrainers.push(this)
  }

  buildTeam() {
    this.pokemons.forEach(pokemon => {
      const newPoke = new Pokemon(pokemon)
      return newPoke
    })
  }

  renderHTML() {
    let html = `<div class='card' data-id='${this.id}'><p>${this.name}</p>
      <button data-trainer-id="${this.id}" class="add-pokemon">Add Pokemon</button>
      <ul>`;
    this.pokemons.forEach((pokemon) => {
      html += `<li>${pokemon.nickname} the ${pokemon.species}
      <button class="release" data-pokemon-id="${pokemon.id}" data-trainer-id="${this.id}">Release</button></li>`
    });
    html += `</ul></div>`;
    return html
  }

}

allTrainers = []
