import React, {Component} from 'react';
import Navigation from "./Navigation";

class Reservation extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navigation index={5} />

                Reservation
            </div>
        );
    }
}

export default Reservation;
