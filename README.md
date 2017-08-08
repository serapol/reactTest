## Simple 2gis map manager

## <a name="serverContains"></a> Server contains

- [x] [Nodejs](https://nodejs.org) with [Express](https://github.com/expressjs).
- [x] Authentication with [Passport](https://github.com/jaredhanson/passport) and [JWT](https://github.com/auth0/node-jsonwebtoken).
- [x] [Mongodb](https://github.com/mongodb/mongo) database with [Mongoose](https://github.com/Automattic/mongoose).

## <a name="ClientContains"></a> Client contains

- [x] [React](https://facebook.github.io/react/) & React-dom.
- [x] [React-Router](https://github.com/ReactTraining/react-router).
- [x] [Redux](https://github.com/reactjs/redux).
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension),
like redux-devtools but perhaps better. (2k stars)

## <a name="running"></a> Install the app

1. `npm install` from root.
2. Install mongodb and configure config/server.config.js

#### Running the app 

With Webpack-dev-server:
- `npm run start` on one process to start the webpack-dev-server on port 3030.
- `npm run server` to start the server on port 5000.
- Point browser to `localhost:3030` to start app.

#### Production build 
- `npm run build`.
