import React, { Component } from 'react'
import avatar from "./Avatar.png"
import "./Employee.css"
import { Link } from "react-router-dom";

export default class EmployeesList extends Component {
    render () {
        return (
            <section className="employees">
            {
                this.props.employees.map(employee =>
                    <div key={employee.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <img src={avatar} className="icon--avatar" />
                                {employee.name}

                             <Link className="nav-link" to={`/employees/${employee.id}`}>
                                        Details</Link>


                                <a href="#"
                                    onClick={() => this.props.deleteEmployee(employee.id)}
                                    className="card-link">Delete</a>
                            </h5>
                        </div>
                    </div>
                )
            }
            </section>
        )
    }
}