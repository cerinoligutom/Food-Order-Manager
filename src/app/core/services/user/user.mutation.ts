import gql from 'graphql-tag';
import { User } from './user.model';

export interface EditUserInput {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  birthdate?: Date;
  nickname: string;
  caption: string;
  image: string;
}

export const EditUserMutation = gql`
  mutation editUser($editUserInput: EditUserInput) {
    User: editUser(input: $editUserInput) {
      id
      username
      hash
      first_name
      middle_name
      last_name
      full_name
      birthdate
      nickname
      email
      caption
      image
      confirmed
      created_at
      is_active
      last_active
    }
  }
`;
