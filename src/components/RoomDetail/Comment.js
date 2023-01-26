import React, { Component } from 'react';

class Comment extends Component {
    render() {
        return (
            <div className='comment'>
                <h1 id='h1Comment'>Comment</h1>
                <div>
                    {
                        this.props.Review(this.props.prevListReview)
                    }
                    <button id='loadComment' onClick={this.props.handleClickShowMoreComment}>Load more comment</button>
                </div>
            </div>
        );
    }
}

export default Comment;