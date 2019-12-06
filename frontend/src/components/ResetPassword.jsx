import React, {useState, useEffect, useRef} from "react";
import { Button, Form, Container, Header, Message } from 'semantic-ui-react';
import API from "../api";
import {DASHBOARD_PATH, SIGN_IN_PATH, SIGN_UP_PATH, TOKEN, FORGOT_PASSWORD_PATH} from "../configs/constants";
import {useStateValue} from "../context";
import {Link} from "react-router-dom";
import {loginSuccess} from "../context/actions";


const ResetPassword = ({history}) => {
    const [{ isLoading }, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [isResetSuccessfully, setIsResetSuccessfully] = useState(false);

    const [error, setError] = useState("");
    const password1Ref = useRef(null)
    const password2Ref = useRef(null)
    const handleSubmit = (e) => {
        e.preventDefault();
        const ps1Value = password1Ref.current.value;
        const ps2Value = password2Ref.current.value;
        if(ps1Value !== ps2Value) setError("Passwords does not match");
       else  {
            const search = history.location.search.split("&");
            const email = search[0].split("=")[1];
            const hash = search[1].split("=")[1];
            API.changePassword(email, hash, ps1Value )
                .then(j => j.json())
                .then((res) => {
                    if(!res.status){
                        setLoading(false);
                        setIsResetSuccessfully(true)
                    } else {
                        setLoading(false);
                        setError(res.status)
                    }
                })
        }

    }


    if(isResetSuccessfully){
       return <Container className={"auth"}><Message positive>
            <Message.Header>Password changed successfully</Message.Header>
            <Button><Link to={SIGN_IN_PATH}>Go to Login Page</Link></Button>
        </Message>
       </Container>
    }




    return (
        <Container className={"auth"}>
            <Form onSubmit={handleSubmit} error={error} loading={false}>
                <Form.Field>
                    <label>New Password</label>
                    <input type="password" ref={password1Ref} />
                </Form.Field>
                <Form.Field>
                    <label>Repeat new password</label>
                    <input type="password" ref={password2Ref}/>
                </Form.Field>
                <Form.Field>
                    <Message error={true} content={error} />
                </Form.Field>
                <Button type='submit'>Next</Button>
            </Form>
        </Container>
    )
};

export default ResetPassword;
