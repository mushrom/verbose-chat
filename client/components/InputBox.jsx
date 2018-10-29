import React from "react"
import VerbAPI from "../verbapi.js"

// requires channel and update_messages() properties
export default class InputBox extends React.Component {
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
