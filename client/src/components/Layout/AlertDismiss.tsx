import React from "react";
import Alert from "react-bootstrap/Alert";

export interface AlertDismissProps {
  dismissAlert: () => void;
  heading: string;
  body: string;
}

const AlertDismiss: React.FC<AlertDismissProps> = ({
  dismissAlert,
  heading,
  body,
}) => {
  return (
    <Alert variant="danger" onClose={dismissAlert} dismissible>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{body}</p>
    </Alert>
  );
};

export default AlertDismiss;
