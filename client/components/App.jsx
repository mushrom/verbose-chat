import React from "react";

class FooBar extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div onClick={this.props.onClick}> {this.props.text} </div>
        );
    }
}

class Sidebar extends React.PureComponent {
    render() {
        return (
            <div class="col-12 col-md-2">
                <ul>
                    <li>#channel</li>
                    <li>#programming</li>
                    <li>#longer-channel-name-ok</li>
                    <li>#thumbs-skyward</li>
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
            counter: 1,
        }
    }

    handle_click() {
        console.log("got here!");
        //this.state.counter++;
        this.setState(({counter: this.state.counter + 1}));
    }

    render_foobar(text) {
        return <FooBar text={text} onClick={() => this.handle_click()} />
    }

    render_leads() {
        var ret = [];

        for (var i = this.state.counter; i != 0; i--) {
            ret = ret.concat([
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-2"><b>John Doe</b></div>
                        <div class="col">
                            <small>Posted on Tue Sep 18 08:15:34 UTC 2018</small>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-2"><small>&gt;&gt;</small></div>
                        <div class="col">
                            {this.render_foobar("Testing this: " + this.state.counter)}
                        </div>
                    </div>
                </div>
            ]);
        }

        return ret;
    }

    render() {
        return (
            <div class="row">
                <Sidebar />

                <div class="col-12 col-md-10">
                    <div class="container-fluid scroll-overflow verbose-content-box">
                        {this.render_leads()}
                    </div>

                    <InputBox />
                </div>
            </div>
        );
    }
}
