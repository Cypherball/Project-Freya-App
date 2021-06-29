import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation signin($email: String!, $password: String!) {
    signIn(fields: { email: $email, password: $password }) {
      _id
      email
      token
      banned
    }
  }
`;

export const SIGN_UP = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signUp(fields: { email: $email, password: $password, name: $name }) {
      _id
      email
      token
    }
  }
`;
