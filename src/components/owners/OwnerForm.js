import React, { Component } from "react"
import "./Owner.css"

export default class EmployeeForm extends Component {
    // Set initial state
    state = {
        ownerName: "",
        skill: "",
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    /*
        Local method for validation, creating animal object, and
        invoking the function reference passed from parent component
     */
    constructNewOwner = evt => {
        evt.preventDefault()
            const owner = {
                name: this.state.ownerName,
                skill: this.state.skill,
            }


            this.props.addOwner(owner).then(() => this.props.history.push("/owners"))

    }

    render() {
        return (
            <React.Fragment>
                <form className="OwnerForm">
                    <div className="form-group">
                        <label htmlFor="ownerName">Owner name</label>
                        <input type="text" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="ownerName"
                               placeholder="Owner name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="skill">Skill</label>
                        <input type="text" required
                               className="form-control"
                               onChange={this.handleFieldChange}
                               id="skill" placeholder="Skill" />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="employee">Assign to caretaker</label>
                        <select defaultValue="" name="employee" id="employee"
                                onChange={this.handleFieldChange}>
                            <option value="">Select an employee</option>
                        {
                            this.props.employees.map(e => <option key={e.id} id={e.id}>{e.name}</option>)
                        }
                        </select>
                    </div> */}
                    <button type="submit" onClick={this.constructNewOwner} className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>
        )
    }
}