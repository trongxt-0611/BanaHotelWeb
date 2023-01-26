import React, { Component } from 'react';
import "./HotelDetail.scss"

class Comment extends Component {
    render() {
        return (
            <div >
                <h1 id="cmt">Comment</h1>
                <div >
                    <p id='list'>
                    {
                        
                        this.props.Review(this.props.prevListReview)
                    }
                    </p>
                    
                    <button id='loadCmt' onClick={this.props.handleClickShowMoreComment}>Load more comment</button>
                </div>
            </div>
        );
    }
}

export default Comment;