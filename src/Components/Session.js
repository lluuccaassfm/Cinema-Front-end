import React, {Component} from 'react';
import Navigation from "./Navigation";

class Session extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navigation index={3} />

                Session
            </div>
        );
    }
}

export default Session;
