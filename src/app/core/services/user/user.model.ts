import { ScalarDate } from '../models';

export interface User {
  id: string;
  username: string;
  hash: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  full_name: string;
  birthdate: ScalarDate;
  nickname: string;
  email: string;
  caption: string;
  image: string;
  confirmed: boolean;
  created_at: ScalarDate;
  is_active: boolean;
  last_active: boolean;
}
