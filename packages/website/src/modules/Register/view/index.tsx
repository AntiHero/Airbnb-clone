import React from "react";
import { Form, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withFormik, FormikErrors, FormikProps, Field } from "formik";
import { validRegisterSchema } from "@abb/common";
import EmailField from "../../shared/InputFields/Email";
import PasswordField from "../../shared/InputFields/Password";
import "./RegisterView.scss";

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
  const { handleSubmit } = props;

  return (
    <div className='RegisterView'>
      <Form
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onSubmitCapture={handleSubmit}
      >
        <Field
          name='email'
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Email'
          component={EmailField}
        />
        <Field
          name='password'
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='Password'
          component={PasswordField}
        />
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a
            className='RegisterView__login-form-forgot login-form-forgot'
            href='/forgot'
          >
            Forgot password
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='RegisterView__login-btn login-form-button'
          >
            Register
          </Button>
          <span className='RegisterView__login-btn-wrapper'>
            or <a href='/login'>Login now!</a>
          </span>
        </Form.Item>
      </Form>
    </div>
  );
};

const EnhancedRegisterView = withFormik<RegisterViewProps, RegisterFormValues>({
  validationSchema: validRegisterSchema,
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
