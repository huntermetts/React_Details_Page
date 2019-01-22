const remoteURL = "http://localhost:5002"

export default {
    // Animal fetches to populate page
  getAnimal(id) {
    return fetch(`${remoteURL}/animals/${id}`).then(e => e.json())
  },
  getAllAnimals() {
    return fetch(`${remoteURL}/animals`).then(e => e.json())
  },

  // Delete module, chained to application views
  removeAndList(id){
          return fetch(`http://localhost:5002/animals/${id}`, {
              method: "DELETE"
          })
          .then(e => e.json())
          .then(() => fetch(`http://localhost:5002/animals`))
          .then(e => e.json())
  }
}