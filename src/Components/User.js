import React, {Component} from 'react';
import Navigation from "./Navigation";

class User extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navigation/>

                User
            </div>
        );
    }
}

export default User;
