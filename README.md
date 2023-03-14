# RD-FrontEnd

## Home Task given on March 7th (NodeJs-Session-4)

## HOMEWORK 3

POSTGRESQL AND LAYERED ARCHITECTURE

# PREREQUISITES:
The task is a continuation of Homework 2 and should be done in the same repo.

# TASK 3.1
• Install DB PostgreSQL on your machine or use a free web hosting services for PostgreSQL 
(https://www.heroku.com/postgres or https://www.elephantsql.com/plans.html).

• Write SQL script which will create Users table in the DB and fill it in with  predefined users’collection.

• Configure your REST service to work with PostgreSQL.
    − Use the sequelize package (http://docs.sequelizejs.com/) as ORM to work with PostgreSQL.
    As an alternative to sequelize you can use more low-level query-builder library (http://knexjs.org/).


# TASK 3.2
The service should adhere to 3-layer architecture principles (https://softwareontheroad.com/ideal-nodejs-project-structure/) and contain the following set of directories:

            |- routers / controllers
            |- services
            |- data-access
            |- models

# EVALUATION CRITERIA
2. PostgreSQL database is installed and Users table with some seed data is added to it.
3. Some User CRUD REST methods are implemented to store/retrieve data from database. Code quality is not good.
4. Task 3.1 is fulfilled to the full extent. All User REST methods get/save data to real database instead of memory.
5. Task 3.2 is fulfilled to the full extent. All components are correctly named and splitted by folders mentioned in Task 3.2.
