const errorResponse = {
  // Authentication & Authorization Errors
  USER_ALREADY_EXIST: 'User already exists',
  USER_NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  UNAUTHORIZED_ACCESS: 'Unauthorized access',
  FORBIDDEN_ACCESS: 'Forbidden access',
  TOKEN_EXPIRED: 'Authentication token has expired',
  TOKEN_INVALID: 'Invalid authentication token',
  ACCOUNT_LOCKED: 'User account is locked',
  ACCOUNT_DISABLED: 'User account is disabled',
  SESSION_EXPIRED: 'User session has expired',

  VENDOR_ALREADY_EXIST: 'Vendor already exists',
  VENDOR_NOT_FOUND: 'Vendor not found',

  // Validation Errors
  BAD_REQUEST: 'Bad request',
  INVALID_INPUT: 'Invalid input provided',
  MISSING_REQUIRED_FIELDS: 'Missing required fields',
  INVALID_EMAIL: 'Invalid email format',
  INVALID_PHONE: 'Invalid phone number',
  INVALID_PASSWORD: 'Password does not meet security requirements',
  UNPROCESSABLE_ENTITY: 'Unprocessable entity',
  INVALID_ID: 'Invalid ID format',
  INVALID_PAGINATION: 'Invalid pagination parameters',

  // Resource Errors
  RESOURCE_NOT_FOUND: 'Requested resource not found',
  DUPLICATE_RESOURCE: 'Duplicate resource detected',
  CONFLICT_ERROR: 'Conflict with existing data',
  OPERATION_NOT_ALLOWED: 'Operation not allowed',
  DATA_INTEGRITY_VIOLATION: 'Data integrity violation',
  DEPENDENT_RESOURCE_EXISTS:
    'Cannot delete resource as dependent resources exist',

  // Server Errors
  INTERNAL_SERVER_ERROR: 'Internal server error',
  SERVICE_UNAVAILABLE: 'Service unavailable',
  BAD_GATEWAY: 'Bad gateway',
  GATEWAY_TIMEOUT: 'Gateway timeout',
  DATABASE_CONNECTION_FAILED: 'Database connection failed',
  REQUEST_TIMEOUT: 'Request timeout',
  UNKNOWN_ERROR: 'An unknown error occurred',

  // Rate Limiting & Throttling
  TOO_MANY_REQUESTS: 'Too many requests, please try again later',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded',

  // File & Upload Errors
  FILE_TOO_LARGE: 'File size exceeds the allowed limit',
  UNSUPPORTED_FILE_TYPE: 'Unsupported file type',
  FILE_UPLOAD_FAILED: 'File upload failed',
  FILE_NOT_FOUND: 'File not found',
  FILE_CORRUPTED: 'Uploaded file is corrupted',

  // Payment & Transaction Errors
  PAYMENT_FAILED: 'Payment failed',
  INVALID_PAYMENT_METHOD: 'Invalid payment method',
  INSUFFICIENT_FUNDS: 'Insufficient funds',
  TRANSACTION_ERROR: 'Transaction processing error',

  // Feature-Specific Errors (if applicable)
  PASSWORD_RESET_FAILED: 'Password reset failed',
  EMAIL_NOT_VERIFIED: 'Email has not been verified',
  ACTION_NOT_PERMITTED: 'This action is not permitted',
  RESOURCE_LOCKED: 'Resource is locked',

  // Menu Specific Errors
  MENU_NOT_FOUND: 'Menu not found',
  MENU_ITEMS_REQUIRED: 'Menu items are required',
  MENU_VENDOR_REQUIRED: 'Vendor ID is required',
  INVALID_MENU_ITEM_FORMAT: 'Invalid menu item format',
  INVALID_MENU_PRICE: 'Menu item price must be greater than 0',
  INVALID_MENU_QUANTITY: 'Menu item quantity must be greater than 0',
  DUPLICATE_MENU_ITEM_ID: 'Duplicate menu item IDs found',
  INVALID_MENU_CATEGORY: 'Invalid menu category',
  VENDOR_NOT_AUTHORIZED: 'Vendor not authorized to modify this menu',

  // Subscription Package Specific Errors
  PACKAGE_NOT_FOUND: 'Subscription package not found',
  PACKAGE_ALREADY_EXISTS:
    'Package with this name already exists for this vendor',
  PACKAGE_ALREADY_EXIST: 'Package already exists',
  INVALID_PACKAGE_PRICE: 'Package price must be greater than 0',
  INVALID_PACKAGE_DURATION: 'Package duration must be at least 1 day',
  INVALID_MENU_ITEMS: 'Invalid menu items structure provided',
  PACKAGE_NAME_REQUIRED: 'Package name is required',
  INVALID_PACKAGE_STATUS:
    "Invalid package status. Must be 'Active' or 'Inactive'",
  NO_MEAL_ITEMS: 'At least one meal item (breakfast/lunch/dinner) is required',
  DUPLICATE_MENU_ITEMS: 'Duplicate menu items found in package',
  VENDOR_PACKAGE_LIMIT_EXCEEDED: 'Vendor has reached maximum allowed packages',
  INVALID_PACKAGE_UPDATE: 'Cannot update package - active subscriptions exist',
};

export default errorResponse;
