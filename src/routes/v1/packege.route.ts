import express from 'express';
import PackageController from '../../controller/v1/package.controller.js';

const route = express.Router();
const packageController = new PackageController();

// ✅ SPECIFIC ROUTES FIRST - These must come before /:id

// Get all packages (with pagination)
route.get('/all', (req, res) =>
  packageController.getAllPackagesController(req, res)
); // done

// Get packages by price range
route.get('/price-range', (req, res) =>
  packageController.getPackagesByPriceRangeController(req, res)
); // done

// Get package info by packageId
route.get('/info/:packageId', (req, res) =>
  packageController.getPackageInfoController(req, res)
); // done

// Get package by name
route.get('/name/:packageName', (req, res) =>
  packageController.getPackageByNameController(req, res)
); // done

// Create package
route.post('/create', (req, res) =>
  packageController.createPackageController(req, res)
); // done

// Add feature to package
route.post('/:id/add-feature', (req, res) =>
  packageController.addFeatureToPackageController(req, res)
); // done

// Remove feature from package
route.post('/:id/remove-feature', (req, res) =>
  packageController.removeFeatureFromPackageController(req, res)
); // done;

// ✅ PARAMETERIZED ROUTES LAST - These should come after specific routes

// Update package
route.put('/:id', (req, res) =>
  packageController.updatePackageController(req, res)
); // done

// Delete package
route.delete('/:id', (req, res) =>
  packageController.deletePackageController(req, res)
); // done

// Get package by ID - THIS MUST BE LAST among GET routes
route.get('/:id', (req, res) =>
  packageController.getPackageByIdController(req, res)
); // done

export default route;
