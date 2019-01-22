const remoteURL = "http://localhost:5002"

export default {
    //   Employee fetches
    getLocation(id){
        return fetch(`${remoteURL}/locations/${id}`).then(e => e.json())
    },
    getAllLocations() {
        return fetch(`${remoteURL}/locations`).then(e => e.json())
    }
}