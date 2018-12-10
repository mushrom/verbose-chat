import React from "react";
import Fetch from "react-fetch"

import OptionsBar from "./OptionsBar.jsx"
import ServerBar from "./ServerBar.jsx"
import ChannelBar from "./ChannelBar.jsx"
import UsersBar from "./UsersBar.jsx"
import MessageDisplay from "./MessageDisplay.jsx"
import TabBox from "./TabBox.jsx"

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.update_server = this.update_server.bind(this)
        this.update_channel = this.update_channel.bind(this)

        this.websock = new WebSocket("ws://" + window.location.host + "/ws/chat/");
        this.websock.onmessage = (e) => { this.handle_ws_message(e); };
        this.websock.onclose = (e) => { this.handle_ws_disconnect(e); };

        this.state = {
            server: null,
            channel: null,
            // TODO: seriously look into using something like redux to manage
            //       state, this is turning into spaghetti...
            new_messages: [],
        };
    }

    handle_ws_message(e) {
        var message = JSON.parse(e.data);
        console.log("ws: received raw " + e.data);

        if (message["type"] == "message") {
            console.log("Adding new message...");
            this.setState({ new_messages: this.state.new_messages.concat([message.data]) });
        }
    }

    handle_ws_disconnect(e) {
        console.error("Websocket closed unexpectedly...");
    }

    handle_send_message(msg) {
        this.websock.send(JSON.stringify({
            "type": "message",
            "data": {
                "content": msg,
            },
        }));
    }

    update_server(new_server) {
        console.log("Setting new server: " + new_server.name + "... " + new_server);
        this.setState({ server: new_server, channel: null, new_messages: [], });
        this.websock.send(JSON.stringify({
            "type": "server-switch",
            "data": new_server.id,
        }));
    }

    update_channel(new_channel) {
        console.log("Setting new channel..." + new_channel);
        this.setState({ channel: new_channel, new_messages: [], });
        this.websock.send(JSON.stringify({
            "type": "channel-switch",
            "data": new_channel.id,
        }));
    }

    render() {
        var servers = (<ServerBar server={this.state.server}
                           update_server={this.update_server} />);

        var channels = (<ChannelBar server={this.state.server}
                                    channel={this.state.channel}
                                    update_channel={this.update_channel} />);

        var messages = (<MessageDisplay channel={this.state.channel}
                                        new_messages={this.state.new_messages}
                                        send_message={(m) => { this.handle_send_message(m); }} />);

        var users = (<UsersBar />);

        return (
            <div>
                <div class="d-none d-lg-block">
                    <OptionsBar channel={this.state.channel} />

                    <div class="row">
                        <div class="col-2">
                            {servers}
                        </div>
                        <div class="col-2">
                            {channels}
                        </div>
                        {messages}
                        {users}
                    </div>
                </div>

                <div class="d-none d-md-block d-lg-none">
                    <OptionsBar channel={this.state.channel} />

                    <div class="row">
                        <div class="col-2">
                            <div class="row">
                                <TabBox tabs={[
                                    { name: "Server", content: servers },
                                    { name: "Channel", content: channels, selected: true },
                                ]} />
                            </div>
                        </div>
                        {messages}
                        {users}
                    </div>
                </div>

                <div class="d-md-none m-0">
                    <TabBox tabs={[
                        { name: "Servers", content: servers },
                        { name: "Channels", content: channels },
                        { name: "Messages", content: messages, selected: true },
                        { name: "Users", content: users },
                    ]} />
                </div>
            </div>
        );
    }
}
