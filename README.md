# Calculator

This is a basic calculator built with JavaScript. It has been built based on the following brief requirements and design mockup.

**Preview:** [danwarman-calculator.netlify.app](https://danwarman-calculator.netlify.app/) *(Last checked: 29/05/20 16:00)*

## Stack
* HTML
* Sass
* JavaScript (ES6)
* PHP `*`
* Compiler / Bundler (Webpack) `**`

> `*` Brief proposes this for 'Save' functionality.
>
> `**` Personal choice of compiler and bundler.

## Brief
See the brief [here](brief.md).

# Installation
## Clone project
Via your command line tool, navigate to the root of your 'sites' directory. This will be the location you store your projects.

Paste the following command and hit `enter`.

```
git clone git@github.com:danwarman/calculator.git
```

## Go in to the project
Via your command line tool, navigate into the root of the calculator project.
```
cd calculator
```

## Install the app
In order to install the app, you will require `npm`.

`npm` is a node package manager. You must ensure you have both `Node.js` and `npm` installed in order to install the app.

### Check you have `node.js` and `npm` installed
To check if you have `node.js` installed, run the following command.
```
node -v
```
To check if you have `npm` installed, run the following command.
```
npm -v
```

For instructions on how to install these if they're missing, go to [npmjs.com/get-npm](https://www.npmjs.com/get-npm).

### Installing the app
Run the following command.
```
npm install
```

# Run the app
## Production mode
```
npm run build:prod
```

This produces a `public` directory containing the compiled/transpiled files.
* The Sass is compiled and bundled in to a single file: `/css/app.bundle.css`
* The JavaScript is transpiled with Babel and minified in to bundled file: `/js/app.bundle.js`
* The HTML is copied in to the directory with the respective tags injected for the CSS and JS.

Opening the following file in browser will allow you to use the production version of app: `/public.index.html`.

## Dev mode
```
npm run start:dev
```
This will run the `webpack-dev-server` per the dev config. It will open the application in the browser on an available localhost port.

In this mode, you can make changes to the code which, on save, will retrigger webpack and hot reload in the browser.

# Final Stack
## Tech used
* HTML
* Sass - SCSS Syntax
* Javascript - ES6
* Webpack
* Babel
* Webpack Dev Server

## Methodology / Architecture
- **HTML**
  - Kept it simple and validated the markup with the [W3C Validation Tool](https://validator.w3.org/#validate_by_input).

- **Sass**
  - I try to adhere to BEM per the following guide - [getbem.com](http://getbem.com/introduction/). I find this much easier to work with when nesting styles.
  - I have followed the 7-1 pattern as outlined on [sass-guidelin.es](https://sass-guidelin.es/#the-7-1-pattern) but I didn't require all of the folders for such a small project.

- **JavaScript**
  - As dictated, I've written in ES6. I'll be reviewing the code further to assess whether I've missed anything.
  - I started out with an MVC approach to the structure but on reflection, I may have done this differently. I wanted the state and ui controllers to separate and have only the app controller utilising them both.

- **Webpack**
  - It does it all with the help of some plugins. Allowed me to a) run a simple web server for dev b) compile code with a little setup and an easy to read config and c) utilise a file watcher and hot reloading.

- **Babel**
  - ES6 is widely supported now but there are some browsers (or versions of) that do not fully support certain features. Therefore, Babel has come to the rescue and transpiles the JavaScript to ECMAScript5 for wider consumption.

# Missing key features
- **PHP** 
  - **Latest Update**
    - I have now created a POC separately in a different repo. See [github.com/danwarman/calculator-php](https://github.com/danwarman/calculator-php).
  - **Previous notes**
    - Although I will commit my PHP code to the project, I have yet to find a way to easily call the script with the current architecture. I may have overcomplicated this slightly in my thought process - **TBD**.
    - The problem arose when I tried to upload the initial form of this app to Heroku. A `package.json` and `composer.json` are required to run `node` and `php `respectively. It may require multiple buildpacks to effectively run both. Again, **TBD**.
    - **Update** - I need more time to work out how i'd proxy to a webserver capable of serving the php.
- **Linter**
  - I should have added a linter from the word go. I forwent this tool simply because I hadn't set it up in a long time and was concerned with time. Thus, placing it as a nice-to-have post completion.


