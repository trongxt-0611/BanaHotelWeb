import React, { Component } from 'react';


class Name extends Component {
    render() {
        return (
            <div>
                
                <h2>{this.props.hotel.nameHotel}</h2>
                <p id="star">{this.props.displayStar(this.props.star)}</p>
                <p id="des">{this.props.hotel.description}</p>
            </div>
        );
    }
}

export default Name;