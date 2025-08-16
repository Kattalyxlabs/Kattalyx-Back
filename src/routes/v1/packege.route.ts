import express from "express";
import UserController from "../../controller/v1/user.controller.js";

const route = express.Router();
const userController = new UserController();

route.post('/getuserinfo/:userId', (req, res) => {
  const ress = userController.getUserInfoController(req, res);
  console.log('from the root URL', ress);
});


export default route;
