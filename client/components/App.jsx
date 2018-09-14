import React from "react";

class FooBar extends React.PureComponent {
    render() {
        return (
            <div style={{textAlign: "center"}}>
                {this.props.text}
            </div>
        )
    }
}

export default class App extends React.Component {
    render() {
        return (
            <div>
                <FooBar text="Hello, world!" />
                <br />
                <FooBar text="testing this..." />
            </div>
        );
    }
}
