import React, { Component } from 'react';


class NameRoom extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.room.nameRoom}</h2>
                <p id='star'>{this.props.displayStar(this.props.star)}</p>
                <p id="des">{this.props.room.description}</p>
            </div>
        );
    }
}

export default NameRoom;