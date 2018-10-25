import React from "react";
import Fetch from "react-fetch"
import VerbAPI from "../verbapi.js"

import OptionsBar from "./OptionsBar.jsx"
import ServerBar from "./ServerBar.jsx"
import ChannelBar from "./ChannelBar.jsx"
import UsersBar from "./UsersBar.jsx"
import MessageDisplay from "./MessageDisplay.jsx"

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.update_server = this.update_server.bind(this)
        this.update_channel = this.update_channel.bind(this)

        this.websock = new WebSocket("ws://" + window.location.host + "/ws/chat/");
        this.websock.onmessage = (e) => { this.handle_ws_message(e); };
        this.websock.onclose = (e) => { this.handle_ws_disconnect(e); };

        this.state = {
            counter: 15,
            server: null,
            channel: null,
        };
    }

    handle_ws_message(e) {
        var data = JSON.parse(e.data);
        var message = data["testing"];

        console.log("ws: received " + message);
    }

    handle_ws_disconnect(e) {
        console.error("Websocket closed unexpectedly...");
    }

    handle_click() {
        console.log("got here!");
        this.setState(({counter: this.state.counter + 1}));
    }

    update_server(new_server) {
        console.log("Setting new server: " + new_server.name + "... " + new_server);
        this.setState({ server: new_server, channel: null });
        this.websock.send(JSON.stringify({
            "type": "server-switch",
            "data": new_server.id,
        }));
    }

    update_channel(new_channel) {
        console.log("Setting new channel..." + new_channel);
        this.setState({ channel: new_channel });
        this.websock.send(JSON.stringify({
            "type": "channel-switch",
            "data": new_channel.id,
        }));
    }

    render() {
        return (
            <div>
                <OptionsBar channel={this.state.channel} />
                <div class="row">
                    <ServerBar server={this.state.server}
                               update_server={this.update_server} />
                    <ChannelBar server={this.state.server}
                                channel={this.state.channel}
                                update_channel={this.update_channel} />
                    <MessageDisplay channel={this.state.channel} />
                    <UsersBar />
                </div>
            </div>
        );
    }
}
