import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./component/Home";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import ResendPassword from "./component/ResendPassword";
import Dashboard from "./component/Dashboard";
import ChangePassword from "./component/ChangePassword"
import {Provider} from 'react-redux'
import {store, persistor} from "./modules/user_store";
import {PersistGate} from 'redux-persist/integration/react'
import {SnackbarProvider} from 'notistack';
import Instruction from "./component/Instruction";
import Work from "./component/Work";
import WorkSelect from "./component/WorkSelect";

ReactDOM.render(
    <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Switch>
                        <Route exact path="/"><Home/></Route>
                        <Route path="/sign_in"><SignIn/></Route>
                        <Route path="/sign_up"><SignUp/></Route>
                        <Route path="/resend_password"><ResendPassword/></Route>
                        <Route path="/dashboard"><Dashboard/></Route>
                        <Route path="/change_password"><ChangePassword/></Route>
                        <Route path="/instruction"><Instruction/></Route>
                        <Route path="/work"><Work/></Route>
                        <Route path="/work_select"><WorkSelect/></Route>
                    </Switch>
                </Router>
            </PersistGate>
        </Provider>
    </SnackbarProvider>
    ,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();