import React, {Component} from 'react';

export class ListContainer extends Component {
    constructor() {
        super();
        this.state = {
            list: ['Tomato', 'Cucumber', 'Potato'],
            notification: 'Warning!!!'
        };
        this.addVegetable();
    }
    addVegetable() {
        setTimeout(() => {
            this.setState({
                list: [...this.state.list, 'Corn']
            })
        }, 3000);
    }
    render() {
        return (
            <>
            {this.props.children}
            <div>{this.props.message}</div>
            <h2>{this.state.notification}</h2>
            <p>Paragraph text</p>
        <ul>
        {this.state.list.map(element => (
                <li>{element}</li>
            ))}
    </ul>
        </>
    );
    }

}