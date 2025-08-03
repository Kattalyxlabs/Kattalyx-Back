import User from "../../entity/user.entitie.js";

export default class UserDao {
  private userModel: typeof User;

  constructor() {
    this.userModel = User;
  }

  async createUserDao(data: any) {
    return this.userModel.create(data);
  }

  async getUserByEmailDao(email: string) {
    return this.userModel.findOne({ email });
  }

  async getUserByIdDao(user_id: number) {
    return this.userModel.findOne({ user_id });
  }

  async getAllUsersDao(limit: number = 10, offset: number = 0) {
    const users = await this.userModel.find().skip(offset).limit(limit);
    const total = await this.userModel.countDocuments();
    return { rows: users, count: total };
  }

  async updateUserDao(user_id: number, updateData: any) {
    return this.userModel.findOneAndUpdate({ user_id }, updateData, {
      new: true,
    });
  }

  async deleteUserDao(user_id: number) {
    return this.userModel.deleteOne({ user_id });
  }
}
