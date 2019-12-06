import React, {useState, useRef} from "react";
import { Button, Form, Container, Header, Message } from 'semantic-ui-react';
import API from "../api";
import {DASHBOARD_PATH, SIGN_IN_PATH, SIGN_UP_PATH, TOKEN, FORGOT_PASSWORD_PATH} from "../configs/constants";
import {useStateValue} from "../context";
import {Link} from "react-router-dom";
import {loginSuccess} from "../context/actions";


const SignUp = ({history}) => {
    const [{ isLoading }, dispatch] = useStateValue();

    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    const emailEl = useRef(null);
    const passwordEl = useRef(null);


    async function signUp(e) {
        setLoading(true);
        e.preventDefault();
        const emailVal = emailEl.current.value;
        const passwordVal = passwordEl.current.value;


        const response = await API.signIn(emailVal, passwordVal)
        if(response.status === 401){
            setLoading(false);
            setError("Wrong email and/or password")
        } else {
            const data = await response.json();

            setLoading(false);

            if (data.token) {
                dispatch(loginSuccess);
                localStorage.setItem(TOKEN, data.token);
                history.push(DASHBOARD_PATH)
            } else {
                setError(data.error);
            }
        }

    }

    return (
        <Container className={"auth"}>
            <Form onSubmit={signUp} error={error} loading={loading}>
                <Header as='h1'>Sign In</Header>
                <Form.Field>
                    <label>Your email address</label>
                    <input placeholder='Email'  type={"email"} ref={emailEl}/>
                </Form.Field>
                <Form.Field>
                    <label>Your password</label>
                    <input placeholder='Password' type={"password"} ref={passwordEl} />
                    <Message
                        error={true}
                        content={error}
                    />
                </Form.Field>
                <Form.Field className="auth-links">
                    <Link to={FORGOT_PASSWORD_PATH}>Forgot password?</Link>
                    <Link to={SIGN_UP_PATH}>Don't have an account ?</Link>
                </Form.Field>
                <Button type='submit'>Login</Button>

            </Form>
        </Container>
    )
};

export default SignUp;
