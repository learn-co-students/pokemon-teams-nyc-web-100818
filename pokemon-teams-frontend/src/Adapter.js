class Adapter {
  constructor(url) {
    this.url = url
  }

  getAll() {
    return fetch(`${this.url}`).then(res => res.json())
  }

  getOne(id) {
    return fetch(`${this.url}/${this.id}`).then(res => res.json())
  }

  create(trainerID) {
    return fetch(`${this.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({trainer_id: trainerID})
    })
    .then(res => res.json())
  }

  deleteOne(id) {
    return fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json())
  }
}
