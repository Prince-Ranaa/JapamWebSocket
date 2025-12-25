Real-Time Chat Backend

A simple real-time one-to-one chat backend built with Node.js, TypeScript, Socket.IO, and MongoDB.
Includes JWT auth, real-time messaging, online/offline status, and chat history.


🚀 Features
🔐 JWT-authenticated socket connections
⚡ Real-time send & receive messages
🟢 Online / offline user tracking
💾 MongoDB message storage
📜 Chat history API + socket event


📦 Tech Stack
Node.js, Express, TypeScript, Socket.IO, MongoDB, Mongoose, JWT


⚙️ Setup
1. Download zip/clone and then run command npm install
2. Environment Variables
          MONGO_URI= your_Mongo_Uri
          PORT=5000
          JWT_SECRET= Your_Secret
          API_PREFIX=/api/v1
          NODE_ENV=development
3. Run
   nodemon src/server.ts



🔌 API Routes

🔌Auth
  POST /api/v1/auth/signup
  POST /api/v1/auth/login → returns JWT

🔌 Socket Events

  Client → Server
  message:send — send message
  message:history — fetch history
  user:check-status — check if user is online
  
  Server → Client
  message:receive
  message:history:response
  user:online
  user:offline




🧪 Testing Frontend (Optional)
  I’ve added a very basic frontend to help test the backend quickly.
  It’s just a simple setup for sending messages and checking socket events.
  Please note that it isn’t polished, has a few errors and no errors handaling.
  Its only purpose is to make testing the backend.
  
🔗 Frontend Repo:
https://github.com/Prince-Ranaa/webSocket-Frontend

To run it:
  npm install
  npm run dev

After starting the app, sign up first, then log in.
Only the login flow stores the JWT token in localStorage, so please log in before testing any chat functionality.
