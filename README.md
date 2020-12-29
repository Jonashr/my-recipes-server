# My-recipes-server

## About
The application simply named **My-recipes** was meant to be a simple **REST API** for me to practice on how to use *PostgreSQL with NodeJS*. Up until now, my development experience using NodeJS have mostly involved **MongoDB** and the managed database service **Mongo Atlas**.
That is why I wanted to learn how to use an SQL database with NodeJS, and to explore the differences between these two approaches.

After I had developed the API, I decided to also create some tests as well. This lead to the realization that setting up a test DB wouldn't be a great approach if I wanted to deploy it somewhere
in the future. 

That's why I decided I should learn how to use Docker and how to containerize the application. By doing that I could set up an CI/CD pipeline where the tests
are run automatically using Docker, and that deployment of the application will only done if all stages have finished. For this, I will use **GitHub Actions**

This application has not been created with the intent that anyone will actually use it. It's just for me to learn new programming concepts and technologies that I am interested in.

## What I learned from this Project

- Creating a REST API that uses PostgreSQL as the Database(as opposed to MongoDB), using pg library.
- How to host and configure a RDS Database on AWS
- Run a PostgreSQL container and to use this to execute all of the tests.

## How to Run the Project
Runs the application using the **production** environment
    
    npm start
    
Runs the application using the **development** environment
    
    npm run dev
    
**Lints** and automatically fixes the linting errors
    
    npm run lint
 
Runs all the **tests**
    
    npm test
    


### Running a PostgreSQL container and setting up related configuration
To be written in more detail.

## TODO
- [ ] **Dockerize** the application.
- [ ] Set up a **CI/CD Pipeline** using **GitHub Actions**.
- [ ] Convert the JS code into **TypeScript**.
- [ ] Create a front-end that uses **Vue** and **Tailwind CSS**
