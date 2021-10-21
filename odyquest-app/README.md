# Odyquest App

The actual web app of the Odyquest project.

## Build

Before building this project, you have to build [Libraries for shared code](../odyquest-shared/README.md) and [Angular related library](../odyquest-frontend-shared/README.md) first.

Run `npm run build:production` to build the project with localization enabled. The build artifacts will be stored in the `dist/` directory.
If you are using a static data set run `npm run build:static`.

<!-- (no tests available yet)
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
-->

## Development server

Run `npm run start:en` or `npm run start:de` for a development server, using English or German localization. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Localization

Run `npm run extract-i18n` to update localization files.
`npm run extract-i18n:new` will show you all new localization entries.
Update entries with correct translations for each file. The updated files will appear in the list of new localized
entries as long as the target state is new. Therefore chance _new_ in `<target state="new">` to _final_.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
