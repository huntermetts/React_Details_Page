import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import AnimalList from './animals/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnersList from './owners/OwnersList'
import AnimalManager from "../modules/AnimalManager"
import EmployeeManager from "../modules/EmployeeManager"
import OwnerManager from '../modules/OwnerManager';
import LocationManager from '../modules/LocationManager';
import AnimalDetail from './animals/AnimalDetail'
import EmployeeDetail from './employee/EmployeeDetail'
import OwnerDetail from './owners/OwnerDetail'
import AnimalForm from './animals/AnimalForm'
import Login from './authentication/Login'
import EmployeeForm from './employee/EmployeeForm'
import OwnerForm from './owners/OwnerForm'




export default class ApplicationViews extends Component {
    state = {
        animals: [],
        employees: [],
        locations:[],
        owners:[]
    }

    // Check if credentials are in local storage
    isAuthenticated = () => sessionStorage.getItem("credentials") !== null

    // Fetch to change state above:
    componentDidMount() {
            // Chaining fetch methods from AnimalManager
            AnimalManager.getAllAnimals().then(allAnimals => {
                this.setState({
                    animals: allAnimals
                })
            })

            EmployeeManager.getAllEmployees().then(allEmployees => {
                this.setState({
                    employees: allEmployees
                })
            })

            LocationManager.getAllLocations().then(allLocations => {
                this.setState({
                    locations:allLocations
                })
            })

            OwnerManager.getAllOwners().then(allOwners => {
                this.setState({
                    owners:allOwners
                })
            })
    }


    // Delete animal (uses module in AmimalManager)
    deleteAnimal = (id) => {
        return AnimalManager.removeAndList(id)
        .then(animals => this.setState({
            animals: animals
          })
        )
      }

    // Delete employee (uses module in EmployeeManager)
    deleteEmployee = (id) => {
        return EmployeeManager.removeAndList(id)
        .then(employees => this.setState({
            employees: employees
          })
        )
      }

    deleteOwner = (id) => {
        return OwnerManager.removeAndList(id)
        .then(owners => this.setState({
            owners: owners
          })
        )
      }



    //   Add animal
    addAnimal = (animal) => AnimalManager.post(animal)
  .then(() => AnimalManager.getAll())
  .then(animals => this.setState({
      animals: animals
    })
  )
//   Add Employee:
addEmployee = (employee) => EmployeeManager.post(employee)
  .then(() => EmployeeManager.getAllEmployees())
  .then(employees => this.setState({
      employees: employees
    })
  )

//   Add owner:
addOwner = (owner) => OwnerManager.post(owner)
  .then(() => OwnerManager.getAllOwners())
  .then(owners => this.setState({
      owners: owners
    })
  )





    // Rendering to DOM
    render() {
        return (
            <React.Fragment>

                {/* Login Route */}
                <Route path="/login" component={Login} />

                <Route exact path="/" render={(props) => {
                    if (this.isAuthenticated()) {
                    return <LocationList locations={this.state.locations} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />



                <Route exact path="/owners" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <OwnersList {...props}
                        deleteOwner={this.deleteOwner}
                       owners={this.state.owners}/>
                    } else {
                        return <Redirect to="/login" />
                    }
                    }} />
                     <Route path="/owners/:ownerId(\d+)" render={(props) => {
                        return <OwnerDetail {...props} deleteOwner={this.deleteOwner} owners={this.state.owners} />
                   }} />

                   <Route path="/owners/new" render={(props) => {
                    return <OwnerForm {...props}
                       addOwner={this.addOwner}
                       owners={this.state.owners} />
                   }} />




                    {/* Implementation of fake authentication */}
                   <Route exact path="/employees" render={props => {
                        if (this.isAuthenticated()) {
                            return <EmployeeList {...props}
                            deleteEmployee={this.deleteEmployee}
                            employees={this.state.employees} />

                        } else {
                        return <Redirect to="/login" />
                        }
                    }} />

                    <Route path="/employees/:employeeId(\d+)" render={(props) => {
                        return <EmployeeDetail {...props} deleteEmployee={this.deleteEmployee} employees={this.state.employees} />
                   }} />

                   {/* NEW EMPLOYEE PAGE BELOW*/}
                   <Route path="/employees/new" render={(props) => {
                    return <EmployeeForm {...props}
                       addEmployee={this.addEmployee} />
                    }} />




                <Route exact path="/animals" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <AnimalList {...props}
                       deleteAnimal={this.deleteAnimal}
                       animals={this.state.animals} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/animals/:animalId(\d+)" render={(props) => {
                     return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
                }} />

                {/* // Our shiny new route. We pass employees to the AnimalForm so a dropdown can be populated */}

                <Route path="/animals/new" render={(props) => {
                return <AnimalForm {...props}
                       addAnimal={this.addAnimal}
                       employees={this.state.employees} />
                }} />
            </React.Fragment>
        )
    }
}