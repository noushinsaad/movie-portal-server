# 🎥 Movie Portal Server

A RESTful API built with **Node.js** and **Express** to manage movies in a MongoDB database. The server allows adding, updating, deleting, and retrieving movie data and includes functionality for user interactions such as liking/unliking a movie.

---

## 🚀 Features
- Retrieve a list of all movies.
- Retrieve detailed information about a specific movie.
- Add a new movie to the collection.
- Update movie details.
- Like or unlike a movie.
- Delete a movie from the collection.

---

## 📂 Project Structure
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Environment Configuration:** dotenv

---

## 🛠 Prerequisites
To run this project, ensure you have the following installed:
- **Node.js:** Version 14+ recommended.
- **MongoDB:** A running MongoDB instance.
- **npm:** Comes with Node.js.

---

## 🔧 Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo-url.git
   cd your-repo-folder
## 🛠 Install Dependencies

Run the following command to install the required dependencies:
```bash
npm install
⚙️ Environment Setup
Create a .env file in the root directory with the following variables:

plaintext
Copy code
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
PORT=5000
🚀 Usage
To start the server locally, use the following command:

bash
Copy code
node index.js
The server will run at:

plaintext
Copy code
http://localhost:5000
📡 API Documentation
Endpoints
Get All Movies
http
Copy code
GET /movies
Returns all movies in the database.

Get Movie by ID
http
Copy code
GET /movies/:id
Params:

id (required): The unique ID of the movie.
Returns the details of the movie corresponding to the given ID.

Add New Movie
http
Copy code
POST /movies
Request Body Example:

json
Copy code
{
  "posterURL": "image-url",
  "title": "Inception",
  "genre": "Sci-Fi",
  "duration": "2h 28m",
  "releasingYear": "2010",
  "ratings": 8.8,
  "summary": "A mind-bending thriller.",
  "updaterName": "Admin"
}
Adds a new movie to the collection.

Update Movie
http
Copy code
PUT /movies/:id
Params:

id (required): The unique ID of the movie.
Updates a movie based on the provided ID with a new payload.

Like a Movie
http
Copy code
PATCH /movies/:id
Request Body Example:

json
Copy code
{
  "likedBy": ["user1@example.com"]
}
Adds a user's email to the likedBy list of the movie.

Unlike a Movie
http
Copy code
PATCH /movies/:id/unlike
Request Body Example:

json
Copy code
{
  "email": "user1@example.com"
}
Removes a user's email from the likedBy list of the movie.

Delete Movie
http
Copy code
DELETE /movies/:id
Params:

id (required): The unique ID of the movie.
Deletes the specified movie from the database.

📜 Environment Variables
Variable	Description
DB_USER	Your MongoDB username
DB_PASS	Your MongoDB password
PORT	The port on which the server runs
🔒 Security Notes
Always include the .env file in your .gitignore file to avoid exposing sensitive data.
Use a restricted database user with limited access.
Regularly update your dependencies:
bash
Copy code
npm outdated
npm update
⚙️ Development Notes
Ensure that MongoDB Atlas is set up or use a local MongoDB instance:
bash
Copy code
sudo apt install mongodb
Enable strict API versioning in MongoDB to handle deprecation warnings.
🤝 Contributing
Fork this repository and clone it locally:
bash
Copy code
git clone https://github.com/your-username/your-repo.git
Create a new branch for your feature:
bash
Copy code
git checkout -b feature-name
Commit your changes:
bash
Copy code
git add .
git commit -m "Add new feature"
Push your changes to GitHub:
bash
Copy code
git push origin feature-name
Open a pull request and describe your changes.
