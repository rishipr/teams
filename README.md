# Teams

Project management platform for teams, inspired by [Asana](https://asana.com/) and built using a full JavaScript stack

## Stack (MERN & Redux)

This project uses the following technologies

- [MongoDB](https://www.mongodb.com/) for database (hosted on [mLab](https://mlab.com/)) & [Mongoose](https://mongoosejs.com/)
- [Express.js](http://expressjs.com/) as Node web framework
- [React.js](https://reactjs.org) for client, [React Router](https://reacttraining.com/react-router/) for routing & [Redux](https://redux.js.org/basics/usagewithreact) for state management
- [Node.js](https://nodejs.org/en/) for server
- [SASS](https://sass-lang.com/) as CSS preprocessor

## Current Status

![Current Status](http://g.recordit.co/zkU9sqo24G.gif)

### Checklist

This list will change & grow with time

#### General

- [x] Authentication
- [x] Dashboard view

#### Projects

- [x] Create and fetch team projects
- [x] Edit team projects
- [x] Delete team projects (only project owner should be able to delete)
- [x] Access shared projects

#### Tasks

- [x] Create, assign, view and set deadlines for team tasks
- [ ] View and edit all teams tasks and personal tasks
- [ ] Complete tasks

#### Containerization & Deployment

- [ ] Docker
- [ ] Deployment (AWS, Heroku, or Digital Ocean)

## Quick Start

Get up and running with a development server using the following commands

```javascript
// Install all dependencies for client & server
npm run full-install

// Run client & development server with concurrently
npm run dev

// Server runs on http://localhost:5000 (set in server.js) and client on http://localhost:3000 (default for CRA)
```
