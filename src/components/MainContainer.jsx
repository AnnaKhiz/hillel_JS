import React, {Component, Fragment} from 'react';

export class MainContainer extends Component {
    constructor() {
        super();
        this.state = {
            notification: 'User list'
        };
    }

    render() {
        return (
            <Fragment>
                <div className={"container"}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}