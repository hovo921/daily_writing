import React, {useState, useRef} from "react";
import { Button, Form, Container, Header, Message } from 'semantic-ui-react';
import API from "../api";
import {DASHBOARD_PATH, SIGN_IN_PATH, TOKEN} from "../configs/constants";
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


        const response = await API.signUp(emailVal, passwordVal);
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

    return (
        <Container className={"auth"}>
            <Form onSubmit={signUp} error={error} loading={loading}>
                <Header as='h1'>Sign up</Header>
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
            <Button type='submit'>Register</Button>
            <Link to={SIGN_IN_PATH}>Sign in</Link>

        </Form>
        </Container>
    )
};

export default SignUp;
