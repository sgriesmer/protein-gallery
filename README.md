# Overview

The purpose of this project is to create a demonstration website using REACT, javascript, Python, and MongoDB.  The website fetches protein information from the RCSB Protein Database through its RESTful API, displays images of the protein tertiary structure on the webpage, and allows the protein information to be saved to a Mongo database.  Upon starting, the website displays all the proteins in the MongoDB.  It also allows deletion of the protein information from the Mongo database.

The architecture of the demonstration website is comprised of: (1) a frontend REACT/javascript application, (2) a RESTful API application written in Python, and (3) the Mongo database to store protein information:

![test website architecture] (./frontend/src/images/arch.jpg)

Note that the frontend application interacts with the RESTful API application, which pulls data from the RCSB Protein Database.  

In addition to these components, a Mongo Express client for the database is provided to view the database contents.

For ease of deployment, the application is containerized into four Docker containers:

    protein-gallery-frontend-1
    protein-gallery-api-1
    protein-gallery-mongo-1
    protein-gallery-mongo-express-1

Volumes are set up to allow for database persistence.

# Installation

## Prerequisites

The application assumes that Docker is set up in the environment to build and deploy applications.  The instructions for installation of Docker can be found at https://docs.docker.com/get-docker.

## Installation Steps

(1) Clone or download the Github repository for the project

Navigate to the repository github.com/sgriesmer/protein-gallery.git.  Clone or download the application.

(2) Build the containerized application

The application is built through Docker Compose.  Navigate to the root application directory (protein-gallery) using a command-line interface. Execute the command:

    docker-compose build

The four containers above should be built with Docker.

(3) Deploy the Docker containers

Deploy the Docker containers with the command:

    docker-compose up

# Accessing the application

    The front end application can be accessed locally at http://localhost:3000.  The api application can be accessed at http://localhost:5051 and the Mongo DB express client at http://localhost:8081.

    Screenshots of each portion of the website can be seen below:

    (a) Frontend application

    ![frontend app] (https://github.com/sgriesmer/protein-gallery/frontend/src/images/frontend.png)

    (b) API application

    ![api app] (./frontend/src/images/api.png)

    (c) Mongo Express client view of Mongo database

    ![Mongo Express app] (./frontend/src/images/me.png)

# Additional features

As a next step, I will be working on hosting the website on Kubernetes in the cloud, starting from Azure.  If you have any suggestions, please contact me at sgriesmer@comcast.net.



