import React from "react"

function newer_than_a_day(adate) {
    const one_day = 1000 * 60 * 60 * 24;
    return Date.now() - adate.getTime() < one_day;
}

export default class Message extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const date = new Date(this.props.message.date_posted);
        const fmt = newer_than_a_day(date)
                        ? date.toLocaleTimeString()
                        : date.toLocaleDateString();

        return (
            <li class="list-group-item">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col">
                            <b>{this.props.message.username} </b>
                            <small>@{this.props.message.username}</small>
                            <small class="float-right">{fmt}</small>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            {this.props.message.content}
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}
