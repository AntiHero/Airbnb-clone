import React from "react";
import { RegisterController } from '@abb/controller';
import EnhancedRegisterView from "./view";
import "./RegisterConnector.scss";

const RegisterConnector = () => {
  return (
    <div className="RegisterConnector">
      <RegisterController>
        {
          ({ submit }: { submit: any }) => <EnhancedRegisterView submit={submit} />
        }
      </RegisterController>
    </div>
  )
};

export default RegisterConnector;
