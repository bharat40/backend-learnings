## Express session and Passport Local Strategy

1. User sends username + password to server
   , if username and password matches with the one in database.
2. Server creates a session for that user in the database, that session has a session ID which is added to a cookie and then sent back to user.

3. Now if client will make any request, the cookie will be passed inside a header for all those requests.

4. Now for example, if a user is trying to access its profile page (it makes GET request) the same cookie that server sent the user will be passed inside a header and sent back to the server, now server will match the session id inside the cookie with the one in the database, if the id is matched, server will sent back a valid response and if not server will sent an error.

## steps to use session in express app

### it is a session middleware

1. npm i express-session and configuration
2. npm i connect-mongo for saving session in database and configuration


## Implementing login functionality using passprt-local strategy