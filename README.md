# Rune Fast API

API dedicated to Rune Fast Wiki app:
- [GITHUB](https://github.com/vertocode/rune-fast-wiki)
- [DEMO](https://rune-fast-wiki.vercel.app/home)

Node.js application built with TypeScript and Express. The Rune Fast API provides endpoints for managing product data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Installation

Before running the Rune Fast API, make sure you have [Node.js](https://nodejs.org/) and [yarn](https://yarnpkg.com/) installed on your system.

1. Clone the repository:

```bash
git clone https://github.com/vertocode/rune-fast-api.git
cd imports-api
```

2. Install dependencies:

```bash
yarn install
```

3. Build the TypeScript source code:

```bash
yarn build
```

## Usage

To start the Rune Fast API, use the following command:

```bash
yarn start
```

This will run the API using nodemon for automatic reloading during development.

The API will be accessible at http://localhost:3000.

## Scripts

- `yarn build`: Cleans the `dist` directory and compiles TypeScript code.
- `yarn start`: Starts the API using [nodemon](https://nodemon.io/) for automatic reloading.
- `yarn dev`: Runs TypeScript compiler in watch mode and starts the API using `nodemon` concurrently.
- `yarn ts.check`: Checks TypeScript code for errors using the `tsconfig.json` configuration.
- `yarn add-build`: Adds the `dist` directory to git (forcefully).
- `yarn down-api`: Executes the `api-shutdown.sh` script for stopping the API.

## Contributing

If you would like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request to the `main` branch of the original repository.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

