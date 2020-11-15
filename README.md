# AngularBookshop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Logs:
- add components from original shop template
- add components from original shop template
- get Genres, Books, Product-list & Product-detail (:_id but need improvement).
- Add:
    + Add user register, user login.
    + Add pagination for ProductListComponent.
    + Add Check Plural.
    + Add show password button with icon (eye/eyeslash).
- AppComponent can get User 'asynchronously' for Header/Navbar using 'EventEmitter'.
    + (Saving codes purpose only, still need some fixing for login form)
- Save codes
- Remove GoggleMap for Angular from package.json, use iframe instead for Google Map
- Add: 
    + AppComponent communicates with LoginComponent via Service to get login status (need improvement).
    + Some function for Shopping Cart (draft only, need improvement).
- CartInit, AddItem, RemoveItem
- CartService is used to handle functions, Dropdown cart can get Observables when Item is added.
- Working on CartComponent
- Some update functions in CartService.
- Add
    + Added LoginService do Observing login Status & handle login functions.
    + Fix id conflict between LoginComponent called by AppComponent & one call by RouterOutlet.

- add OrderService, working on Order (saving purpose only).
- Add
    + Add Order, get Order.
    + Added root/docs folder for rendering app.
- Save codes
- Save codes, remove some logs & alert.
- Trying to fix googlemap: remove googleapis script
- no docs folder.
- fix image size/ratio, product-list, g-map, some improve on getUser.
