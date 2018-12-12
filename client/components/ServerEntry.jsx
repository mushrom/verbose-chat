import React from "react"

// Properties:
//   - server   : a server object, passed from ServerBar
//   - selected : optional property specifying that this entry is the currently
//                selected one
//   - onClick  : callback to handle clicking a server entry
export default class ServerEntry extends React.PureComponent {
    constructor() {
        super();
        this.handle_click = this.handle_click.bind(this);
    }

    handle_click() {
        console.log("got here...");
        this.props.onClick(this.props.server);
    }

    render() {
        console.log(this.props.server);

        return (
            <li onClick={this.handle_click} class="list-group-item">
                {this.props.server.name + (this.props.selected? "*" : "")}
            </li>
        );
    }
}
