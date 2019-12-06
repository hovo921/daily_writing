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

const ForgotPassword = ({ history }) => {
  const [{ isLoading }, dispatch] = useStateValue();
  const [{ verifyEmail }, dispatchVerifEmail] = useStateValue();

  const [loading, setLoading] = useState("");
  const [mailSent, setSentStatus] = useState(false);
  const [error, setError] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const emailVal = emailRef.current.value;
    setLoading(false);

    if (true) {
      //some
    } else setError(true);
    setSentStatus(true);
  }

  return (
    <Container className={"auth"}>
      {mailSent ? (
        <Message positive>
          <Message.Header>Confirm Your Email Address</Message.Header>
          <p>
            A confirmation email has been sent to <b>{verifyEmail}</b>. Click on
            the confirmation link in the email to activate your account
          </p>
          <Button><Link to={SIGN_IN_PATH}>Go to Login Page</Link></Button>
        </Message>
      ) : (
        <Form onSubmit={handleSubmit} error={error} loading={loading}>
          <Header as="h1">Reset your password</Header>
          <Form.Field>
            <label>Your email address</label>
            <input placeholder="Email" type={"email"} ref={emailRef} />
          </Form.Field>
          <Button type="submit">Send email</Button>
          <Link to={SIGN_IN_PATH}>Sign in</Link>
        </Form>
      )}
    </Container>
  );
};

export default ForgotPassword;
