import React from "react"

export default class ChannelEntry extends React.PureComponent {
    constructor() {
        super();
        this.handle_click = this.handle_click.bind(this);
    }

    handle_click() {
        this.props.onClick(this.props.channel);
    }

    render() {
        return (
            <li onClick={this.handle_click} class="list-group-item">
                {this.props.channel.name}
            </li>
        );
    }
}
