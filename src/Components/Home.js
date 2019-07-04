import React, { Component } from 'react';
import Navigation from "./Navigation";

const style_background = {
    height: '1000px',
    backgroundColor: '#4F4F4F'
};

class Home extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div style={style_background}>
                <Navigation index={0} />
                Home
            </div>
        );
    }
}


export default Home;
