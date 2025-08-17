import { Request, Response } from 'express';
import PackageService from '../../services/v1/package.service.js';
import statusCode from '../../constant/common/statusCode.js';
import errorResponse from '../../constant/common/error.js';

export default class PackageController {
  private packageService: PackageService;

  constructor() {
    this.packageService = new PackageService();
  }

  async getPackageInfoController(req: Request, res: Response): Promise<void> {
    console.log('controller->v1->package.controller->getPackageInfoController');

    try {
      console.log('req.params:', req.params);
      console.log('req.body:', req.body);
      console.log('req.query:', req.query);
      const { packageId } = req.params;
      console.log(packageId);

      const data = await this.packageService.getPackageInfoService(packageId);
      res.status(statusCode.OK).send({
        message: 'Package information fetched successfully',
        data: data,
      });
      console.log('from the service', data);
    } catch (error: any) {
      console.log(error);

      if (error.message === errorResponse.INVALID_INPUT) {
        res
          .status(statusCode.BAD_REQUEST)
          .send({ message: errorResponse.INVALID_INPUT });
      } else if (error.message === errorResponse.PACKAGE_NOT_FOUND) {
        res
          .status(statusCode.NOT_FOUND)
          .send({ message: errorResponse.PACKAGE_NOT_FOUND });
      } else {
        res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send({ message: errorResponse.INTERNAL_SERVER_ERROR });
      }
    }
  }

  async createPackageController(req: Request, res: Response): Promise<void> {
    console.log('controller->v1->package.controller->createPackageController');

    try {
      const data = await this.packageService.createPackageService(req.body);
      res.status(statusCode.CREATED).send({
        message: 'Package successfully created',
        data: data,
      });
    } catch (error: any) {
      console.log(error);

      if (error.message === errorResponse.INVALID_INPUT) {
        res
          .status(statusCode.BAD_REQUEST)
          .send({ message: errorResponse.INVALID_INPUT });
      } else if (error.message === errorResponse.PACKAGE_ALREADY_EXIST) {
        res
          .status(statusCode.UNAUTHORIZED)
          .send({ message: errorResponse.PACKAGE_ALREADY_EXIST });
      } else {
        res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send({ message: errorResponse.INTERNAL_SERVER_ERROR });
      }
    }
  }

  async getPackageByNameController(req: Request, res: Response): Promise<void> {
    console.log(
      'controller->v1->package.controller->getPackageByNameController'
    );

    const { packageName } = req.params;
    console.log(packageName);

    try {
      const packageData = await this.packageService.getPackageByNameService(
        packageName
      );
      res
        .status(statusCode.OK)
        .send({ message: 'Package found', data: packageData });
    } catch (error: any) {
      console.log(error);
      if (error.message === errorResponse.INVALID_INPUT) {
        res
          .status(statusCode.BAD_REQUEST)
          .send({ message: errorResponse.INVALID_INPUT });
      } else if (error.message === errorResponse.PACKAGE_NOT_FOUND) {
        res
          .status(statusCode.NOT_FOUND)
          .send({ message: errorResponse.PACKAGE_NOT_FOUND });
      } else {
        res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send({ message: errorResponse.INTERNAL_SERVER_ERROR });
      }
    }
  }

  async updatePackageController(req: Request, res: Response): Promise<void> {
    console.log('controller->v1->package.controller->updatePackageController');

    const { id } = req.params;
    const updateData = req.body;

    try {
      const updatedPackage = await this.packageService.updatePackageService(
        id,
        updateData
      );
      res.status(statusCode.OK).send({
        message: 'Package updated successfully',
        data: updatedPackage,
      });
    } catch (error: any) {
      console.log(error);
      if (error.message === errorResponse.INVALID_INPUT) {
        res
          .status(statusCode.BAD_REQUEST)
          .send({ message: errorResponse.INVALID_INPUT });
      } else if (error.message === errorResponse.PACKAGE_NOT_FOUND) {
        res
          .status(statusCode.NOT_FOUND)
          .send({ message: errorResponse.PACKAGE_NOT_FOUND });
      } else {
        res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send({ message: errorResponse.INTERNAL_SERVER_ERROR });
      }
    }
  }

  async deletePackageController(req: Request, res: Response): Promise<void> {
    console.log('controller->v1->package.controller->deletePackageController');

    const { id } = req.params;

    try {
      await this.packageService.deletePackageService(id);
      res.status(statusCode.OK).send({
        message: 'Package deleted successfully',
      });
    } catch (error: any) {
      console.log(error);
      if (error.message === errorResponse.PACKAGE_NOT_FOUND) {
        res
          .status(statusCode.NOT_FOUND)
          .send({ message: errorResponse.PACKAGE_NOT_FOUND });
      } else {
        res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send({ message: errorResponse.INTERNAL_SERVER_ERROR });
      }
    }
  }

