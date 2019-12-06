import React from "react";
import { Message , Container} from "semantic-ui-react";
import { useStateValue } from "../context";

const VerifyEmail = () => {
  const [{ verifyEmail }] = useStateValue();
  return (
    <Container className={"auth"}>
      <Message positive>
        <Message.Header>Confirm Your Email Address</Message.Header>
        <p>
          A confirmation email has been sent to <b>{verifyEmail}</b>. Click on the
          confirmation link in the email to activate your account
        </p>
      </Message>
    </Container>
  );
};

export default VerifyEmail;
