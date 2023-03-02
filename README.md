# Agave Lab Store
##### *Author: LeonGuerreroM*

## Overview
This API project is created following *Clean Architecture* layers and modularization.
The main functionalities include: 
- **Login**: Provides authentication and authorization to te user.
- **Checkout**: Process where based on the included products and their related sale, the total to be charged is calculated.

The API documentation is available [here](https://leafy-sunburst-bf2bb2.netlify.app/).

The API is deployed and fully available using: <https://protected-tor-52670.herokuapp.com> (DB is already populated with needed information to perform requested operations) 

Database structure consists of:
- User Table: Store valid users information and access level as role.
- Sales Catalog: Stores the variety of available discounts. Created to provide scalability.
- Products: Stores product information, prices and associated discounts.
See the ER diagrame [here](https://drive.google.com/file/d/1ZIy3hF9JDYd7-OYs6DlQg63sITKMhXVj/view?usp=share_link).


## Features
The following features and technologies are included in this project:
- API created using ***Express*** designed driven by scalability and optimization.
- ***PostgreSQL*** db created/managed using ***Sequelize***.
- Authentication, sessions management & routes protection using ***Passport.js*** & ***JWT***.
- Unit testing using ***Jest*** & ***Supertest***.
- ***Docker*** container with PostgreSQL & PGAdmin images.

Some other implementations:

- Incoming data validation using Joi
- Error handlers and error simplification using Boom
- Environment variables usage utilizing dotenv
- Passwords encryption using Bcrypt
- Cors implementation

Postman Collecion available [here](https://www.postman.com/leonguerrerom/workspace/agavestore/collection/10932143-890cb9ce-b8d2-4729-b88c-e23c773161d3?action=share&creator=10932143)

## Local Setup
To run this project on local environment follow next instructions: 
1. Clone github project
~~~~~ 
$git clone https://github.com/LeonGuerreroM/agaveStore.git 
~~~~~~
2. Install dependencies
~~~~~ 
$npm install 
~~~~~~
3. Start docker services
~~~~~ 
$docker-compose up -d 
~~~~~~
Make sure docker demon is running
4. Provide a .env file containing values in accordance with .env.example 
5. Create database tables
~~~~~ 
$npm run migrations:run 
~~~~~~
6. Populate database
~~~~~ 
$npm run seeders:run
~~~~~~
7. Start the application on selected environment
Development
~~~~~ 
$npm run dev
~~~~~~
Production
~~~~~ 
$npm run start
~~~~~~
Run tests
~~~~~ 
$npm run test
~~~~~~

Note: Docker and Node.js are necessary to build this project
