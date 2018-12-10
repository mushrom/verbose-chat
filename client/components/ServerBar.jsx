import React from "react"
import ServerEntry from "./ServerEntry.jsx"

export default class ServerBar extends React.Component {
    constructor() {
        super();
        this.handle_click = this.handle_click.bind(this);
        this.next_list = null;

        this.state = {
            servers: [],
        };
    }

    update_list() {
        return fetch("/api/servers")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({servers: json.results});
                this.next_list = json.next;
                console.log("next server list: " + this.next_list);
            });
    }

    componentDidMount() {
        this.update_list()
            // XXX: needed to set up the initial state when first loaded,
            //      there's probably a better way to do this...
            .then(() => {
                if (this.state.servers.length <= 0) {
                    return;
                }

                if (this.props.server === null) {
                    this.handle_click(this.state.servers[0]);
                }
            });
    }

    handle_click(server) {
        this.props.update_server(server)
    }

    render() {
        var servs = this.state.servers.map((data, index) => {
            return (
                <ServerEntry server={data} onClick={this.handle_click} />
            );
        });

        return (
            <div class="col p-0 m-0">
                <ul class="list-group">
                    {servs}
                </ul>
            </div>
        );
    }
}
