# Backend-Gym

This is a project that uses the Express.js framework and MongoDB to create a REST-Ful API. It allows managing operations of a gym.

## General Description

The application manages resources and provides basic CRUD (Create, Read, Update, Delete) operations for users, equipment and plans.

## Project Structure

The project is organized as follows:
- `index.js`: Application entry point.
- `package.json`: Dependency management files.
- `controllers/`: All controllers
- `middleware/`: Custom middleware.
- `models/`: Data model definitions.
- `routes/`: Application routes definitions.
- `.env`: Env file `(you need create this file)`
- `.env.sample`: Configuration file sample with environment variables for .env file.

## Requirements

- Make sure you have Node installed and the dependencies defined in the `package.json` file.
- Make sure you have MongoDB installed and check MongoDB connection configuration.

## Use (local)

1. Clone this repository or download the source code.
2. Make sure all dependencies are installed.
3. Start the application using `npm run dev`.
4. The API will be available at `http://localhost:3000`.

## API Routes
### Authentication

- `POST /api/v2/auth/sign-in`: Sign in
- `POST /api/v2/auth/sign-up`: Sign up

### Admin

- `POST /api/v2/admin/create-admin`: Create Admin.
- `POST /api/v2/admin/create-coach`: Create Coach.
- `POST /api/v2/admin/create-member/plan/:id`: Create Member.
- `GET /api/v2/admin/users`: Get All Users.
- `POST /api/v2/admin/create-admin`: Create Admin.
- `POST /api/v2/admin/create-coach`: Create Coach.
- `POST /api/v2/admin/create-member/plan/:id`: Create Member.
- `GET /api/v2/admin/users`: Get All Users.
- `GET /api/v2/admin/users/:id`: Get User by ID.
- `POST /api/v2/admin/create-payment`: Create Payment.
- `POST /api/v2/admin/create-equipment`: Create Equipment.
- `POST /api/v2/admin/create-plan`: Create Plan.
- `GET /api/v2/admin/plans`: Get All Plans.
- `GET /api/v2/admin/sales-report`: Get Sales Report.
- `GET /api/v2/admin/users/:id/generate-access-credentials`: Generate Access Credentials for a User.
- `DELETE /api/v2/admin/users/:id`: Delete User by ID.
- `PUT /api/v2/admin/users/:id`: Update User by ID.
- `PUT /api/v2/admin/users/:id/change-password`: Update User Password by ID.
- `PUT /api/v2/admin/memberships`: Associate User with Plan.

## Contribution

If you would like to contribute to this project, feel free to do so.

You can open an issue, submit a pull request, or work on improvements or new features.

All contributions are welcome!

## License

This project is licensed under the MIT License. You can find more details in the [LICENSE](LICENSE) file.

## Contact

If you have any questions or comments, feel free to contact me via my email address or the GitHub repository.

Thank you for your interest in this project!
