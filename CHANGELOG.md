# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Generation of update DTOs.

### Changed

- Return of `POST /create` to return the code and the path of the file.

### Fixed

- Path of DTO's files.

## [0.12.0] - 2019-09-25

### Added

- Generation of create DTOs.

## [0.11.0] - 2019-09-25

### Added

- Generation of repositories.

## [0.10.1] - 2019-09-24

### Fixed

- Paths returning wrong file names.

## [0.10.0] - 2019-09-19

### Added

- Generate all static files.

## [0.9.0] - 2019-09-19

### Changed

- All routes return the type `FileGenerated` now.

## [0.8.0] - 2019-09-18

### Added

- Generation of modules.

## [0.7.0] - 2019-09-18

### Added

- `/whoami` route.

## [0.6.0] - 2019-09-18

### Added

- Generation of models.

## [0.5.0] - 2019-09-18

### Added

- Generation of services.

### Fixed

- Problems with the importation of files in the generation of controllers.

## [0.4.0] - 2019-09-13

### Fixed

- Duplicated and wrong imports of the layer bellow the controller.

## [0.3.0] - 2019-09-10

### Added

- Generation of `Controllers`.

## [0.2.0] - 2019-08-09

### Added

- Subscribe to the core webhook when the app is initialized.

## [0.1.2] - 2019-08-08

### Changed

- Choose another port to run the app if the chosen one is occupied.

## [0.1.1] - 2019-08-03

### Changed

- Organize file structure.

## [0.1.0] - 2019-08-01

### Added

- Initial version.