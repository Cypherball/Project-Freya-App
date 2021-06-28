import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation signin($email: String!, $password: String!) {
    signIn(fields: { email: $email, password: $password }) {
      _id
      email
      name
      token
      confirmed
      user_data {
        _id
        gender
        dob
      }
    }
  }
`;
