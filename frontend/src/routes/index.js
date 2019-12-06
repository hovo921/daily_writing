import React from "react";
import {DASHBOARD_PATH, SIGN_IN_PATH, SIGN_UP_PATH, VERIFYEMAIL_PATH, FORGOT_PASSWORD_PATH} from "../configs/constants";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Dashboard from "../components/Dashboard";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import VerifyEmail from "../components/VerifyEmail";
import ForgotPassword from "../components/ForgotPassword";

const ROUTES = () => (
    <Router>
        <Switch>
            <Route path={SIGN_IN_PATH} component={SignIn}/>
            <Route path={SIGN_UP_PATH} component={SignUp}/>
            <Route path={DASHBOARD_PATH} component={Dashboard}/>
            <Route path={VERIFYEMAIL_PATH} component={VerifyEmail}/>
            <Route path={FORGOT_PASSWORD_PATH} component={ForgotPassword}/>
            <Redirect to={SIGN_IN_PATH} />
        </Switch>
    </Router>
);

export default ROUTES;
