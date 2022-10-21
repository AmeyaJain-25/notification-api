# Notification API

This is a simple FCM (Google Firebase Cloud Messaging) Push Notifications API application for sending notifications to users. This REST api's are built using Node.js, so that it can be used in any platform.

The code consists of two parts:

- notification-api-backend: This is the REST api's for sending notifications to users.
- notification-api-frontend: This is the frontend web application to receive notifications. NOTE: This can be any client such as mobile app, web app, etc.

In this application, I have used the following technologies:

- `BACKEND` (notification-api-backend):

  - `Node.js`
  - `Express.js`
  - `MongoDB` (To store the user's device token! You can store this in the user model in your application)
  - `Mongoose` (To interact with MongoDB)
  - `Firebase Admin SDK` (To connect to Firebase and send notifications)
  - `Typescript` (To write type safe code)

- `FRONTEND` (notification-api-frontend) : This is a simple web application to receive notifications. You can use this as a reference to build your own client/admin application.

  - `React.js` Client side application to get FCM token from the browser and send it to the backend for receiving notifications on this device's token.
  - `Typescript` (For type safety)
  - `Tailwind CSS` (For styling)
  - `Firebase SDK` (To connect to Firebase and receive notifications)

# Firebase Setup

- Create a Firebase project
- Enable the Cloud Messaging service in the Firebase roject
- Get the SDK configuration file (firebaseConfig) from the Firebase project settings
- Generate a VAPID key from the Firebase project settings by clicking on the "Generate Key" button under the "Web Push Certificates" section under the "Cloud Messaging" tab.

## Installation

- Clone the repository
- Install the dependencies for both `notification-api-backend` and `notification-api-frontend` using `npm install` or `yarn install`
- Create a `.env` file in the `notification-api-backend` folder and add the following environment variables:

  - `NODE_ENV` = `development` or `production`
  - `MONGO_URI` = `Your MongoDB connection string`
  - `PORT` = `Port number for the backend server`
  - `FIREBASE_PROJECT_ID` = `Your Firebase project ID`
  - `FIREBASE_PRIVATE_KEY` = `Your Firebase private key`
  - `FIREBASE_CLIENT_EMAIL` = `Your Firebase client email`

- Create a `.env` file in the `notification-api-frontend` folder and add the following environment variables:

  - `REACT_APP_API_BASE_URL` = `Base URL for the backend server`
  - `REACT_APP_FIREBASE_API_KEY` = `Firebase API Key`
  - `REACT_APP_FIREBASE_AUTH_DOMAIN` = `Firebase Auth Domain`
  - `REACT_APP_FIREBASE_PROJECT_ID` = `Firebase Project ID`
  - `REACT_APP_FIREBASE_STORAGE_BUCKET` = `Firebase Storage Bucket`
  - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` = `Firebase Messaging Sender ID`
  - `REACT_APP_FIREBASE_APP_ID` = `Firebase App ID`
  - `REACT_APP_FIREBASE_VAPID_KEY` = `Firebase VAPID Key` (You can get this from the Firebase console settings by generating one for cloud messaging.)

- Similarly add the firebase config variables in the `notification-api-frontend/public/firebase-messaging-sw.js` file.
- Run the backend server by running `npm start` or `yarn start` in the `notification-api-backend` folder
- Run the frontend server by running `npm start` or `yarn start` in the `notification-api-frontend` folder

# Features Available

1. Send notifications to a single user
2. Send notifications to all users
3. Send notifications to a topic
4. Subscribe a user to a topic
5. Unsubscribe a user from a topic

# Working

- The frontend application will ask for the user's permission to receive notifications. If the user allows, the application will get the FCM token from the browser and send it to the backend server. The backend server will store this token in the database. This token will be used to send notifications to this user. NOTE: You can store this token in the user model in your application. This is just for demo purpose.
- The backend server has API's to send notifications to a single user, all users, and a topic. You can use these API's to send notifications to your users. You can also subscribe a user to a topic and unsubscribe a user from a topic. You can use these API's to send notifications to a group of users. For example, you can create a topic called "New Users" and subscribe all the new users to this topic. Then you can send notifications to this topic whenever you want to send notifications to all the new users. You can also create a topic called "All Users" and subscribe all the users to this topic. Then you can send notifications to this topic whenever you want to send notifications to all the users. You can also create a topic called "Admin Users" and subscribe all the admin users to this topic. Then you can send notifications to this topic whenever you want to send notifications to all the admin users.

# Firebase Cloud Messaging Workflow Diagram (For Reference)

<!-- Embed Image of FCM working mechanism here -->

![FCM Diagram](https://firebase.google.com/static/docs/cloud-messaging/images/diagram-FCM.png)

## API Endpoints

- `POST /api/token` : This endpoint is used to send the FCM token to the backend server. The frontend application will send the FCM token to this endpoint. The backend server will store this token in the database. This token will be used to send notifications to this user. NOTE: You can store this token in the user model in your application. This is just for demo purpose.

  > Request Body:
  >
  > ```json
  > {
  >   "token": "Your FCM token"
  > }
  > ```

- `POST /api/fcm/all` : Send notifications to all users (Whose device token is stored in the database)

  > Request Body:
  >
  > ```json
  > {
  >   "notification": {
  >     "title": "Notification Title",
  >     "body": "Notification Body"
  >   }
  > }
  > ```

- `POST /api/fcm/token` : Send notifications to a single user. You need to pass the user's device token in the request body.

  > Request Body:
  >
  > ```json
  > {
  >   "notification": {
  >     "title": "Notification Title",
  >     "body": "Notification Body"
  >   },
  >   "token": "Device Token"
  > }
  > ```

- `POST /api/fcm/topic` : Send notifications to a topic.

  > Request Body:
  >
  > ```json
  > {
  >   "notification": {
  >     "title": "Notification Title",
  >     "body": "Notification Body"
  >   },
  >   "topic": "Topic Name"
  > }
  > ```

- `POST /api/fcm/subscribe` : Subscribe a user to a topic.

  > Request Body:
  >
  > ```json
  > {
  >   "token": "Device Token",
  >   "topic": "Topic Name"
  > }
  > ```

- `POST /api/fcm/unsubscribe` : Unsubscribe a user from a topic.

  > Request Body:
  >
  > ```json
  > {
  >   "token": "Device Token",
  >   "topic": "Topic Name"
  > }
  > ```

## API Documentation

- [Postman Documentation](https://documenter.getpostman.com/view/23492285/2s84DkUQi8)

## Author

- [Ameya Jain](https://github.com/AmeyaJain-25)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
