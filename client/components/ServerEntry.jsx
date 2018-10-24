import React from "react"

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
                {this.props.server.name}
            </li>
        );
    }
}
