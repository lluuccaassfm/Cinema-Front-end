import React, { Component } from 'react';
import './App.css';
import { BrowserRouter , Route, Switch} from "react-router-dom";
import routes from "./routes";

class App extends Component {

    // constructor(props){
    //     super(props);
    // }

    render(){
        return(
            <BrowserRouter>
                <div>
                    <Switch>
                        {routes.map((value, key)=>{
                            return <Route
                                key={key}
                                path={value.path}
                                component={value.component}
                                exact={value.exact}
                            />
                        })}
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
