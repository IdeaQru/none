import { prisma } from "../application/database";
import {
  CreateUserRequest,
  toUserResponse,
  UpdateUserReqest,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import { ResponseError } from "../error/response-error";
import bcript from "bcrypt";
import { v4 as uuid } from "uuid";
import { User } from "@prisma/client";
export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );
    const totalUserWithSameUsername = await prisma.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (totalUserWithSameUsername != 0) {
      throw new ResponseError(400, "user already exist");
    }
    registerRequest.password = await bcript.hash(registerRequest.password, 10);

    const user = await prisma.user.create({
      data: registerRequest,
    });
    return toUserResponse(user);
  }
  static async login(request: CreateUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);
    let user = await prisma.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    if (!user) {
      throw new ResponseError(401, "username or password is incorrect");
    }
    const isPasswordValid = await bcript.compare(
      loginRequest.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ResponseError(401, "username or password is incorrect");
    }

    user = await prisma.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    });
    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
  }

  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }
  static async update(
    user: User,
    request: UpdateUserReqest
  ): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);
    if (updateRequest.password) {
      updateRequest.password = await bcript.hash(updateRequest.password, 10);
    }
    if (updateRequest.name) {
      user.name = updateRequest.name;
    }
    const result = await prisma.user.update({
      where: {
        username: user.username,
      },
      data: user,
    });
    return toUserResponse(result);
  }
}
