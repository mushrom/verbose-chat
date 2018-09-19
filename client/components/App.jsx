import React from "react";

class Message extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li class="list-group-item" onClick={this.props.onClick}>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-2"><b>{this.props.author}</b></div>
                        <div class="col">
                            <small>Posted on {this.props.date}</small>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-2"><small>&gt;&gt;</small></div>
                        <div class="col">
                            {this.props.text}
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

class Sidebar extends React.PureComponent {
    render() {
        return (
            <div class="col-12 col-md-2 p-0 m-0">
                <ul class="list-group">
                    <li class="list-group-item">#channel</li>
                    <li class="list-group-item">#programming</li>
                    <li class="list-group-item">#longer-channel-name-ok</li>
                    <li class="list-group-item">#thumbs-skyward</li>
                </ul>
            </div>
        );
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

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 15,
        }
    }

    handle_click() {
        console.log("got here!");
        this.setState(({counter: this.state.counter + 1}));
    }

    render_messages() {
        var ret = [];

        for (var i = this.state.counter; i != 0; i--) {
            ret = ret.concat([
                <Message author="John Doe" date="Tuesday"
                         onClick={() => this.handle_click()}
                         text={"Testing this, testing more stuff, asdf: " + i} />
            ]);
        }

        return ret;
    }

    render() {
        return (
            <div class="row">
                <Sidebar />

                <div class="col-12 col-md-10 p-0 m-0">
                    <div class="container-fluid scroll-overflow verbose-content-box">
                        <ul class="list-group">
                            {this.render_messages()}
                        </ul>
                    </div>

                    <InputBox />
                </div>
            </div>
        );
    }
}
