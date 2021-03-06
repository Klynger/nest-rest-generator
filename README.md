<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

 
  <p align="center">A code generator responsable to generate code for a <a href="https://github.com/nestjs/nest" target="blank">NestJs</a> application.</p>
    <p align="center">
<a href="https://github.com/Klynger/nest-rest-generator/blob/master/LICENSE"><img src="https://img.shields.io/github/license/klynger/nest-rest-generator?style=for-the-badge" alt="Package License" /></a>
</p>

## Summary

- [Summary](#summary)
- [Description](#description)
- [Running things](#running-things)
  - [Installation](#installation)
  - [Running the app](#running-the-app)
  - [Test](#test)
- [License](#license)
- [API description](#api-description)
  - [Standard routes](#standard-routes)
    - [Whoami](#whoami)
  - [Specific routes](#specific-routes)
    - [Generate controller](#generate-controller)
    - [Generate service](#generate-service)
    - [Generate repository](#generate-repository)
    - [Generate module](#generate-module)
    - [Generate model](#generate-model)
    - [Generate create dto](#generate-create-dto)
    - [Generate update dto](#generate-update-dto)
    - [Generate static files](#generate-static-files)

## Description

This application implements a specification REST API to work together with the [create-backend-app-core](https://github.com/Klynger/create-backend-app-core) app.

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

  Summary of the available routes that you can access.

### Standard routes

#### Whoami

`GET /whoami`

Returns a JSON specifying what layers of a REST API for a Modal the app can generate and which type of API this is. Example of response:

```json
{
  "apiType": "REST",
  "model": true,
  "module": true,
  "create": true,
  "update": true,
  "service": true,
  "controller": true,
  "repository": true
}
```

### Specific routes

#### Generate controller

`POST /controller`

It gonna return the code of a controller file as a string. This is an example of a body to send:

```json
{
  "implementedMethods": ["POST", "GET", "PUT"],
  "entityName": "User",
  "layerBellow": "service"
}
```

#### Generate service

`POST /service`

It gonna return the code of a service file as a string. This is an example of a body to send:

```json
{
  "implementedMethods": ["POST", "GET", "PUT"],
  "entityName": "User",
  "layerBellow": null
}
```

#### Generate repository

`POST /repository`

It is going to return the code of a mocked repository. This is an example of a body to send:

```json
{
  "implementedMethods": ["POST", "GET", "PUT", "DELETE"],
  "entityName": "Product",
}
```

#### Generate module

`POST /module`

```json
{
	"entityName": "User",
	"controllers": ["User"],
	"services": ["User", "Product"],
	"repositories": ["User"],
	"modules": ["Product"]
}
```

#### Generate model

`POST /model`

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
      "required": false
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

#### Generate create dto

It is going to return the code of a `Create${entityName}Dto`. This is an example of a body to send:

```json
{
  "entityName": "User",
  "attributes": [
    {
      "name": "name",
      "type": "string",
      "required": true
    },
    {
      "name": "products",
      "type": "string[]",
      "required": false
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

#### Generate update dto

It is going to return the code of a `Update${entityName}Dto`. This is an example of a body to send:

```json
{
  "entityName": "User",
  "attributes": [
    {
      "name": "name",
      "type": "string",
      "required": true
    },
    {
      "name": "products",
      "type": "string[]",
      "required": false
    }
  ]
}
```

#### Generate static files

`GET /static-files`

It gonna return all static files necessary to create a project
