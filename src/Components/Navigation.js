import React, {Component} from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ThemeProvider } from '@material-ui/styles';
import {Home, Movie, MeetingRoom, LocalMovies, EventSeat, Domain, Menu} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";


const theme = createMuiTheme({
    palette: {
        primary: { main: '#1C1C1C' },
        secondary: { main: '#f74f5f' },
    },
});


class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            index: this.props.index
        }
    }

    render() {

        return (
            <div>
                <ThemeProvider theme={theme}>
                    <AppBar position="static" color="default">
                        <Toolbar>
                                <Tabs
                                    value={this.state.index}
                                    onChange={(event, newValue) => {
                                        console.log(newValue);
                                        this.setState({index:newValue})
                                    }}
                                    variant="scrollable"
                                    scrollButtons="on"
                                    indicatorColor="secondary"
                                    textColor="secondary">

                                    <Tab label="Home"  icon={<Home color="primary"/>} href="/home" />
                                    <Tab label="Movie" icon={<LocalMovies color="primary"/>}   href="/movie" />
                                    <Tab label="Room" icon={<MeetingRoom color="primary"/>} href="/room" />
                                    <Tab label="Session" icon={<Movie color="primary"/>}  href="/session"/>
                                    <Tab label="Cine" icon={<Domain color="primary"/>}  href="/cine"/>
                                    <Tab label="Reservation" icon={<EventSeat color="primary"/>}   href="/reservation" />
                                </Tabs>

                            <Button color="secondary" href="/" >Logout</Button>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </div>
        );
    }
}

export default Navigation;
