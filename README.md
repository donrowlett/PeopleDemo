# rvtd

A Node.js application to accept information about people, store it in a MySQL database, and present it as a list

Author: Don Rowlett - don@donrowlett.con 541-531-9090

Framework: Sails(http://sailsjs.org) 
IDE: Visual Studio

Data validations: Client-side validation checks for required fields only.  Back-end validation performs regex checks on several items.  The database adapter also uses Model attribute validations to check and block invalid data just prior to posting.

Sql Injection: The Waterline MySQL adapter santizes data prior to posting.  Given more time I would have found an adapter that uses parameterized queries.

Steps necessary to produce project: 
- Installed Node.js and NPM.  
- Installed Sails Framework.  
- Generated base application to obtain directory structure.  
- Imported project into Visual Studio.
- Used NPM to install angular, bootstrap, jquery and MySQL adapter.  
- Insgtalled MySQL server and created an empty database, no tables.  
- Added a People model to Models directory.
- Configured the connection string and adapter
- Set environment to DEV, set migrations to 'alter' for automatic creation of db tables
- Ran the app to produce the table in the database.
- Generated a People API for REST CRUD operations which returned JSON
- Created a single HTML page to handle single-page app processing.
- Coded Angular scripts to handle entry forms and display table
- Coded validation logic
- Added rudimentary css


Installation instructions:
 - Create DB: In your local MySQL server, create a database.  I used the name 'RVTDTestDonRowlett' with user id 'root', but You can use any name or userid or password that you like.  It is not necessary to add any tables or create any schemas, the app should be able to do all that for you.

 - Create a project directory, change dir into it, and clone the git repository. If you have a zip file, expand into the directory, otherwise use:  "git clone https://github.com/donrowlett/PeopleDemo.git"

 - Sensitive info is normally kept in config/local.js, and that file is excluded from the repository for that very purpose.  You need to create config/local.js containing the following:
 
 
            module.exports = {
                environment: process.env.NODE_ENV || 'development',
                db_user: 'xxxx',  // username for accessing MySQL database
                db_password: 'LSpec5DawniseM%',  // password for the same
                db_name: 'RVTDTestDonRowlett'  // or whatever name you used.
            };

    - ensure environment is 'development' for now.  chg to 'production' after database is created.

    - To generate table in database, node environment must not be 'production'.
    (To see current value, In command shell type NODE, then process.env, look for NODE_ENV)
    - If not already set to 'development', Set node environment variable: $NODE_ENV='development''

 - You'll probably need to install missing NPM modules.  In command window, change to project directory, and type "npm install"
 - I had a bit of trouble getting the database adapter to install automatically.  If sails.mysql is not in your list of installed modules, type 'npm install sails-mysql'.

- In command window, change to project directory, and type 'node app'.  After init messages stabilize, open a browser window and launch the app, usually by browsing to 'localhost:1337'. Have fun!

 - If you were able to save records, then the database was successfully created.  You can safely change NODE_ENV to 'production'.  And to prevent data loss in test environments, in config.models change 'migrations' to 'safe'.


A few things that I would have included had this been a production project: 

- Prevent duplicates on add
- Edit/delete links and corresponding views for RESTful operations
- Protection for database passwords using config/local.js
- More documentation in code
- Ensure naming conventions adhered to upper/lower/camel/snake case best practices
- Better client side validation
- Locate better NPM packages for handling scaffolding of views and validations
- Remove blueprinted code to reduce security risks
- Extended asynch processes

Plug-ins:
 "dependencies": {
    "anchor": "^0.11.5",
    "angular": "^1.6.4",
    "bootstrap": "^3.3.7",
    "ejs": "2.3.4",
    "grunt": "1.0.1",
    "grunt-contrib-clean": "1.0.0",
    "grunt-contrib-coffee": "1.0.0",
    "grunt-contrib-concat": "1.0.1",
    "grunt-contrib-copy": "1.0.0",
    "grunt-contrib-cssmin": "1.0.1",
    "grunt-contrib-jst": "1.0.0",
    "grunt-contrib-less": "1.3.0",
    "grunt-contrib-uglify": "1.0.1",
    "grunt-contrib-watch": "1.0.0",
    "grunt-sails-linker": "~0.10.1",
    "grunt-sync": "0.5.2",
    "include-all": "^1.0.0",
    "jquery": "^3.2.1",
    "rc": "1.0.1",
    "sails": "~0.12.13",
    "sails-disk": "~0.10.9",
    "sails-generate-static": "^0.11.3",
    "sails-mysql": "0.11.5",
    "waterline": "^0.11.11"

    That's it for now.  Let me know if you need anything else.