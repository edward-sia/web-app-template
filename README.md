# Module Federation Template

[![webpack](https://img.shields.io/badge/webpack-5.12.2-green.svg)](https://semver.org)

This template project is created to run Module Federation in React with webpack with minimal setup.

This is so that you could extend to whatever you need for your project purposes apart from Module Federation. Eg: Typescripts support, test runner, test framework, linting, styling, and etc.

## Instruction

Clone this template project and rename the project name `web-app-template` to your project name. Make sure you replace `webAppTemplate` too.

This project follows the Module Federation convention, hence, the `index.js` and `bootstrap.js` files should be left as they are.

React Entry point for this full app is `App.js`

## What's in this template

### - Exposes

Component `Shell.js` is being exposed via Module Federation as an example. The great things about Module Federation is that you could actually expose any files via `exposes`.

#### Sample Usage

~~~js
exposes: {
  "./Shell": "./src/Shell",
  "./useCredential": "./src/useCredential"
}
~~~

### - Remotes

This template also demonstrate rendering an external component by pulling in `other-app1` in webpack.config.js, as an example. You could change it to render components that other Module Federation Microfrontend have already exposed and have been hosted somewhere. Make sure you update the `.env` and `.env.production` to populate the hosted URL.

> **You will need other remote's URLs during webpack build time.**

~~~js
remotes: {
  otherApp1: `otherApp1@${remotes.WEB_OTHER_APP1}/remoteEntry.js`
}
~~~

#### Sample usage

~~~js
const Other = React.lazy(() => import("otherApp1/Other"))
~~~

or

~~~js
import Other from "otherApp1/Other";
~~~
