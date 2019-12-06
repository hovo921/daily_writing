import React, {useState, useEffect, useRef} from "react";
import { Button, Form, Container, Header, Message } from 'semantic-ui-react';
import API from "../api";
import {DASHBOARD_PATH, SIGN_IN_PATH, SIGN_UP_PATH, TOKEN, FORGOT_PASSWORD_PATH} from "../configs/constants";
import {useStateValue} from "../context";
import {Link} from "react-router-dom";
import {loginSuccess} from "../context/actions";


const ActivateProfile = ({history}) => {
    const [{ isLoading }, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [isActivatedSuccessfully, setIsActivatedSuccessfully] = useState(false);

    useEffect(() => {
        console.log(history)
        const search = history.location.search.split("&");
                const email = search[0].split("=")[1];
                const hash = search[1].split("=")[1];
                API.verifyAccount(email, hash)
                    .then(j => j.json())
                    .then((res) => {
                    if(!res.status){
                        setLoading(false);
                        setIsActivatedSuccessfully(true)
                    } else {
                        setLoading(false);
                        setIsActivatedSuccessfully(false)
                    }

                })

    }, []);



    return (
        <Container className={"auth"}>
            <Form error={!isActivatedSuccessfully} loading={loading}>
                {!loading &&  <Message
                      positive={isActivatedSuccessfully}
                      negative={!isActivatedSuccessfully}
                >
                    <Message.Header>{isActivatedSuccessfully ? "Your account Activated!!": "Failed"}</Message.Header>
                    <p>
                        {isActivatedSuccessfully ? "Your email address has been successfully verified. ": "Verify account failed"}
                    </p>
                </Message>}
                <Button onClick={() => history.push(SIGN_IN_PATH)}>Go to Login Page</Button>
            </Form>
        </Container>
    )
};

export default ActivateProfile;
