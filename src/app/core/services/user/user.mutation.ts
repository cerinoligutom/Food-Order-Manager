import gql from "graphql-tag";
import { User } from "./user.model";

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

export interface UserMutationResponse {
  User: User;
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

export const AddUserRoleMutation = gql`
  mutation addUserRole($userId: ID!, $roleId: ID!) {
    isRoleChanged: addUserRole(userId: $userId, roleId: $roleId)
  }
`;

export const RemoveUserRoleMutation = gql`
  mutation removeUserRole($userId: ID!, $roleId: ID!) {
    isRoleChanged: removeUserRole(userId: $userId, roleId: $roleId)
  }
`;
