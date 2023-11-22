<h1> BreadFast-API

This Repository includes a Dockerfile for the single end-point.

<h1> Description of solution:

A single GET request endpoint at /book/:isbn where :isbn is a route parameter representing the ISBN of a book. Axios library is used to make the GET request to Open Library API. We GET the book and display it as JSON.

<h4>REDIS a caching mechanism is also implemented with a cache expiration time set to 1 hour (60 minutes by 60 seconds).

<h2> To containerize the application:

1. Open a terminal or CMD.
2. Navigate to the directory containing the Dockerfile.
3. Build the Docker image by running the: docker build -t containerName
4. Once the Docker image is built, run container based on the image using run -p 3000:3000 containerName
5. The container should be running and accessible at http://localhost:3000/book/{isbn} where {isbn} should be repalced by the actual ISBN for the Book.