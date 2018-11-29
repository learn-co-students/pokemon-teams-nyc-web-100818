const trainerAdapter = new Adapter('http://localhost:3000/trainers')
const pokemonAdapter = new Adapter('http://localhost:3000/pokemons')
const getMain = () => document.getElementsByTagName('main')[0]

document.addEventListener('DOMContentLoaded', () => {
  loadTrainers()
})

function loadTrainers() {
  trainerAdapter.getAll().then(res => {
    const main = getMain()
    main.innerHTML = ''
    res.forEach((trainer) => {
      newTrainer = new Trainer(trainer)
      main.innerHTML += newTrainer.renderHTML()
    })
    bindReleaseBtns()
    bindAddBtns()
  })
}

function bindReleaseBtns() {
  const buttons = Array.from(document.getElementsByClassName('release'))
  buttons.forEach((button) => {
    button.addEventListener('click', clickRelease)
  })
}

function clickRelease(event) {
  pokeID = parseInt(event.target.dataset.pokemonId)
  pokemonAdapter.deleteOne(pokeID)
  event.target.parentNode.remove(event.target)
}

function bindAddBtns() {
  const buttons = Array.from(document.getElementsByClassName('add-pokemon'))
  buttons.forEach((button) => {
    button.addEventListener('click', clickAdd)
  })
}

function clickAdd(event) {
  trainerID = event.target.dataset.trainerId
  trainer = allTrainers.find(t => t.id == trainerID)
  pokemonAdapter.create(trainerID)
  .then(res => {
    loadTrainers()
  })
}
