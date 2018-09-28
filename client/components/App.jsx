import React from "react";
import Fetch from "react-fetch"

class Message extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li class="list-group-item">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-2"><b>{this.props.message.username}</b></div>
                        <div class="col">
                            <small>Posted on {this.props.message.date_posted}</small>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-2"><small>&gt;&gt;</small></div>
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
        fetch("/api/servers")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({servers: json});
            });
    }

    componentDidMount() {
        console.log("Got here, ServerBar.componentDidMount()");
        this.update_list();
    }

    handle_click(server) {
        console.log("Also got here...");
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
        fetch(this.props.server.channels)
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
            this.update_list();
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

class InputBox extends React.Component {
    render() {
        return (
            <form class="bd-search">
                <input class="form-control" type="search"
                       placeholder="Enter some text!"></input>
                <button class="btn d-md-none">Submit</button>
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
        this.state = {
            messages: [],
            last_channel: [],
        }
    }

    render_messages() {
        var ret = [];

        for (var i = 15; i != 0; i--) {
            ret = ret.concat([
                <Message author="John Doe" date="Tuesday"
                         text={"Testing this, testing more stuff, asdf: " + i} />
            ]);
        }

        return ret;
    }

    update_list() {
        fetch(this.props.channel.messages)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({messages: json.messages});
            });
    }

    componentDidUpdate() {
        if (this.props.channel === null) {
            return;
        }

        if (this.props.channel != this.state.last_channel) {
            this.setState({ last_channel: this.props.channel });
            this.update_list();
        }
    }

    render () {
        var messages = this.state.messages.map((data, index) => {
            return <Message message={data} />
        });

        return (
            <div class="col-12 col-md-6 p-0 m-0">
                <div class="container-fluid scroll-overflow verbose-content-box">
                    <ul class="list-group">
                        { messages }
                    </ul>
                </div>

                <InputBox />
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
                    <ServerBar update_server={this.update_server} />
                    <ChannelBar server={this.state.server}
                                update_channel={this.update_channel} />
                    <MessageDisplay channel={this.state.channel} />
                    <UsersBar />
                </div>
            </div>
        );
    }
}
