import React, {Component} from 'react';
import Navigation from "./Navigation";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {createMuiTheme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import ReactNotification from "react-notifications-component";
import MaterialTable from "material-table";
import IconsTable from "./IconsTable";

const datasTable = {
    columns: [
        { title: 'Name', field: 'name' },
        { title: 'Classification', field: 'classification', type: 'numeric' },
        { title: 'Genre', field: 'genre' },
        { title: 'Duration (min)', field: 'duration', type: 'numeric' },
        { title: 'Type', field: 'type'}
    ]
};

const iconsTable = IconsTable.getIconsTable();

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

class Movie extends Component {

    componentDidMount(){
        this.getMovies();
    }

    constructor(props) {
        super(props);

        this.state = {
            name : '' ,
            classification : 0,
            genre : '',
            duration : 0,
            description : '',
            situation : '',
            type : '',
            movies: []
        };

        this.changeInput = this.changeInput.bind(this);
        this.createMovie = this.createMovie.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    errNotification(message) {
        this.notificationDOMRef.current.addNotification({
            title: "movie not registered",
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
            title: "Movie",
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

    getMovies(){
        axios.get(`http://172.22.51.134:8080/movie/`)
            .then(res =>{
                console.log(res.data);
                this.setState({movies: res.data});
                datasTable.data.push(res.data)
            })
            .catch(error =>{
                console.log(error.config);
            });
    }

    createMovie(){
        const movie = {
            name : this.state.name,
            classification : parseInt(this.state.classification),
            genre : this.state.genre,
            duration : parseInt(this.state.duration),
            description : this.state.description,
            situation : this.state.situation,
            type : this.state.type,
        };
        console.log(movie);
        axios.post(`http://172.22.51.134:8080/movie/`, movie, {
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(res =>{
                console.log(res);
                this.sucessNotification(res.data.message)
            })
            .catch(error =>{
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log(error.config);
                this.errNotification(error.response.data.message);
            });
    }

    deleteMovie(id) {
        console.log("deletar uma sala: ");
        axios.delete(`http://172.22.51.134:8080/movie/`,{
            params: {
                id: id
            },
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.sucessNotification(res.data.message)
            })
    }

    render() {
        return (
            <div>
                <Navigation index={1} />

                <div className="app-content">
                    <ReactNotification ref={this.notificationDOMRef} />
                </div>

                <ThemeProvider theme={theme}>
                    <Grid item xs={12} >
                        <Paper>
                            <Box p={1}>
                                <h1 style={style_Title}>Movie</h1>
                            </Box>
                            <form onSubmit={this.createMovie}>

                                <Grid item xs={12} >
                                    <Box component="span"
                                         p={{ xs: 2, sm: 3, md: 5 }}
                                    >
                                        <TextField
                                            required
                                            name="name"
                                            label="Name"
                                            value={this.state.name}
                                            onChange={this.changeInput}
                                            margin="dense"
                                        />
                                    </Box>
                                    <Box component="span"
                                         p={{ xs: 2, sm: 3, md: 4 }}
                                    >
                                        <TextField
                                            name="classification"
                                            label="Classification"
                                            type='number'
                                            value={this.state.classification}
                                            onChange={this.changeInput}
                                            margin="dense"
                                        />
                                    </Box>
                                    <Box component="span"
                                         p={{ xs: 1, sm: 3, md: 4 }}
                                    >
                                        <FormControl required style={style_drop}>
                                            <InputLabel>Genre</InputLabel>
                                            <Select
                                                value={this.state.genre}
                                                onChange={this.changeInput}
                                                name="genre"
                                            >
                                                <MenuItem value="action">Action</MenuItem>
                                                <MenuItem value="comedy">Comedy</MenuItem>
                                                <MenuItem value="drama">Drama</MenuItem>
                                                <MenuItem value="science fiction">Science fiction</MenuItem>
                                                <MenuItem value="animation">Animation</MenuItem>
                                                <MenuItem value="adventure">Adventure</MenuItem>
                                                <MenuItem value="documentary">Documentary</MenuItem>
                                                <MenuItem value="war">War</MenuItem>
                                                <MenuItem value="musical">Musical</MenuItem>
                                                <MenuItem value="thriller">Thriller</MenuItem>
                                                <MenuItem value="suspense">Suspense</MenuItem>
                                                <MenuItem value="terror">Terror</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box component="span"
                                         p={{ xs: 2, sm: 3, md: 5 }}
                                    >
                                        <TextField
                                            required
                                            name="duration"
                                            label="Duration (min)"
                                            type='number'
                                            value={this.state.duration}
                                            onChange={this.changeInput}
                                            margin="dense"
                                        />
                                    </Box>


                                    <Box component="span"
                                         p={{ xs: 2, sm: 3, md: 4 }}
                                    >
                                        <FormControl required style={style_drop}>
                                            <InputLabel>Situation</InputLabel>
                                            <Select
                                                value={this.state.situation}
                                                onChange={this.changeInput}
                                                name="situation"
                                            >
                                                <MenuItem value="em breve">em breve</MenuItem>
                                                <MenuItem value="em cartaz">em cartaz</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box component="span"
                                         p={{ xs: 2, sm: 3, md: 4 }}
                                    >
                                        <FormControl required style={style_drop}>
                                            <InputLabel>Type</InputLabel>
                                            <Select
                                                value={this.state.type}
                                                onChange={this.changeInput}
                                                name="type"

                                            >
                                                <MenuItem value="subtitled">Subtitled</MenuItem>
                                                <MenuItem value="dubbed">Dubbed</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={7}>
                                    <Box component="span"
                                         m={4}
                                    >
                                        <TextField
                                            required
                                            name="description"
                                            label="Description"
                                            style={{ margin: 8 }}
                                            fullWidth
                                            value={this.state.description}
                                            onChange={this.changeInput}
                                            placeholder="Movie description"
                                            margin="normal"
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box component="span" m={4}>
                                        <Button variant="outlined"  style={{ margin: 8 , color:'rgb(48,196,64)'}} onClick={this.createMovie}>
                                            Salvar
                                        </Button>
                                    </Box>
                                </Grid>
                            </form>

                            <MaterialTable
                                icons={IconsTable.getIconsTable()}
                                title=""
                                columns={datasTable.columns}
                                data={this.state.movies}
                                actions={[
                                    // {
                                    //     icon: IconsTable.getIconsTable().Edit,
                                    //     tooltip: 'Edit',
                                    //     onClick: (event, rowData) => alert("You saved " + rowData.name)
                                    // },
                                    () => ({
                                        icon: IconsTable.getIconsTable().Delete,
                                        tooltip: 'Delete',
                                        onClick: (event, rowData) => this.deleteMovie(rowData._id),
                                    })
                                ]}
                                options={{
                                    actionsColumnIndex: -1
                                }}
                            />
                        </Paper>
                    </Grid>
                </ThemeProvider>
            </div>
        );
    }
}

export default Movie;
