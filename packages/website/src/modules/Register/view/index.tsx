import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withFormik, FormikErrors, FormikProps } from "formik";
import * as yup from "yup";
import "./RegisterView.scss";

export const invalidEmal = "email must be a valid email";
export const emailTooShort = "email must be at least 3 characters";
export const passwordTooShort = "password must be at least 6 characters";

interface RegisterFormValues {
  email: string;
  password: string;
}

interface RegisterViewProps {
  submit: (
    values: RegisterFormValues
  ) => Promise<FormikErrors<RegisterFormValues> | null>;
}

const RegisterView = (
  props: RegisterViewProps & FormikProps<RegisterFormValues>
) => {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
  } = props;

  return (
    <div className="RegisterView">
      <Form
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onSubmitCapture={handleSubmit}
      >
        <Form.Item
          help={touched.email && errors.email ? errors.email : null}
          name="email"
          validateStatus={touched.email && errors.email ? "error" : undefined}
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>
        <Form.Item
          help={touched.password && errors.password ? errors.password : null}
          name="password"
          validateStatus={touched.password && errors.password ? "error" : undefined}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a
            className="RegisterView__login-form-forgot login-form-forgot"
            href="/forgot"
          >
            Forgot password
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="RegisterView__login-btn login-form-button"
          >
            Register
          </Button>
          <span className="RegisterView__login-btn-wrapper">
            or <a href="/login">Login now!</a>
          </span>
        </Form.Item>
      </Form>
    </div>
  );
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailTooShort)
    .max(255)
    .email(invalidEmal)
    .required(),
  password: yup.string().min(6, passwordTooShort).max(255).required(),
});

const EnhancedRegisterView = withFormik<RegisterViewProps, RegisterFormValues>({
  validationSchema,
  mapPropsToValues: () => ({ email: "", password: "" }),

  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  },

  displayName: "RegisterForm",
})(RegisterView);

export default EnhancedRegisterView;
