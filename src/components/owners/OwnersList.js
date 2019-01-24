import React, { Component } from 'react'
import worker from "./Worker.png"
import "./Owner.css"
import { Link } from "react-router-dom";

export default class OwnersList extends Component {
    render () {
        return (

            <React.Fragment>
            <div className="ownerButton">
                <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/owners/new")}
                        }>
                    Add an owner
                </button>
            </div>


            <section className="owners">
            {
                this.props.owners.map(owner =>
                    <div key={owner.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                <img src={worker} className="icon--worker" />
                                {owner.name}

                                 {/* Dynamic URL */}
                                 <Link className="nav-link" to={`/owners/${owner.id}`}>
                                Details</Link>

                                <a href="#"
                                    onClick={() => this.props.deleteOwner(owner.id)}
                                    className="card-link">Delete</a>
                            </h5>
                        </div>
                    </div>
                )
            }
            </section>
            </React.Fragment>
        )
    }
}