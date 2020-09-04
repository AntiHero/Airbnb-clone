import React from "react";
import EnhancedRegisterView from "./view";
import "./RegisterConnector.scss";

const RegisterConnector = () => {
  const handleSubmit = async (props: any) => {
    console.log(props);
    return null;
  };

  return (
    <div className="RegisterConnector">
      <EnhancedRegisterView submit={handleSubmit} />
    </div>
  );
};

export default RegisterConnector;
