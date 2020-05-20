![Node.js CI](https://github.com/FranciscoGustavo/bloging/workflows/Node.js%20CI/badge.svg)

# Bloging

It is the api that handles the information of a blog

## Config the enviroment variables
Before the start, your must config enviroment variables

#### Intructions:
- Copy the file '.env.example'
- Change the name '.env.example' to '.env'
- open file and complete the variables

Example
```
// Enviroment
NODE_ENV=
PORT=
LOG_PREFIX=

// MongoDB
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

## Start

Install dependencies
```bash
npm install
```

Run development mode
```bash
npm run dev
```

Run linter and auto fix files
```bash
npm run lint
npm run lint -- --fix
```