  async getPackageByIdController(req: Request, res: Response): Promise<void> {
    console.log('controller->v1->package.controller->getPackageByIdController');

    try {
      const { id } = req.params;
      const packageData = await this.packageService.getPackageByIdService(id);

      res.status(statusCode.OK).send({
        message: 'Package fetched successfully',
        data: packageData,
      });
    } catch (error: any) {
      console.log(error);
      if (error.message === errorResponse.INVALID_ID) {
        res
          .status(statusCode.BAD_REQUEST)
          .send({ message: errorResponse.INVALID_ID });
      } else if (error.message === errorResponse.PACKAGE_NOT_FOUND) {
        res
          .status(statusCode.NOT_FOUND)
          .send({ message: errorResponse.PACKAGE_NOT_FOUND });
      } else {
        res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send({ message: errorResponse.INTERNAL_SERVER_ERROR });
      }
    }
  }

  async getAllPackagesController(req: Request, res: Response): Promise<void> {
    console.log('controller->v1->package.controller->getAllPackagesController');

    try {
      const { limit = 10, offset = 0 } = req.query;
      const packages = await this.packageService.getAllPackagesService(
        Number(limit),
        Number(offset)
      );

      res.status(statusCode.OK).send({
        message: 'Packages fetched successfully',
        data: packages,
      });
    } catch (error: any) {
      console.log(error);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send({ message: errorResponse.INTERNAL_SERVER_ERROR });
    }
  }

  async getPackagesByPriceRangeController(
    req: Request,
    res: Response
  ): Promise<void> {
    console.log(
      'controller->v1->package.controller->getPackagesByPriceRangeController'
    );

    try {
      const { minPrice = 0, maxPrice = 1000 } = req.query;
      const packages = await this.packageService.getPackagesByPriceRangeService(
        Number(minPrice),
        Number(maxPrice)
      );

      res.status(statusCode.OK).send({
        message: 'Packages fetched by price range successfully',
        data: packages,
      });
    } catch (error: any) {
      console.log(error);
      if (error.message === errorResponse.INVALID_INPUT) {
        res
          .status(statusCode.BAD_REQUEST)
          .send({ message: errorResponse.INVALID_INPUT });
      } else {
        res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send({ message: errorResponse.INTERNAL_SERVER_ERROR });
      }
    }
  }

  async addFeatureToPackageController(
    req: Request,
    res: Response
  ): Promise<void> {
    console.log(
      'controller->v1->package.controller->addFeatureToPackageController'
    );

    try {
      const { id } = req.params;
      const { feature } = req.body;
      console.log('controller', id, req.body);

      const updatedPackage =
        await this.packageService.addFeatureToPackageService(id, feature);

      res.status(statusCode.OK).send({
        message: 'Feature added to package successfully',
        data: updatedPackage,
      });
    } catch (error: any) {
      console.log(error);
      if (error.message === errorResponse.INVALID_INPUT) {
        res
          .status(statusCode.BAD_REQUEST)
          .send({ message: errorResponse.INVALID_INPUT });
      } else if (error.message === errorResponse.PACKAGE_NOT_FOUND) {
        res
          .status(statusCode.NOT_FOUND)
          .send({ message: errorResponse.PACKAGE_NOT_FOUND });
      } else {
        res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send({ message: errorResponse.INTERNAL_SERVER_ERROR });
      }
    }
  }

  async removeFeatureFromPackageController(
    req: Request,
    res: Response
  ): Promise<void> {
    console.log(
      'controller->v1->package.controller->removeFeatureFromPackageController'
    );

    try {
      const { id } = req.params;
      const { feature } = req.body;

      const updatedPackage =
        await this.packageService.removeFeatureFromPackageService(id, feature);

      res.status(statusCode.OK).send({
        message: 'Feature removed from package successfully',
        data: updatedPackage,
      });
    } catch (error: any) {
      console.log(error);
      if (error.message === errorResponse.INVALID_INPUT) {
        res
          .status(statusCode.BAD_REQUEST)
          .send({ message: errorResponse.INVALID_INPUT });
      } else if (error.message === errorResponse.PACKAGE_NOT_FOUND) {
        res
          .status(statusCode.NOT_FOUND)
          .send({ message: errorResponse.PACKAGE_NOT_FOUND });
      } else {
        res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send({ message: errorResponse.INTERNAL_SERVER_ERROR });
      }
    }
  }
}
