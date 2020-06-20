import React, { Component } from 'react';

export default class TagSidebarElementElement extends Component {
    render() {
        return (
            <li>
                <a href={`/search?query=${this.props.tag}`}>{this.props.tag}</a><a onClick={() => this.props.onTagDelete(this.props.tag)} href="#"> x</a>
            </li>
        )
    }
}