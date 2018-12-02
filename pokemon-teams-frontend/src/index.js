document.addEventListener('DOMContentLoaded', init)

function init() {
  domController = new DomController
  apiAdapter = new ApiAdapter
  apiAdapter.getTrainers()
  .then(p=>{
    p.forEach(trainer => {
      new Trainer(trainer)
    })
  })
  .then (function(allcreated) {
    domController.appendCardsOnPage(Trainer.renderTrainers())
    domController.appendPokemons(Trainer.renderPokemons())
  })
}
