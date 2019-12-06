import React from "react";
import {DASHBOARD_PATH, SIGN_IN_PATH, SIGN_UP_PATH} from "../configs/constants";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Dashboard from "../components/Dashboard";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

const ROUTES = () => (
    <Router>
        <Switch>
            <Route path={SIGN_IN_PATH} component={SignIn}/>
            <Route path={SIGN_UP_PATH} component={SignUp}/>
            <Route path={DASHBOARD_PATH} component={Dashboard}/>
            <Redirect to={SIGN_IN_PATH} />
        </Switch>
    </Router>
);

export default ROUTES;
