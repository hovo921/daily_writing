import React from "react";
import {
    DASHBOARD_PATH,
    SIGN_IN_PATH,
    SIGN_UP_PATH,
    VERIFY_EMAIL_PATH,
    FORGOT_PASSWORD_PATH,
    ACTIVATE_PROFILE
} from "../configs/constants";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Dashboard from "../components/Dashboard";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import VerifyEmail from "../components/VerifyEmail";
import ForgotPassword from "../components/ForgotPassword";
import ActivateProfile from "../components/ActivateProfile";

const ROUTES = () => (
    <Router>
        <Switch>
            <Route path={SIGN_IN_PATH} component={SignIn}/>
            <Route path={SIGN_UP_PATH} component={SignUp}/>
            <Route path={DASHBOARD_PATH} component={Dashboard}/>
            <Route path={VERIFY_EMAIL_PATH} component={VerifyEmail}/>
            <Route path={FORGOT_PASSWORD_PATH} component={ForgotPassword}/>
            <Route path={ACTIVATE_PROFILE} component={ActivateProfile}/>
            <Redirect to={SIGN_IN_PATH} />
        </Switch>
    </Router>
);

export default ROUTES;
