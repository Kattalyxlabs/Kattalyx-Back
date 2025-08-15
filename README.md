
# Kattalyxlabs

This is a TypeScript backend project for the Kattalyxlabs application, utilizing Express, Sequelize, and Swagger for API documentation.

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v12 or higher)
- npm (Node Package Manager)

## Getting Started

Follow these steps to set up and run the project:

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/aahar-backend.git
cd aahar-backend/backend
```

### 2. Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

### 3. Build the Project

Compile the TypeScript files into JavaScript:

```bash
npm run build
```

### 4. Check the `dist` Folder

Before starting the project, check the contents of the `dist` folder to ensure that the compiled files are present:

```bash
ls dist
```
*(Use `dir dist` on Windows)*

### 5. Start the Project

To start the project in development mode, run:

```bash
npm run dev
```

### Alternative Commands

If `npm run build` or `npm run dev` does not work, you can try the following commands:

- **Manually Build the Project**:
  If the build command is not working, you can manually compile the TypeScript files using:

  ```bash
  npx tsc
  ```

- **Run the Compiled Code**:
  If the development server does not start, you can run the compiled JavaScript directly:

  ```bash
  node dist/App.js
  ```

### 6. Access the API

Once the server is running, you can access the API at:

- **Base URL**: `http://localhost:5000/`
- **API Documentation**: `http://localhost:5000/api-docs`

## Troubleshooting

If you encounter any issues, consider the following:

- Ensure that all dependencies are installed correctly.
- Check the console for any error messages and address them accordingly.
- Make sure your database configuration in `config/database.config.js` is correct.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Notes:
- Replace `https://github.com/yourusername/aahar-backend.git` with the actual URL of your repository.

- You can add more sections as needed, such as contributing guidelines, testing instructions, or additional features of your application.

