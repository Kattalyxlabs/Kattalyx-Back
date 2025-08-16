// import User from "../../entity/user.entitie.js";
import User from '../../schema/v1/user.schema.js';

export default class UserDao {
  private userModel: typeof User;

  constructor() {
    this.userModel = User;
  }
  async getUserByIdDaodublicate(userId: string) {
    console.log('DAO: Starting getUserByIdDaodublicate with userId:', userId);

    try {
      // Add timeout to prevent hanging
      const user = await this.userModel
        .findById(userId)
        .select('-password')
        .maxTimeMS(5000); // 5 second timeout

      console.log('DAO: Query completed, user found:', !!user);
      return user;
    } catch (error) {
      console.error('DAO: Error in getUserByIdDaodublicate:', error);
      throw error;
    }
  }

  async getUserInfo(id: string) {
    return this.userModel.findOne({ id });
  }

  async createUserDao(data: any) {
    return this.userModel.create(data);
  }

  async getUserByEmailDao(email: string) {
    return this.userModel.findOne({ email: email });
  }

  async getUserByIdDao(id: string) {
    return this.userModel.findById(id);
  }

  async getAllUsersDao(limit: number = 10, offset: number = 0) {
    const users = await this.userModel.find().skip(offset).limit(limit);
    const total = await this.userModel.countDocuments();
    return { rows: users, count: total };
  }

  async updateUserDao(id: string, updateData: any) {
    return this.userModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteUserDao(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
