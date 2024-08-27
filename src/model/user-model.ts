import { User } from "@prisma/client";

export interface UserResponse {
  username: string;
  name: string;
  token?: string;
};

export type CreateUserRequest = {
  username: string;
  name: string;
  password: string;
};
export type LoginUserRequest = {
    username: string;
    password: string;
  };
  export type UpdateUserReqest = {
    name: string;
    password: string;
  }
export function toUserResponse(user: User):UserResponse {
  return {
    name: user.name,
    username: user.username,
  };

}
