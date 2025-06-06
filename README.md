# Bubble Admin

Bubble Admin is a backend application designed to manage and administer various services, including Firebase integration, database entities, and cloud-based functionalities. This project is built using TypeScript and follows a modular structure for scalability and maintainability.

## Features

- **Firebase Integration**: Includes Firebase Admin SDK for database operations and authentication.
- **Database Management**: Handles multiple entities such as admins, applicants, blogs, files, and images.
- **Modular Architecture**: Organized into modules for better code separation and reusability.
- **Cloudinary Integration**: Provides support for cloud-based image and file management.
- **Configuration Management**: Centralized configuration files for environment variables, permissions, routes, and validators.

## Project Structure

```
Bubble Admin/
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies and scripts
├── README.md                # Project documentation
├── src/                     # Source code
│   ├── app.ts               # Application entry point
│   ├── bootstrap.ts         # Application bootstrap logic
│   ├── class.ts             # Shared classes
│   ├── config/              # Configuration files
│   │   ├── app.config.ts    # Application-specific configurations
│   │   ├── env.config.ts    # Environment configurations
│   │   ├── permissions.config.ts # Permissions configurations
│   │   ├── route.config.ts  # Route configurations
│   │   ├── subsidiaries.config.ts # Subsidiaries configurations
│   │   ├── validator.config.ts # Validation configurations
│   ├── database/            # Database-related files
│   │   ├── entities/        # Database entities
│   │   │   ├── admin.entities.ts
│   │   │   ├── applicants.entities.ts
│   │   │   ├── blog.entities.ts
│   │   │   ├── file.entities.ts
│   │   │   ├── images.entities.ts
│   │   │   └── ...
│   │   ├── index.ts         # Database initialization
│   ├── server.ts            # Server setup
│   ├── shared/              # Shared utilities and assets
│   │   ├── assets/          # Static assets
│   │   │   ├── email/       # Email templates
│   │   ├── cloudinary/      # Cloudinary integration
│   │   ├── errors/          # Error handling
│   │   ├── firebase/        # Firebase integration
│   │   ├── middleware/      # Middleware functions
│   │   ├── types/           # Type definitions
│   │   ├── utils/           # Utility functions
│   ├── v1/                  # API version 1 modules
│   │   ├── modules/         # Modular API endpoints
├── tsconfig.json            # TypeScript configuration
```

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/bubble-admin.git
   ```

2. Navigate to the project directory:

   ```sh
   cd bubble-admin
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Set up environment variables in the [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FFsl-apii%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%224a033315-9179-4e18-b089-1ebbad1f0aaa%22%5D "/Users/mac/Documents/Fsl-apii/.env") file.

## Usage

### Development

Start the development server:

```sh
yarn dev
```

### Production

Build the project:

```sh
yarn build
```

Start the production server:

```sh
yarn start
```

## Configuration

- **Environment Variables**: Define your Firebase credentials, database URLs, and other sensitive information in the [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FFsl-apii%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%224a033315-9179-4e18-b089-1ebbad1f0aaa%22%5D "/Users/mac/Documents/Fsl-apii/.env") file.
- **App Configurations**: Modify application-specific settings in [`src/config/app.config.ts`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fmac%2FDocuments%2FFsl-apii%2Fsrc%2Fconfig%2Fapp.config.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%224a033315-9179-4e18-b089-1ebbad1f0aaa%22%5D "/Users/mac/Documents/Fsl-apii/src/config/app.config.ts").

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md) to submit issues or pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.