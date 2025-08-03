/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       required:
 *         - email
 *         - phone
 *       properties:
 *         email:
 *           type: string
 *           example: user@example.com
 *         phone:
 *           type: string
 *           example: "9876543210"
 */

/**
 * @swagger
 * /create_user:
 *   post:
 *     summary: Create a new user
 *     description: API to create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
export default {};
