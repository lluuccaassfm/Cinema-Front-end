import React, {Component} from 'react';
import Navigation from "./Navigation";

class Cine extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navigation index={4} />

                Cine
            </div>
        );
    }
}

export default Cine;
