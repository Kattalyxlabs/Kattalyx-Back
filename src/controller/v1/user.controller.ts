import { Request, Response } from "express";
import UserService from "../../services/v1/user.service.js";
import statusCode from "../../constant/common/statusCode.js";
import errorResponse from "../../constant/common/error.js";

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUserController(req: Request, res: Response): Promise<void> {
    console.log("controller->v1->user.controller->createUserController");

    try {
      const data = await this.userService.createUserService(req.body);
      res.status(statusCode.CREATED).send({
        message: "User successfully created",
        data: data 
      });
    } catch (error: any) {
      console.log(error);

      if (error.message === errorResponse.INVALID_INPUT) {
        res.status(statusCode.BAD_REQUEST).send({ message: errorResponse.INVALID_INPUT });
      } else if (error.message === errorResponse.USER_ALREADY_EXIST) {
        res.status(statusCode.UNAUTHORIZED).send({ message: errorResponse.USER_ALREADY_EXIST });
      } else {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: errorResponse.INTERNAL_SERVER_ERROR });
      }
    }
  }

  async getUserByEmailController(req: Request, res: Response): Promise<void> {
    console.log("controller->v1->user.controller->getUserByEmailController");

    const { email } = req.params;

    try {
      const user = await this.userService.getUserByEmailService(email);
      res.status(statusCode.OK).send({ message: "User found", data: user });
    } catch (error: any) {
      console.log(error);
      if (error.message === errorResponse.INVALID_EMAIL) {
        res.status(statusCode.BAD_REQUEST).send({ message: errorResponse.INVALID_EMAIL });
      } else if (error.message === errorResponse.USER_NOT_FOUND) {
        res.status(statusCode.NOT_FOUND).send({ message: errorResponse.USER_NOT_FOUND });
      } else {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: errorResponse.INTERNAL_SERVER_ERROR });
      }
    }
  }

  async updateUserController(req: Request, res: Response): Promise<void> {
    console.log("controller->v1->user.controller->updateUserController");

    const { id } = req.params;
    const updateData = req.body;

    try {
      const updatedUser = await this.userService.updateUserService(Number(id), updateData);
      res.status(statusCode.OK).send({
        message: "User updated successfully",
        data: updatedUser
      });
    } catch (error: any) {
      console.log(error);
      if (error.message === errorResponse.INVALID_INPUT) {
        res.status(statusCode.BAD_REQUEST).send({ message: errorResponse.INVALID_INPUT });
      } else if (error.message === errorResponse.USER_NOT_FOUND) {
        res.status(statusCode.NOT_FOUND).send({ message: errorResponse.USER_NOT_FOUND });
      } else {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: errorResponse.INTERNAL_SERVER_ERROR });
      }
    }
  }

  async deleteUserController(req: Request, res: Response): Promise<void> {
    console.log("controller->v1->user.controller->deleteUserController");

    const { id } = req.params;

    try {
      await this.userService.deleteUserService(Number(id));
      res.status(statusCode.OK).send({
        message: "User deleted successfully"
      });
    } catch (error: any) {
      console.log(error);
      if (error.message === errorResponse.USER_NOT_FOUND) {
        res.status(statusCode.NOT_FOUND).send({ message: errorResponse.USER_NOT_FOUND });
      } else {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: errorResponse.INTERNAL_SERVER_ERROR });
      }
    }
  }
  async getUserByIdController(req: Request, res: Response): Promise<void> {
    console.log("controller->v1->user.controller->getUserByIdController");

    try {
      const { id } = req.params;
      const user = await this.userService.getUserByIdService(Number(id));

      res.status(statusCode.OK).send({
        message: "User fetched successfully",
        data: user,
      });
    } catch (error: any) {
      console.log(error);
      if (error.message === errorResponse.INVALID_ID) {
        res.status(statusCode.BAD_REQUEST).send({ message: errorResponse.INVALID_ID });
      } else if (error.message === errorResponse.USER_NOT_FOUND) {
        res.status(statusCode.NOT_FOUND).send({ message: errorResponse.USER_NOT_FOUND });
      } else {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: errorResponse.INTERNAL_SERVER_ERROR });
      }
    }
  }
}
