# MERN Snippet Manager

This project is a MERN (MongoDB, Express, React, Node.js) application that empowers users to perform CRUD operations seamlessly. 
Leveraging the power of MongoDB, Express.js, React, and Node.js, users can effortlessly create, read, update, and delete data. 
Moreover, the application enables users to store and manage their code snippets efficiently, making it a convenient platform for developers to save and access reusable code fragments.

## Features

- User registration and authentication
- Create, update, and delete folders
- Create, update, and delete code snippets within folders
- Search functionality to find snippets by title or content
- Syntax highlighting for code snippets
- User-friendly and responsive user interface

## Technologies Used

- **MongoDB**: A NoSQL database used to store user data, folders, and snippets.
- **Express**: A backend framework for building RESTful APIs to handle HTTP requests and responses.
- **React**: A JavaScript library for building user interfaces.
- **Node.js**: A runtime environment for running JavaScript code on the server-side.
- **React Router**: A library used for handling routing in the client-side of the application.
- **Axios**: A library used for making HTTP requests to the backend API.
- **Monaco-Editor**: A versatile text editor used for displaying and editing code snippets.
- **JWT**: JSON Web Tokens used for user authentication and authorization.
- **Bcrypt**: A library used for hashing and salting user passwords.

## Installation

Follow these steps to run the MERN Snippet Manager locally:

1. Clone the repository:

   ```
   git clone [https://github.com/Mahesh-Uppunuthula/Snippets]
   ```

2. Install the dependencies in the server and client directories:

   ```
   cd mern-snippet-manager/server
   npm install

   cd ../client
   npm install
   ```

3. Create a `.env` file in the `server` directory and set the following environment variables:

   ```
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the server:

   ```
   cd ../server
   npm start
   ```

5. Start the client:

   ```
   cd ../client
   npm start
   ```

6. Open your web browser and access the application at `http://localhost:3000`.

## API Endpoints

The following API endpoints are available:

- `POST /register` - Register a new user
- `POST /login` - Login and generate a JWT token
- `GET /dashboard` - Get all folders for the authenticated user
- `GET /dashboard/:id` - Get a all the snippets inside the folder
- `POST /dashboard` - Create a new folder
- `DELETE /dashboard/:id` - Delete a folder by ID
- `GET /editor/:id` - Get a specific snippet by ID
- `POST /editor` - Create a new snippet
- `PUT /editor/:id` - Update a snippet by ID
- `DELETE /editor/:id` - Delete a snippet by ID

## Contributing

Contributions to the MERN Snippets project are welcome! If you find any issues or have suggestions for improvements, please submit an issue or create a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use and modify it according to your needs.

## Contact

If you have any questions or need further assistance, please
