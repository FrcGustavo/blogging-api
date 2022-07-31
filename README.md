![Node.js CI](https://github.com/FranciscoGustavo/bloging/workflows/Node.js%20CI/badge.svg)

# Bloging

It is the api that handles the information of a blog

## Config the enviroment variables
Before the start, your must config enviroment variables

#### Intructions:
- Create the next files with enviroments variables

.api.env
```
POSTGRES_DIALECT=
POSTGRES_HOST=
POSTGRES_USERNAME=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_SETUP=
PORT=
```

.db.env
```
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_PASSWORD=
```

.pgadmin.env
```
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
```

## Start

Install dependencies
```bash
npm install
```

Run build
```bash
npm run build
```

Run development mode
```bash
npm run dev
```

Run production mode
```bash
npm run start
```

Run tests and coverage code
```bash
npm run test
npm run cover
```

Run linter and auto fix files
```bash
npm run lint
npm run lint -- --fix
```
