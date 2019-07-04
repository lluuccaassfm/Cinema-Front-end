import React, {Component} from 'react';
import {Button, Grid, Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import ReactNotification from "react-notifications-component";


const style_Title ={
    color : '#f74f5f'
};

const style_drop ={
    minWidth: 200,
    marginTop: 5
};

class UserNew extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name :'',
            email :'',
            pass : '',
            sex: '',
            birthDate : '',
            logradouro: '',
            number : 0,
            complement : '',
            city : '',
            state : '',
        };

        this.changeInput = this.changeInput.bind(this);
        this.createUser = this.createUser.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    errNotification(message) {
        this.notificationDOMRef.current.addNotification({
            title: "user not registered",
            message: message.toString(),
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
            title: "User",
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

    changeInput(event){
        let target = event.target;
        let index = target.name;
        let value = target.value;

        this.setState({
            [index] : value
        })
    }

    createUser(){
        const a = JSON.stringify(this.state);
        console.log(a);
        axios.post(`http://172.22.51.134:8080/user/`, a, {
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(res =>{
                this.sucessNotification(res.data.message);
                window.location.href = "/"
            })
            .catch(error =>{
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log(error.config);
                this.errNotification(error.response.data.message);
            });
    }

    render() {
        return (
            < div >

                <div className="app-content">
                    <ReactNotification ref={this.notificationDOMRef} />
                </div>

                <Grid item xs={12}>
                <Paper>
                    <form>
                       <h1 style={style_Title}>Register new user</h1>

                        <div>
                            <TextField
                                required
                                name="name"
                                label="Name"
                                value={this.state.name}
                                onChange={this.changeInput}
                                margin="dense"
                            />
                            <TextField
                                required
                                name="email"
                                label="Email"
                                value={this.state.email}
                                onChange={this.changeInput}
                                margin="dense"
                            />
                            <TextField
                                required
                                name="pass"
                                label="Password"
                                type="password"
                                value={this.state.pass}
                                onChange={this.changeInput}
                                margin="dense"
                            />
                            <FormControl required style={style_drop}>
                                <InputLabel>Sex</InputLabel>
                                <Select
                                    value={this.state.sex}
                                    onChange={this.changeInput}
                                    name="sex"
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                name="birthDate"
                                label="Birthdate"
                                // value={this.state.birthDate}
                                type="date"
                                // defaultValue={this.state.birthDate}
                                onChange={this.changeInput}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                required
                                name="logradouro"
                                label="Logradouro"
                                value={this.state.logradouro}
                                onChange={this.changeInput}
                                margin="dense"
                            />
                            <TextField
                                required
                                name="number"
                                label="Number"
                                type="number"
                                value={this.state.number}
                                onChange={this.changeInput}
                                margin="dense"
                            />
                            <TextField
                                name="complement"
                                label="Complement"
                                value={this.state.complement}
                                onChange={this.changeInput}
                                margin="dense"
                            />
                            <TextField
                                required
                                name="city"
                                label="City"
                                value={this.state.city}
                                onChange={this.changeInput}
                                margin="dense"
                            />
                            <TextField
                                required
                                name="state"
                                label="State"
                                value={this.state.state}
                                onChange={this.changeInput}
                                margin="dense"
                            />
                        </div>
                    </form>

                    <Grid item xs={5}>
                            <Button variant="outlined"  style={{ margin: 8 , color:'rgb(48,196,64)'}} onClick={this.createUser}>
                                Salvar
                            </Button>
                    </Grid>
                </Paper>
            </Grid>
            </div>
    )}
}

export default UserNew;