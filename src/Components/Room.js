import React, {Component} from 'react';
import Navigation from "./Navigation";
import ReactNotification from "react-notifications-component";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {createMuiTheme} from "@material-ui/core";
import axios from "axios";
import { ThemeProvider } from '@material-ui/styles';
import MaterialTable from 'material-table';
import  IconsTable  from './IconsTable';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
// import Transition from "react-transition-group/Transition";

const style_Title ={
    color : '#f74f5f'
};

const style_drop ={
    minWidth: 200,
    marginTop: 5
};

const theme = createMuiTheme({
    palette: {
        primary: { main: '#1C1C1C' },
        secondary: { main: '#f74f5f' },
    },
});

const datasTable = {
    columns: [
        { title: 'Number', field: 'number', type: "numeric" },
        { title: 'Capacity', field: 'capacity', type: "numeric" },
        { title: 'Type', field: 'type'},
    ],
    data: [ ],
};

class Room extends Component {

    componentDidMount(){
        this.getRooms();
    }

    constructor(props) {
        super(props);

        this.state = {
            number : 0,
            type : '',
            capacity : 0,
            rooms : [],
            loadingTable: false
        };

        this.changeInput = this.changeInput.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    errNotification(message) {
        this.notificationDOMRef.current.addNotification({
            title: "room not registered",
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
            title: "Room",
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
        this.setState({
            [index] : target.value
        })
    }

    getRooms(){
        axios.get(`http://172.22.51.134:8080/room/`)
            .then(res =>{
                console.log(res.data);
                this.setState({rooms: res.data});
                datasTable.data.push(res.data)
            })
            .catch(error =>{
                console.log(error.config);
            });
    }

    createRoom(){
        this.setState({loadingTable:true});
        const room = {
            number:     parseInt(this.state.number,10),
            type:       this.state.type,
            capacity:   parseInt(this.state.capacity,10)
        };
        console.log(room);
        axios.post(`http://172.22.51.134:8080/room/`, room, {
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(res =>{
                console.log(res);
                this.sucessNotification(res.data.message)
                this.setState({loadingTable:false});
            })
            .catch(error =>{
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log(error.config);
                this.setState({loadingTable:false});
                this.errNotification(error.response.data.message);
            })
    }

    deleteRoom(id) {
        console.log("deletar uma sala: ");
        this.setState({loadingTable:true});
        axios.delete(`http://172.22.51.134:8080/room/`,{
            params: {
                id: id
            },
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({loadingTable:false});
                this.sucessNotification(res.data.message)
            })
    }


    render() {

        return (
            <div>
                <ThemeProvider theme={theme}>
                    <Navigation index={2} />

                    <div className="app-content">
                        <ReactNotification ref={this.notificationDOMRef} />
                    </div>


                    <Grid item xs={12} >
                        <Paper>
                            <Box p={1}>
                                <h1 style={style_Title}>Room</h1>
                            </Box>
                            <form onSubmit={this.createRoom}>

                                <Grid item xs={12} >
                                    <Box component="span"
                                         p={{ xs: 2, sm: 3, md: 5 }}
                                    >
                                        <TextField
                                            required
                                            name="number"
                                            label="Number"
                                            type="number"
                                            value={this.state.number}
                                            onChange={this.changeInput}
                                            margin="dense"
                                        />
                                    </Box>
                                    <Box component="span"
                                         p={{ xs: 2, sm: 3, md: 4 }}
                                    >
                                        <TextField
                                            name="capacity"
                                            label="Capacity"
                                            type='number'
                                            value={this.state.capacity}
                                            onChange={this.changeInput}
                                            margin="dense"
                                        />
                                    </Box>
                                    <Box component="span"
                                         p={{ xs: 1, sm: 3, md: 4 }}
                                    >
                                        <FormControl  required style={style_drop}>
                                            <InputLabel>Type</InputLabel>
                                            <Select
                                                name="type"
                                                value={this.state.type}
                                                onChange={this.changeInput}
                                            >
                                                <MenuItem value="2D">2D</MenuItem>
                                                <MenuItem value="3D">3D</MenuItem>
                                                <MenuItem value="3D/XD">3D/XD</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>

                                <Grid item xs={5}>
                                    <Box component="span" m={4}>
                                        <Button variant="outlined"  style={{ margin: 8 , color:'rgb(48,196,64)'}} onClick={this.createRoom}>
                                            Salvar
                                        </Button>
                                    </Box>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </ThemeProvider>
                <MaterialTable
                    isLoading={this.state.loadingTable}
                    icons={IconsTable.getIconsTable()}
                    title="Rooms"
                    columns={datasTable.columns}
                    data={this.state.rooms}
                    actions={[
                        // {
                        //     icon: IconsTable.getIconsTable().Edit,
                        //     tooltip: 'edit',
                        //     onClick: (event, rowData) => alert("You saved " + rowData.name)
                        // },
                        ()=>({
                            icon: IconsTable.getIconsTable().Delete,
                            tooltip: 'delete',
                            onClick: (event, rowData) => this.deleteRoom(rowData._id),
                        })
                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            </div>
        );
    }
}

export default Room;
