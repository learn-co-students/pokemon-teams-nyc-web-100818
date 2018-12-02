class DomController {
  constructor() {
    this.main = document.getElementsByTagName('main')[0]
    this.apiAdapter = new ApiAdapter
    this.main.addEventListener('click', this.releasePokemon.bind(this))
    this.main.addEventListener('click', this.addPokemon.bind(this))

  }

  appendCardsOnPage(cardArray) {
    cardArray.forEach(trainerCard => {
      document.getElementsByTagName('main')[0].appendChild(trainerCard)
    })
  }

  appendPokemons(pokeListItemsArray) {
    const allUls = Array.from(document.getElementsByTagName('ul'))
    allUls.forEach(function(ul) {
      pokeListItemsArray.forEach(function(pokeLi) {
        if (ul.dataset.id === pokeLi.dataset.id) {
          ul.appendChild(pokeLi)
        }
      })
    })
  }

  releasePokemon(event) {
    if (event.target.dataset.action === 'release') {
      let team = Trainer.all.find(trainer => parseInt(event.target.dataset.trainerId) === trainer.id)
      let pokemon = team.pokemons.find(pokemon => parseInt(event.target.dataset.id) === pokemon.id)
      let index = team.pokemons.indexOf(pokemon)
      let pokeLi = document.querySelector(`[data-name=${pokemon.nickname}]`)
      team.pokemons.splice(index, 1)
      // patch request taking in updated team.pokemons
      pokeLi.remove()
      this.apiAdapter.releasePokemon(pokemon)
    }
  }

  addPokemon(event) {
    if (event.target.dataset.action === 'create') {
      let id = parseInt(event.target.dataset.trainerId)
      let ul = Array.from(document.getElementsByTagName('ul')).find(ul => ul.dataset.id === `${id}`)
      let trainer = Trainer.all.find(trainer => trainer.id === id)
      this.apiAdapter.makePoke(id)
        .then(r=>r.json())
        .then(p => {
          console.log(p)
          trainer.pokemons.push(p)
          let li = trainer.renderSinglePoke(p)
          ul.appendChild(li)
        })
      }
    }

}
