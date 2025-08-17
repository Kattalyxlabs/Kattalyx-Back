import Package from '../../schema/v1/package.schema.js';
import { IPackage } from '../../types/schema/v1/package.type';

export default class PackageDao {
  private packageModel: typeof Package;

  constructor() {
    this.packageModel = Package;
  }

  // Get package by ID with timeout and error handling
  async getPackageByIdDao(packageId: string) {
    console.log('DAO: Starting getPackageByIdDao with packageId:', packageId);

    try {
      const packageData = await this.packageModel
        .findById(packageId)
        .maxTimeMS(5000); // 5 second timeout

      console.log('DAO: Query completed, package found:', !!packageData);
      return packageData;
    } catch (error) {
      console.error('DAO: Error in getPackageByIdDao:', error);
      throw error;
    }
  }

  // Get package by name
  async getPackageByNameDao(packageName: string) {
    return this.packageModel.findOne({ packageName });
  }

  // Create new package
  async createPackageDao(data: Partial<IPackage>) {
    return this.packageModel.create(data);
  }

  // Get all packages with pagination
  async getAllPackagesDao(limit: number = 10, offset: number = 0) {
    const packages = await this.packageModel.find().skip(offset).limit(limit);
    const total = await this.packageModel.countDocuments();
    console.log(`total packages:--->>>>${packages} 
      total:--->>>>${total}`);
    
    return { rows: packages, count: total };
  }

  // Get packages by price range
  async getPackagesByPriceRangeDao(minPrice: number, maxPrice: number) {
    return this.packageModel.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });
  }

  // Get packages with specific feature
  async getPackagesByFeatureDao(feature: string) {
    return this.packageModel.find({
      features: { $in: [feature] },
    });
  }

  // Update package by ID
  async updatePackageDao(packageId: string, updateData: Partial<IPackage>) {
    return this.packageModel.findByIdAndUpdate(packageId, updateData, {
      new: true,
    });
  }
  async getPackageInfo(packageId: string): Promise<any> {
    console.log('dao->v1->package.dao->getPackageInfo');

    try {
      const packageData = await Package.findById(packageId);
      console.log('Package found:', packageData);
      return packageData;
    } catch (error) {
      console.error('Error in getPackageInfo:', error);
      throw error;
    }
  }
  // Update package by name
  async updatePackageByNameDao(
    packageName: string,
    updateData: Partial<IPackage>
  ) {
    return this.packageModel.findOneAndUpdate({ packageName }, updateData, {
      new: true,
    });
  }

  // Add feature to package
  async addFeatureToPackageDao(packageId: string, feature: string) {
    return this.packageModel.findByIdAndUpdate(
      packageId,
      { $addToSet: { features: feature  } }, // $addToSet prevents duplicates
      { new: true }
    );
  }

  // Remove feature from package
  async removeFeatureFromPackageDao(packageId: string, feature: string) {
    return this.packageModel.findByIdAndUpdate(
      packageId,
      { $pull: { features: feature } },
      { new: true }
    );
  }

  // Delete package by ID
  async deletePackageDao(packageId: string) {
    return this.packageModel.deleteOne({ _id: packageId });
  }

  // Delete package by name
  async deletePackageByNameDao(packageName: string) {
    return this.packageModel.deleteOne({ packageName });
  }

  // Delete multiple packages by IDs
  async deleteMultiplePackagesDao(packageIds: string[]) {
    return this.packageModel.deleteMany({ _id: { $in: packageIds } });
  }

  // Get packages count
  async getPackagesCountDao() {
    return this.packageModel.countDocuments();
  }

  // Check if package exists by name
  async packageExistsDao(packageName: string) {
    const count = await this.packageModel.countDocuments({ packageName });
    return count > 0;
  }

  // Get packages sorted by price
  async getPackagesSortedByPriceDao(ascending: boolean = true, limit?: number) {
    const sort = ascending ? { price: 1 } : { price: -1 };
    let query = this.packageModel.find().sort();

    if (limit) {
      query = query.limit(limit);
    }

    return query;
  }

  // Search packages by name (partial match)
  async searchPackagesByNameDao(searchTerm: string) {
    return this.packageModel.find({
      packageName: { $regex: searchTerm, $options: 'i' },
    });
  }

  // Bulk create packages
  async bulkCreatePackagesDao(packages: Partial<IPackage>[]) {
    return this.packageModel.insertMany(packages);
  }

  // Get package statistics
  async getPackageStatsDao() {
    const stats = await this.packageModel.aggregate([
      {
        $group: {
          _id: null,
          totalPackages: { $sum: 1 },
          averagePrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          totalFeatures: { $sum: { $size: '$features' } },
        },
      },
    ]);

    return (
      stats[0] || {
        totalPackages: 0,
        averagePrice: 0,
        minPrice: 0,
        maxPrice: 0,
        totalFeatures: 0,
      }
    );
  }
}
