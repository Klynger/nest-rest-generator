<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

 
  <p align="center">A code generator responsable to generate code for a <a href="https://github.com/nestjs/nest" target="blank">NestJs</a> application.</p>
    <p align="center">
<a href="https://github.com/Klynger/nest-rest-generator/blob/master/LICENSE"><img src="https://img.shields.io/github/license/klynger/nest-rest-generator?style=for-the-badge" alt="Package License" /></a>
</p>

## Summary

- [Description](#description)
- [Running Things](#running-things)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
  - [Test](#test)
- [License](#license)
- [API Description](#api-description)
  - [Standard Routes](#standard-routes)
    - [Whoami](#whoami)
  - [Specific Routes](#specific-routes)
    - [Generate Controller](#generate-controller)
    - [Generate Service](#generate-service)
    - [Generate Model](#generate-model)

## Description

This application implements a specification REST API to work together with the `create-backend-app-core (TODO)` app.

## Running things

### Installation

```bash
$ yarn install
```

### Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## License

  Nest Rest Generator is [MIT licensed](LICENSE).

## API description
  Summary of the available routes that you can access. All the routes must start with the app name (`/nest-rest-generator`).

### Standard routes

#### Whoami

`GET /nest-rest-generator/whoami`

Returns a JSON specifying what layers of a REST API for a Modal the app can generate and which type of API this is. Example of response:

```json
{
  "apiType": "REST",
  "controller": true,
  "model": true,
  "repository": false,
  "service": true
}
```

### Specific routes

#### Generate controller

`POST /nest-rest-generator/controller`

It gonna return the code of a controller file as a string. This is an example of a body to send:

```json
{
  "implementedMethods": ["POST", "GET", "PUT"],
  "entityName": "User",
  "layerBellow": "service"
}
```

#### Generate service

`POST /nest-rest-generator/service`

It gonna return the code of a service file as a string. This is an example of a body to send:

```json
{
  "implementedMethods": ["POST", "GET", "PUT"],
  "entityName": "User",
  "layerBellow": null
}
```

#### Generate model

`POST /nest-rest-generator/model`

It gonna return the code of a model file as a string. This is an example of a body to send:

```json
{
  "entityName": "User",
  "attributes": [
    {
      "name": "id",
      "type": "string",
      "required": false
    },
    {
      "name": "name",
      "type": "string",
      "required": true
    },
    {
      "name": "pastNames",
      "type": {
        "typeName": "string[]",
        "importable": false
      },
      "required": false,
      "default": []
    },
    {
      "name": "email",
      "type": "string",
      "required": true
    },
    {
      "name": "password",
      "type": "string",
      "required": true
    }
  ]
}
```
