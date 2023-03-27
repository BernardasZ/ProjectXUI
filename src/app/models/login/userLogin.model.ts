import { User } from "../user/user.model";

export interface UserLogin extends User {
  jwt: string;
}