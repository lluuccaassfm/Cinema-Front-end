import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import AppBar from 'material-ui/AppBar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {Button } from "@material-ui/core";
import { Link } from 'react-router-dom';

const style_button = {
    margin: 15,
};

const style_form = {
    textAlign: 'center',
};

const style_color = {
    backgroundColor: '#1C1C1C',
};

const theme = createMuiTheme({
    palette: {
        primary: {main: '#4F4F4F'},
    },
});


class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            email:'',
            pass:'',
        };

        this.sendLogin = this.sendLogin.bind(this);
        this.errNotification = this.errNotification.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    errNotification() {
        this.notificationDOMRef.current.addNotification({
            title: "",
            message: "Login não efetuado. Verifique suas credenciais de acesso e tente novamente.",
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 3000 },
            dismissable: { click: true }
        });
    }
    sucessNotification(message) {
        this.notificationDOMRef.current.addNotification({
            title: "",
            message: message.toString(),
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 3000 },
            dismissable: { click: true }
        });
    }

    sendLogin() {
        const a = JSON.stringify(this.state);
        axios.post(`http://172.22.51.134:8080/login/`, a,{
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res =>{
                console.log(res);
                this.sucessNotification(res.data.message);
                window.location.href = "/home"
            })
            .catch(error =>{
                console.log(error);
                this.errNotification();
            });
    }

    render(){

        return (
            <div>
                <div className="app-content">
                    <ReactNotification ref={this.notificationDOMRef} />
                </div>
                <MuiThemeProvider>
                    <div style={style_form}>
                        <AppBar
                            style={style_color}
                            title="Login"
                        />
                        <TextField
                            hintText="Enter your Email"
                            floatingLabelText="Email"
                            onChange={(event,email) => this.setState({email:email})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event,newValue) => this.setState({pass:newValue})}
                        />
                        <br/>
                        <div>
                            <Link to="/user-new">create new user</Link>
                        </div>
                        <ThemeProvider theme={theme}>
                            <Button variant="contained" color="primary" disabled={!this.state.email || !this.state.pass}  style={style_button} onClick={() => this.sendLogin()}>
                                Submit
                            </Button>
                        </ThemeProvider>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default Login;
