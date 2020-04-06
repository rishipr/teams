# Teams

Project management platform for teams, inspired by [Asana](https://asana.com/) and built using a full JavaScript stack

## Demo

[Go to Demo](https://protected-eyrie-72642.herokuapp.com/) and create your own account or use `username: t@test.com` and `password: test123`. The demo is hosted on Heroku using their free tier. Thus, it may take 20-30 seconds for the Heroku dyno to wake up since it sleeps after 30 minutes of inactivity.

![Current Status](http://g.recordit.co/yx3oC8wmK3.gif)

## Stack (MERN & Redux)

This project uses the following technologies

- [MongoDB](https://www.mongodb.com/) for database (hosted on [mLab](https://mlab.com/)) & [Mongoose](https://mongoosejs.com/)
- [Express.js](http://expressjs.com/) as Node web framework
- [React.js](https://reactjs.org) for client, [React Router](https://reacttraining.com/react-router/) for routing & [Redux](https://redux.js.org/basics/usagewithreact) for state management
- [Node.js](https://nodejs.org/en/) for server
- [SASS](https://sass-lang.com/) as CSS preprocessor (no CSS frameworks)
- [Create React App](https://github.com/facebook/create-react-app) for bootstrapping client

### Progress

#### General

- [x] Authentication
- [x] Dashboard view

#### Projects

- [x] Create and fetch team projects
- [x] Edit team projects
- [x] Delete team projects (only project owner should be able to delete)
- [x] Access shared projects

#### Tasks

- [x] Create, set deadlines for and assign tasks for teams
- [x] Update tasks
- [x] Complete and delete tasks

#### Containerization & Deployment

- [x] Deployment (Heroku)

## Quick Start

Get up and running with a development server using the following commands

```javascript
// Install all dependencies for client & server
npm run full-install

// Run client & development server with concurrently
npm run dev

// Assumes Node and npm are installed on machine
// Server runs on http://localhost:5000 (set in server.js) and client on http://localhost:3000 (default for Create React App)
```
