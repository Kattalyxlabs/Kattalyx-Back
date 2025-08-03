import express from "express";
import UserController from "../../controller/v1/user.controller.js";

const route = express.Router();
const userController = new UserController();

/**
 * @swagger
 * /user/create_user:
 *   post:
 *     summary: Create a new user
 *     description: API to create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 example: "john_doe"
 *               first_name:
 *                 type: string
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "john.dssoe@example.com"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Springfield, USA"
 *               phone:
 *                 type: integer
 *                 example: 1234567890
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
route.post("/create_user", (req, res) => userController.createUserController(req, res));

/**
 * @swagger
 * /user/{email}:
 *   get:
 *     summary: Get user by email
 *     description: API to retrieve a user by their email address
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email address of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User found"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                       example: 1
 *                     user_name:
 *                       type: string
 *                       example: "john_doe"
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "john.dssoe@example.com"
 *                     address:
 *                       type: string
 *                       example: "123 Main St, Springfield, USA"
 *                     phone:
 *                       type: integer
 *                       example: 1234567890
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-29T11:21:34.631Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-29T11:21:34.631Z"
 *       400:
 *         description: Invalid email format
 *       404:
 *         description: User not found
 */
route.get("/:email", (req, res) => userController.getUserByEmailController(req, res));

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user information
 *     description: API to update user details using user ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User's unique ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: updatedUser@example.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
route.put("/:id", (req, res) => userController.updateUserController(req, res));

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: API to retrieve a user by their unique user ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User's unique ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User found"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                       example: 1
 *                     user_name:
 *                       type: string
 *                       example: "john_doe"
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "john.dssoe@example.com"
 *                     address:
 *                       type: string
 *                       example: "123 Main St, Springfield, USA"
 *                     phone:
 *                       type: integer
 *                       example: 1234567890
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-29T11:21:34.631Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-29T11:21:34.631Z"
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User not found
 */
route.get("/:id", (req, res) => userController.getUserByIdController(req, res));

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: API to delete a user using their user ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User's unique ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
route.delete("/:id", (req, res) => userController.deleteUserController(req, res));

export default route;
