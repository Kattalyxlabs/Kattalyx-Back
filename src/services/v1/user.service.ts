import errorResponse from "../../constant/common/error.js";
import UserDao from "../../dao/v1/user.dao.js";

export default class UserService {
    private userDao: UserDao;

    constructor() {
        this.userDao = new UserDao();
    }

    async createUserService(data: any): Promise<any> {
        console.log("services->v1->user.service->createUserService");
        console.log("Creating user with email:", data.email);

        if (!data || !data.email || !data.phone) {
            throw new Error(errorResponse.INVALID_INPUT);
        }

        const userExist = await this.userDao.getUserByEmailDao(data.email);
        if (userExist) {
            throw new Error(errorResponse.USER_ALREADY_EXIST);
        }

        return this.userDao.createUserDao(data);
    }

    async getUserByEmailService(email: string): Promise<any> {
        console.log("services->v1->user.service->getUserByEmailService");
        if (!email) throw new Error(errorResponse.INVALID_EMAIL);
        
        const user = await this.userDao.getUserByEmailDao(email);
        if (!user) throw new Error(errorResponse.USER_NOT_FOUND);
        
        return user;
    }

    async getUserByIdService(id: number): Promise<any> {
        console.log("services->v1->user.service->getUserByIdService");
        if (!id) throw new Error(errorResponse.INVALID_ID);

        const user = await this.userDao.getUserByIdDao(id);
        if (!user) throw new Error(errorResponse.USER_NOT_FOUND);

        return user;
    }

    async getAllUsersService(limit: number = 10, offset: number = 0): Promise<any> {
        console.log("services->v1->user.service->getAllUsersService");
        if (limit <= 0 || offset < 0) throw new Error(errorResponse.INVALID_PAGINATION);
        
        return this.userDao.getAllUsersDao(limit, offset);
    }

    async updateUserService(id: number, updateData: any): Promise<any> {
        console.log("services->v1->user.service->updateUserService");
        if (!id || !updateData) throw new Error(errorResponse.INVALID_INPUT);

        const existingUser = await this.userDao.getUserByIdDao(id);
        if (!existingUser) {
            throw new Error(errorResponse.USER_NOT_FOUND);
        }

        return this.userDao.updateUserDao(id, updateData);
    }

    async deleteUserService(id: number): Promise<boolean> {
        console.log("services->v1->user.service->deleteUserService");
        if (!id) throw new Error(errorResponse.INVALID_ID);

        const existingUser = await this.userDao.getUserByIdDao(id);
        if (!existingUser) {
            throw new Error(errorResponse.USER_NOT_FOUND);
        }

        await this.userDao.deleteUserDao(id);
        return true;
    }
}
