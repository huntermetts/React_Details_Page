const remoteURL = "http://localhost:5002"

export default {
    //   Employee fetches
    getEmployee(id){
        return fetch(`${remoteURL}/employees/${id}`).then(e => e.json())
    },
    getAllEmployees() {
        return fetch(`${remoteURL}/employees`).then(e => e.json())
    },
    removeAndList(id){
        return fetch(`http://localhost:5002/employees/${id}`, {
            method: "DELETE"
        })
        .then(e => e.json())
        .then(() => fetch(`http://localhost:5002/employees`))
        .then(e => e.json())
},

post(newEmployee) {
    return fetch(`${remoteURL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEmployee)
    }).then(data => data.json())
  }
}