import React from "react"

export default class UsersBar extends React.PureComponent {
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
