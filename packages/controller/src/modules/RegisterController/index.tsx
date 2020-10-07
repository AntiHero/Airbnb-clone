import * as React from 'react';
import { Component } from 'react';

interface RegisterControllerProps {
  children: (data: { submit: (values: any) => Promise<null> }) => JSX.Element | null
}

export const RegisterController = (props: RegisterControllerProps) => {

  const submit = async (values: any) => {
    console.log(values);
    return null;
  };

  return (
    <>
      {props.children({ submit })}
    </>
  );
}
