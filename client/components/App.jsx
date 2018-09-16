import React from "react";

class FooBar extends React.PureComponent {
    render() {
        return (
            <div> {this.props.text} </div>
        );
    }
}

class Column extends React.PureComponent {
    render() {
        return (
            <div class="col-md-4">
                <h2>{this.props.title}</h2>
                {this.props.text}
            </div>
        );
    }
}

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div class="jumbotron">
                    <h1 class="display-3">
                        <FooBar text="Hello, world!" />
                    </h1>

                    <p class="lead">
                        <FooBar text="testing this..." />
                    </p>

                    <a class="btn btn-primary btn-lg"
                       href="#" role="button">
                        Learn more
                    </a>
                </div>

                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <h2>Testing this</h2>
                            Testing this thing here,
                            this is a test of bootstrap
                            in order to see how it
                            works.
                        </div>

                        <div class="col-md-4">
                            <h2>Seems bretty gud</h2>
                            So far it seems pretty
                            straight-forward and easy to
                            use with react
                        </div>

                        <div class="col-md-4">
                            <h2>thumbs skyward</h2>
                            And hopefully it's smooth
                            sailing from here to working
                            on verbose.chat
                        </div>
                    </div>
                </div>

                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <h2>Testing this</h2>
                            Testing this thing here,
                            this is a test of bootstrap
                            in order to see how it
                            works.
                        </div>

                        <div class="col-md-4">
                            <h2>Seems bretty gud</h2>
                            So far it seems pretty
                            straight-forward and easy to
                            use with react
                        </div>

                        <div class="col-md-4">
                            <h2>thumbs skyward</h2>
                            And hopefully it's smooth
                            sailing from here to working
                            on verbose.chat
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
