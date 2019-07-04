import React, { Component } from 'react';
import Navigation from "./Navigation";

class Error extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div style={style_form}>
                Erro (Página não encontrada)
            </div>
        );
    }
}

const style_form = {
    textAlign: 'center'
};

export default Error;
