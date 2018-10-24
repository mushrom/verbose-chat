import React from "react"

import InputBox from "./InputBox.jsx"
import Message from "./Message.jsx"

export default class MessageDisplay extends React.Component {
    constructor() {
        super();
        this.message_footer = null;
        this.cur_list = null;
        this.prev_list = null;
        this.state = {
            messages: [],
            last_channel: [],
            new_messages: false,
        }
    }

    get_count() {
        return fetch(this.props.channel.messages + "?limit=1")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                return json.count;
            })
    }

    update_to_end() {
        return this.get_count()
            .then((count) => {
                console.log("count: " + count);
                var limit  = 20;
                var offset = (count > limit)? count - limit : 0;

                this.cur_list = this.props.channel.messages +
                                    "?limit=" + limit +
                                    "&offset=" + offset;

                return this.cur_list;
            })
            .then((cur) => {
                console.log("Getting messages at " + cur);

                return fetch(cur)
                    .then((response) => {
                        return response.json();
                    })
                    .then((json) => {
                        this.prev_list = json.previous;
                        this.setState({messages: json.results});
                    });
            });
    }

    update_previous() {
        console.log("loading new messages...");
        if (this.prev_list === null) {
            // no messages left to load
            return;
        }

        return fetch(this.prev_list)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                console.log("Got new messages, previous: " + json.previous);
                this.prev_list = json.previous;

                this.setState({
                    messages: json.results.concat(this.state.messages),
                });
            })
    }

    update_list() {
        /* TODO: save timestamp of last message and update from there */
        return fetch(this.props.channel.messages + "?limit=1")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.prev_list = json.previous;
                this.setState({messages: json.results});
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

        console.log("Doing post-update...");
        this.setState({last_channel: this.props.channel, new_messages: false,});
        //this.update_list()
        this.update_to_end()
            .then(() => {
                this.scroll_to_bottom();
            });
    }

    render() {
        var messages = this.state.messages.map((data, index) => {
            return <Message message={data} />
        });

        var loader = (this.prev_list === null)
            ? (<div></div>)
            : (<button type="button"
                       class="btn btn-outline-success btn-block"
                       onClick={() => { this.update_previous(); }} >
                   Load more...
               </button>);

        return (
            <div class="col p-0 m-0">
                <div class="container-fluid scroll-overflow verbose-content-box">
                    { loader }

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
