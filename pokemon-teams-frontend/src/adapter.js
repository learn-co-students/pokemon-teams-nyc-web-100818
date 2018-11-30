class JSONAPIAdapter {
  constructor(baseURI) {
    this.baseURI = baseURI
    this.defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  getAll() {
    return this._send(this.baseURI, { 
      method: 'GET' 
    })
  }

  post(data) {
    return this._send(this.baseURI, { 
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(data)
    })
  }

  delete(id) {
    return this._send(`${this.baseURI}/${id}`, {
      method: 'DELETE'
    })
  }

  _send(endpoint, options) {
    return fetch(endpoint, options)
      .then(r => {
        if (r.ok) {
          return r.json()
        } else {
          throw r
        }
      })
  }
}