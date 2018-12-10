import React from "react"

// Required props:
//   tab : Tab object from TabBox
class TabEntry extends React.PureComponent {
    render() {
        return (
            <li class="nav-item">
                <a class="nav-link" role="tab" data-toggle="tab"
                   aria-selected={!!this.props.tab.selected}
                   href={"#" + this.props.tab.name}
                   id={this.props.tab.name + "Tab"}>

                    {this.props.tab.name}
                </a>
            </li>
        );
    }
}

// Required props:
//   tab : Tab object from TabBox
class TabContent extends React.PureComponent {
    render() {
        var classes = "tab-pane fade " +
            (!!this.props.tab.selected? "show active " : "");

        return (
            <div class={classes} id={this.props.tab.name}
                 role="tabpanel" aria-labelledby={this.props.tab.name + "Tab"}>

                {this.props.tab.content}
            </div>
        );
    }
}

// Creates a tabbed menu, intended for packing stuff together on small displays

// Required props:
//   tabs : An array of tab objects of the form { name: ..., content: ... }
//            name     : Unique identifier for the tab, will be displayed
//                       to the user
//            content  : React element corresponding to the tab, which will be
//                       displayed when the tab is selected
//            selected : Optional boolean field indicating  whether the tab is
//                       selected by default
export default class TabBox extends React.PureComponent {
    render() {
        var tabs = this.props.tabs.map(tab => (<TabEntry tab={tab} />));
        var content = this.props.tabs.map(tab => (<TabContent tab={tab} />));

        return (
            <div>
                <ul class="nav nav-tabs" role="tablist">
                    {tabs}
                </ul>

                <div class="tab-content">
                    {content}
                </div>
            </div>
        )
    }
}
