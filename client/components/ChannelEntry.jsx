import React from "react"

// Properties:
//   - channel  : Channel object passed from ChannelBar
//   - selected : optional property specifying this is the currently selected
//                entry
//   - onClick  : callback to handle clicking a server entry
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
                {this.props.channel.name + (this.props.selected? "*" : "")}
            </li>
        );
    }
}
