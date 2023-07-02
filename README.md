# GreenItForward Backend

![version](https://img.shields.io/badge/version-1.0.1-blue)

This repository contains the backend for the GreenItForward project. It is built with NestJS and other various dependencies. This backend serves as the API for the [GreenItForward frontend](https://github.com/GreenItForward/green_it_forward_front).

## Contributors

- [James ABIB](https://github.com/jabibamman)
- [Ronan KIELT](https://github.com/chikatetsu)
- [Charles CRETOIS](https://github.com/carlito0605)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following installed:
- Node.js
- Docker (for Docker Compose)
- PostgreSQL

### Installation

1. Clone the repository

    ```
    git clone https://github.com/GreenItForward/green_it_forward_back.git
    ```

2. Navigate into the project directory

    ```
    cd green_it_forward_back
    ```

3. Install the dependencies

    ```
    npm install
    ```

4. Copy the .env.example file to .env and fill in the required variables

    ```
    cp .env.example .env
    ```

## Running the App

- To run the app in the development mode, use the command:

    ```
    npm run start:dev
    ```

- To build the app for production, use the command:

    ```
    npm run build
    ```

## Testing

Run the tests using the following command:

```
npm run test
```


## Docker Compose

The project also includes a Docker Compose configuration for running a PostgreSQL database in a Docker container. You'll need to have Docker installed to use this.

1. Run Docker Compose:

    ```
    docker-compose up
    ```

This will start a PostgreSQL database accessible at the port specified in your .env file.

## Built With

- NestJS
- TypeORM
- Passport
- And other various packages...

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/GreenItForward/green_it_forward_back/tags).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
