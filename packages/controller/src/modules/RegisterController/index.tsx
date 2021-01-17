import { gql, useMutation } from '@apollo/client';
import { RegisterMutationVariables } from '../../generated/types';
interface RegisterControllerProps {
  children: (data: {
    submit: (values: RegisterMutationVariables) => Promise<null>;
  }) => JSX.Element | null;
}

const registerMutation = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      message
    }
  }
`;

export const RegisterController = (props: RegisterControllerProps) => {
  const [register] = useMutation(registerMutation) ;

  const submit = async (values: RegisterMutationVariables) => {

    const { data } = await register({
      variables: values,
    });
    console.log(data);
    return data;
  };

  return props.children({ submit });
};
