
UniShare is social network made for schools with exchanges students, putting them in relation with native students.
The students will have access to 3 main part of the website:
 - Tutoring
 - Blog
 - Chat

---------------------------
Installation:

install node.js (.exe)
install couchdb 1.6 (.exe)

Needed packages :
+-- bcrypt@1.0.2
+-- bootstrap-validator@0.11.9
+-- client-sessions@0.8.0
+-- couch-db@1.1.3
+-- emailjs@1.0.8
+-- express-generator@4.15.0
+-- http@0.0.0
+-- moment@2.18.1
+-- nano@6.2.0
+-- nodemon@1.11.0
+-- npm@4.5.0
+-- pug@2.0.0-rc.1 / jade
+-- should@11.2.1
+-- socket.io@2.0.1
`-- stylus@0.54.5

----------------------------
Run it:

npm run watch -> start and restart server (on port 3000) when a file is updated
crtl + c (x2) -> stop server

- Sign up
- Sign in
- Forgot password (static)
- Profile (static)
- Tutoring (static)
- Blog (static)

Sessions don't work, the app checks if the user is in the db or not but fails to create the session.
