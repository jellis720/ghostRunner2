Using Express and Mongoose, create an application that organizes code snippets that you save for later use.

Here is how the project was structured:

      --> Code_Snippet (root directory)

          -- Model
          (these will be used to define the data model and how information will be rendered to the database via mongoose; used two files to represent to two types of data being entered -- user data and the actual code snippet data)

            -- Snippet.js
            -- User.js  

          -- Views
          (these files will be used to apply page styling to the different endpoints defined in the controller file)

            -- addsnippet.handlebars
            -- home.handlebars
            -- login.handlebars
            -- register.handelbars
            -- snippetlist.handlebars

          -- Public
          (this file folder will hold the static content -- in this case, the styling; we will instruct the application to apply styling through this path)

            -- styles.css

          -- Routes
          (these files will route to the appropriate endpoints based on the 'express-router' module; it will also apply logic to authentication and what data will be rendered on specific pages based on user interaction)

            -- login.js
            -- search.js
            -- snippets.js

          -- Package.json
          (from initializing node package manager (npm) in the terminal, we create a package.json file to list the node dependencies; some of these are included below)

            -- express
            -- express-session
            -- express-handlebars
            -- express-flash-messages
            -- express-passport
            -- express-router
            -- express-validator
            -- bcryptjs
            -- body-parser
            -- mongoose
            -- mongoose-findorcreate
            -- bluebird

            -- app.js
            (this will be our controller file -- where we instruct the express application how to access different endpoints and modules)
