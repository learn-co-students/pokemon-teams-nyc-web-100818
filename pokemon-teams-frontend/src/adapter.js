
class JSONAdapter {
  constructor(endpoint){
    this.endpoint = endpoint
    this.headers = {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  }//End Constructor

  getAll(callback) {
    return fetch(this.endpoint)
      .then(function(response){
        return response.json()
      })
      .then(function(data) {
        callback(data)
      })
  }

  getSingle(id, callback){
    return fetch(`${this.endpoint}/${id}`)
      .then(response=>response.json())
      .then(data => callback(data))
  }

  updateSingle(body, id){
   return fetch(`${this.endpoint}/${id}`, {
     method: 'PUT',
     headers: this.headers,
     body: JSON.stringify(body)
   })
 }

  createSingle(body){
    return fetch(`${this.endpoint}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body)
    })
  }


  deleteSingle(id){
    return fetch(`${this.endpoint}/${id}`, {
      method: "DELETE",
      headers: this.headers
    })
  }

}//End Class JSONAdapter
