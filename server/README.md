# Covid-19 Hospital API

An API created using NodeJS for the users of a frontend assignment to create , update , search and delete users

## Documentation

Routes :

    a. /users/register - Registers a new User.
    b. /users/login - Authenticates and returns the JWT token to be used.
    c. /dummyusers/create - Allows a User to register some new dummy users (JWT Auth enabled).
    d. /dummyusers/all_users - Allows to show all dummy users list created to be shown
    e. /dummyusers/update - To Update the details of dummyusers
    f. /dummyusers/search - Show search results in the search bar for a partial match
    g. /dummyusers/delete - To delete a particular dummy user

Data that needs to be sent with a route :

    a. /users/register - email, password (Form type data)
    b. /users/login - email, password (Form type data).
    c. /dummyusers/create - name, phone, email, status
    d. /dummyusers/update - DummyUser's ID (params), newBody
    e. /dummyusers/search - Search Text
    f. /dummyusers/delete - DummyUser's ID (params)

Folder Structure

    a. index.js - Server runs here
    b. models - Contains all the models for Users, DummyUser.
    c. routes - Contains all the routes.
    d. controllers - Contains all the controllers.
    e. config - Contains all the config files.
