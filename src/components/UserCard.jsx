import React, {Component, Fragment} from 'react';

export class UserCard extends Component {
    constructor() {
        super();
        this.state = {
            first_name: 'George',
            last_name: 'Bluth',
            email: 'george.bluth@reqres.in',
            avatar: 'https://reqres.in/img/faces/1-image.jpg'
        }

        this.result = [];
        this.showUser();
    }

    showUser() {
        fetch(`https://reqres.in/api/users/?page=2`)
            .then(response => response.json())
            .then(response => {
                this.result = response.data;
                this.result.forEach((element, i) => {

                    this.setState({
                        first_name: `${element.first_name}`,
                        last_name: `${element.last_name}`,
                        email: `${element.email}`,
                        avatar: `${element.avatar}`
                    })
                })
            });
    }

    render() {
        return (
            <Fragment>
                {this.result.map(element => (
                <div className={"user-card-component"} key={`element-${element}`}>
                    <div className={"image-block"}>
                        <img src={element.avatar}/>
                    </div>
                    <div className={"card-content"}>
                        <h3>Email:</h3>
                        <p className="user-email">{element.email}</p>
                        <h3>First name:</h3>
                        <p className="user-first-name">{element.first_name}</p>
                        <h3>Last name:</h3>
                        <p className="user-last-name">{element.last_name}</p>
                    </div>
                </div>
                    ))}
            </Fragment>
        )
    }
}