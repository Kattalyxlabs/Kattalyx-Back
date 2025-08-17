import mongoose from 'mongoose';
import errorResponse from '../../constant/common/error.js';
import PackageDao from '../../dao/v1/package.dao.js';

export default class PackageService {
  private packageDao: PackageDao;

  constructor() {
    this.packageDao = new PackageDao();
  }

  async getPackageInfoService(packageId: string): Promise<any> {
    console.log('services->v1->package.service->getPackageInfoService');
    console.log('Fetching package with ID:', packageId);

    // Check database connection
    console.log('Database connection state:', mongoose.connection.readyState);
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

    // Validate input
    if (!packageId) {
      throw new Error(errorResponse.INVALID_INPUT);
    }

    // Validate ObjectId format if using MongoDB ObjectIds
    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      throw new Error(errorResponse.INVALID_INPUT);
    }

    console.log('About to call DAO method...');
    // Fetch package from DAO
    const packageData = await this.packageDao.getPackageInfo(packageId);
    console.log('DAO method returned');

    if (!packageData) {
      throw new Error(errorResponse.PACKAGE_NOT_FOUND);
    }
    console.log('return from the Dao', packageData);

    return packageData;
  }

  async createPackageService(data: any): Promise<any> {
    console.log('services->v1->package.service->createPackageService');
    console.log('form data::=>>', data);

    console.log('Creating package with name:', data.packageName);

    if (!data || !data.packageName || !data.price) {
      throw new Error(errorResponse.INVALID_INPUT);
    }

    const packageExist = await this.packageDao.getPackageByNameDao(
      data.packageName
    );
    if (packageExist) {
      throw new Error(errorResponse.PACKAGE_ALREADY_EXIST);
    }

    return this.packageDao.createPackageDao(data);
  }

  async getPackageByNameService(packageName: string): Promise<any> {
    console.log('services->v1->package.service->getPackageByNameService');
    if (!packageName) throw new Error(errorResponse.INVALID_INPUT);

    const packageData = await this.packageDao.getPackageByNameDao(packageName);
    if (!packageData) throw new Error(errorResponse.PACKAGE_NOT_FOUND);
    console.log('return fromt the packageservice', packageData);

    return packageData;
  }

  async getPackageByIdService(id: string): Promise<any> {
    console.log('services->v1->package.service->getPackageByIdService');
    if (!id) throw new Error(errorResponse.INVALID_ID);

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(errorResponse.INVALID_ID);
    }

    const packageData = await this.packageDao.getPackageByIdDao(id);
    if (!packageData) throw new Error(errorResponse.PACKAGE_NOT_FOUND);
    console.log(packageData);

    return packageData;
  }

  async getAllPackagesService(
    limit: number = 10,
    offset: number = 0
  ): Promise<any> {
    console.log('services->v1->package.service->getAllPackagesService');
    if (limit <= 0 || offset < 0) throw new Error(errorResponse.INVALID_INPUT);

    return this.packageDao.getAllPackagesDao(limit, offset);
  }

  async updatePackageService(id: string, updateData: any): Promise<any> {
    console.log('services->v1->package.service->updatePackageService');
    if (!id || !updateData) throw new Error(errorResponse.INVALID_INPUT);

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(errorResponse.INVALID_INPUT);
    }

    const existingPackage = await this.packageDao.getPackageByIdDao(id);
    if (!existingPackage) {
      throw new Error(errorResponse.PACKAGE_NOT_FOUND);
    }

    return this.packageDao.updatePackageDao(id, updateData);
  }

  async deletePackageService(id: string): Promise<boolean> {
    console.log('services->v1->package.service->deletePackageService');
    console.log(id);

    if (!id) throw new Error(errorResponse.INVALID_INPUT);

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(errorResponse.INVALID_INPUT);
    }

    console.log('Package finding started');

    const existingPackage = await this.packageDao.getPackageByIdDao(id);
    console.log('Package finding ended');

    if (!existingPackage) {
      throw new Error(errorResponse.PACKAGE_NOT_FOUND);
    }

    await this.packageDao.deletePackageDao(id);
    return true;
  }

  async getPackagesByPriceRangeService(
    minPrice: number,
    maxPrice: number
  ): Promise<any> {
    console.log(
      'services->v1->package.service->getPackagesByPriceRangeService'
    );

    if (minPrice < 0 || maxPrice < 0 || minPrice > maxPrice) {
      throw new Error(errorResponse.INVALID_INPUT);
    }

    const rangePrice = await this.packageDao.getPackagesByPriceRangeDao(
      minPrice,
      maxPrice
    );
    console.log(rangePrice);

    return rangePrice;
  }

  async addFeatureToPackageService(id: string, feature: string): Promise<any> {
    console.log('services->v1->package.service->addFeatureToPackageService');

    console.log('from service', id, feature);

    if (!id || !feature) {
      throw new Error(errorResponse.INVALID_INPUT);
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(errorResponse.INVALID_INPUT);
    }

    const existingPackage = await this.packageDao.getPackageByIdDao(id);
    if (!existingPackage) {
      throw new Error(errorResponse.PACKAGE_NOT_FOUND);
    }

    const result = await this.packageDao.addFeatureToPackageDao(id, feature);
    console.log(result);

    return result;
  }

  async removeFeatureFromPackageService(
    id: string,
    feature: string
  ): Promise<any> {
    console.log(
      'services->v1->package.service->removeFeatureFromPackageService'
    );

    if (!id || !feature) {
      throw new Error(errorResponse.INVALID_INPUT);
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(errorResponse.INVALID_INPUT);
    }

    const existingPackage = await this.packageDao.getPackageByIdDao(id);
    if (!existingPackage) {
      throw new Error(errorResponse.PACKAGE_NOT_FOUND);
    }

    return this.packageDao.removeFeatureFromPackageDao(id, feature);
  }
}
