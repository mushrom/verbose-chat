import React from "react"
import ChannelEntry from "./ChannelEntry.jsx"

export default class ChannelBar extends React.Component {
    constructor() {
        super();
        this.handle_click = this.handle_click.bind(this);
        this.next_list = null;
        this.state = {
            channels: [],
            last_server: [],
        };
    }

    update_list() {
        return fetch(this.props.server.channels)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({channels: json.results});
                this.next_list = json.next;
            });
    }

    componentDidUpdate() {
        if (this.props.server === null) {
            return;
        }

        if (this.props.server != this.state.last_server) {
            this.setState({ last_server: this.props.server });
            this.update_list()
                // XXX: needed to set up the initial state when first loaded,
                //      there's probably a better way to do this...
                .then(() => {
                    if (this.state.channels.length <= 0) {
                        return;
                    }

                    if (this.props.channel === null) {
                        this.handle_click(this.state.channels[0]);
                    }
                });
        }
    }

    handle_click(channel) {
        console.log("channel handle click...");
        this.props.update_channel(channel);
    }

    render() {
        var chans = this.state.channels.map((data, index) => {
            return (
                <ChannelEntry channel={data} onClick={this.handle_click} />
            )
        });

        return (
            <div class="col p-0 m-0">
                <ul class="list-group">
                    { chans }
                </ul>

                <button class="btn btn-block btn-outline-secondary">
                    +
                </button>
            </div>
        );
    }
}
