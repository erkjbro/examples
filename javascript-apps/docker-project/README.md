# Generic React + Node/Express App Skeleton

### [Connect a React frontend and a Node/Express backend](https://medium.com/free-code-camp/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c)

- Uses `create-react-app` to create the frontend client
- Uses `express-generator` to create the backend api
- I made some edits, such as using `local.config.json` in the client to
hold the api url

---

### [Create a full stack MERN app using Docker](https://www.freecodecamp.org/news/create-a-fullstack-react-express-mongodb-app-using-docker-c3e3e21c4074/)

- NOT DONE YET!
- add a mongodb database using the mongo image

- ISSUE: I have mongodb installed with Ubuntu on WSL, but there seems to be a problem with 
file system access that causes errors when running `docker-compose up` to get the containers 
running. I believe this will be fixed when `WSL 2` and the updated version of `Docker Desktop` are both released.