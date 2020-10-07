import React from "react";
import { FieldProps } from "formik";
import { Form, Input } from "antd";

const PasswordField: React.FunctionComponent<FieldProps<any> & { prefix: React.ReactNode }> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  return (
    <Form.Item
      help={errorMsg}
      name='password'
      validateStatus={errorMsg ? "error" : undefined}
      rules={[
        {
          required: true,
          message: "Please input your Password!",
        },
      ]}
    >
      <Input {...field} {...props} />
    </Form.Item>
  );
};

export default PasswordField;
