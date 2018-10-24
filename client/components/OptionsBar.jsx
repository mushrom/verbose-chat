import React from "react"

export default class OptionsBar extends React.PureComponent {
    render() {
        var topic = (this.props.channel === null)?
                    "[topic]"
                    : this.props.channel.name + " : " + this.props.channel.topic;

        return (
            <div class="row p-2 pl-3 pr-3">
                <div class="col-xs-1">⚙ Options</div>
                <div class="col text-center">{topic}</div>
                <div class="col-xs-2">More stuff</div>
            </div>
        );
    }
}
