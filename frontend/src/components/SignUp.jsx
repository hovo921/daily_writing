import React, { useState, useRef } from "react";
import { Button, Form, Container, Header, Message } from "semantic-ui-react";
import API from "../api";
import {
  DASHBOARD_PATH,
  SIGN_IN_PATH,
  TOKEN,
  VERIFYEMAIL_PATH
} from "../configs/constants";
import { useStateValue } from "../context";
import { Link } from "react-router-dom";
import { loginSuccess, GET_VERIFEMAIL } from "../context/actions";

const SignUp = ({ history }) => {
  const [{ isLoading }, dispatch] = useStateValue();
  const [{ verifyEmail }, dispatchVerifyEmail] = useStateValue();

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  async function signUp(e) {
    setLoading(true);
    e.preventDefault();
    const emailVal = emailRef.current.value;
    const passwordVal = passwordRef.current.value;

    setLoading(false);

    if (true) {

      console.log('emailVal', emailVal);

      history.push(VERIFYEMAIL_PATH);
      dispatchVerifyEmail({ type: GET_VERIFEMAIL, payload: emailVal });
    }

    // const response = await API.signUp(emailVal, passwordVal);
    // const data = await response.json();

    // if (data.token) {

    //   dispatch(loginSuccess);
    //   localStorage.setItem(TOKEN, data.token);
    //   history.push(DASHBOARD_PATH);
    // } else {
    //   setError(data.error);
    // }
  }

  return (
    <Container className={"auth"}>
      <Form onSubmit={signUp} error={error} loading={loading}>
        <Header as="h1">Sign up</Header>
        <Form.Field>
          <label>Your email address</label>
          <input placeholder="Email" type={"email"} ref={emailRef} />
        </Form.Field>
        <Form.Field>
          <label>Your password</label>
          <input placeholder="Password" type={"password"} ref={passwordRef} />
          <Message error={true} content={error} />
        </Form.Field>
        <Button type="submit">Register</Button>
        <Link to={SIGN_IN_PATH}>Sign in</Link>
      </Form>
    </Container>
  );
};

export default SignUp;
