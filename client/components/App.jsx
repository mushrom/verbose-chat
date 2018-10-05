import React from "react";
import Fetch from "react-fetch"
import VerbAPI from "../verbapi.js"

class Message extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li class="list-group-item">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <small></small>
                            <b>{this.props.message.username} </b>
                            <small>@{this.props.message.username}</small>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <small>Posted on {this.props.message.date_posted}</small>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-1"><small>&gt;&gt;</small></div>
                        <div class="col">
                            {this.props.message.content}
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

class OptionsBar extends React.PureComponent {
    render() {
        return (
            <div class="row p-2 pl-3 pr-3">
                <div class="col-xs-1">⚙ Options</div>
                <div class="col text-center">[spacer]</div>
                <div class="col-xs-2">More stuff</div>
            </div>
        );
    }
}

class ServerEntry extends React.PureComponent {
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

class ServerBar extends React.Component {
    constructor() {
        super();
        this.handle_click = this.handle_click.bind(this);

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
                this.setState({servers: json});
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
            <div class="col-12 col-md-2 p-0 m-0">
                <ul class="list-group">
                    {servs}
                </ul>
            </div>
        );
    }
}

class ChannelEntry extends React.PureComponent {
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

class ChannelBar extends React.Component {
    constructor() {
        super();
        this.handle_click = this.handle_click.bind(this);
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
                this.setState({channels: json.channels});
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
            <div class="col-12 col-md-2 p-0 m-0">
                <ul class="list-group">
                    { chans }
                </ul>
            </div>
        );
    }
}

class UsersBar extends React.PureComponent {
    render() {
        return (
            <div class="col-12 col-md-2 p-0 m-0">
                <ul class="list-group">
                    <li class="list-group-item">Admin</li>
                    <li class="list-group-item">Halfop guy</li>
                    <li class="list-group-item">Random lurker</li>
                    <li class="list-group-item">Dedicated chatter</li>
                    <li class="list-group-item">Bot</li>
                </ul>
            </div>
        )
    }
}

// requires channel and update_messages() properties
class InputBox extends React.Component {
    constructor() {
        super();
        this.state = {
            message: "",
        };
    }

    handle_submit() {
        if (this.props.channel != null) {
            VerbAPI.sendMessage(this.props.channel.messages, this.state.message)
                .then((response) => {
                    this.props.update_messages();
                });
        }

        this.setState({message: ""});
    }

    handle_textbox_update(ev) {
        this.setState({message: ev.target.value});
    }

    render() {
        return (
            <form class="bd-search" action="javascript:void(0);">
                <div class="input-group">
                    <input class="form-control" type="search"
                           value={this.state.message}
                           onChange={(ev) => { this.handle_textbox_update(ev); }}
                           placeholder="Enter some text!"></input>
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary"
                                onClick={() => { this.handle_submit(); }}>
                            Send
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

class TestComponent extends React.Component {
    render() {
        console.log(this.props)

        for (var s in this.props) {
            if (isObject(this.props[s])) {
                console.log(this.props[s]);
            }
        }

        return <div />
    }
}

class MessageDisplay extends React.Component {
    constructor() {
        super();
        this.message_footer = null,
        this.state = {
            messages: [],
            last_channel: [],
            new_messages: false,
        }
    }

    update_list() {
        return fetch(this.props.channel.messages)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({messages: json.messages});
            });
    }

    update_messages() {
        this.setState({new_messages: true,});
    }

    scroll_to_bottom() {
        this.message_footer.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
        if (this.props.channel === null) {
            return;
        }

        if (!this.state.new_messages &&
            this.props.channel == this.state.last_channel)
        {
            return;
        }

        this.setState({last_channel: this.props.channel, new_messages: false,});
        this.update_list()
            .then(() => {
                this.scroll_to_bottom();
            });
    }

    render() {
        var messages = this.state.messages.map((data, index) => {
            return <Message message={data} />
        });

        return (
            <div class="col-12 col-md-6 p-0 m-0">
                <div class="container-fluid scroll-overflow verbose-content-box">
                    <ul class="list-group">
                        { messages }
                    </ul>

                    <div style={{ float: "left", clear: "both" }}
                         ref={(el) => { this.message_footer = el; }}>
                    </div>
                </div>

                <InputBox channel={this.props.channel}
                          update_messages={() => {this.update_messages();}} />
            </div>
        );
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.update_server = this.update_server.bind(this)
        this.update_channel = this.update_channel.bind(this)

        this.state = {
            counter: 15,
            server: null,
            channel: null,
        };
    }

    handle_click() {
        console.log("got here!");
        this.setState(({counter: this.state.counter + 1}));
    }

    update_server(new_server) {
        console.log("Setting new server: " + new_server.name + "... " + new_server);
        this.setState({ server: new_server, channel: null });
    }

    update_channel(new_channel) {
        console.log("Setting new channel..." + new_channel);
        this.setState({ channel: new_channel });
    }

    render() {
        return (
            <div>
                <OptionsBar />
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
