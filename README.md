# A mobile, desktop and website App with the same code

This project shows how the source code can be architectured to run on multiple devices. As of now, it is able to run as:

- an iOS App (based on [react-native](https://facebook.github.io/react-native))
- a Desktop App (based on [NW](http://nwjs.io))
- a Website App in any browser (based on [react](https://facebook.github.io/react))

### Mobile App

![Mobile App](images/mobile-app.png "Mobile App")

### Desktop App

![Desktop App](images/desktop-app.png "Desktop App")

### Website App

![Website App](images/website-app.png "Website App")

## Libraries/tools

This project uses libraries and tools like:
- es6 syntax and [babel](https://babeljs.io)
- [react](https://facebook.github.io/react) for the Website App and Desktop App,
- [react-native](https://facebook.github.io/react-native) for the iOS App
- [NW](http://nwjs.io) to package the Desktop App
- [flux](https://facebook.github.io/flux) to organize the data flow management
- [css-loader](https://github.com/webpack/css-loader) to integrate the styles in the builds
- [grunt](http://gruntjs.com) to create the builds
- [webpack](https://webpack.github.io) to help during the development phase with hot reloading


## Basic philosophy

All the code is contained in the `src` directory, especially the 2 main entry files that are used for the builds:
- `index.ios.js` is the one used to build the iOS App
-  `index.js` is the one used to build the Website App and Desktop App as the code is strictly the same.

### Flux architecture actions/stores

All the [flux](https://facebook.github.io/flux) architecture is share to 100% to all the different builds. This means that all the logic and data management code is done only once and reuse everywhere. This allows us to have an easy tests suite as well and to ensure that our code is working properly on all the devices.

### Components

The real interest of the project is in how the components have been structured to shared most of their logic and only redefined what is specific to every device.

Basically, every component has a main `Class` which inherits a base `Class` containing all the logic. Then, the main component import a different Render function which has been selected during the build. The file extension `.ios.js` or `.js` is used by the build tool to import only the right file.

At the end, every component is defined by 4 files. If we look at the screen component, here is its structure.

```
Screen.js
  |-> ScreenBase.js
  |-> ScreenRender.ios.js (used during iOS build)
  |-> ScreenRender.js  (used during Website and Desktop build)
```

And here is the main `Class` file which composes the files.

```js
'use strict';

import Base from './ScreenBase';
import Render from './ScreenRender';

export default class Screen extends Base {
  constructor (props) {
    super(props);
  }

  render () {
    return Render.call(this, this.props, this.state);
  }
}
```

## What's next

Here are some thoughts about what can come next:

- Make the Website App Isomorphic/Universal

## Thank you Robert for your awesome design

I want to thank Robert O'Dowd who kindly authorized me the reuse his very beautiful design. The original design made by Robert was part of his project called "Simplifycation" visible [here](https://dribbble.com/shots/1973851-Simplifycation).

# How to build/run the projects

## General requirements before running any specific projects

### If you are using npm v2.X

- `npm install` to install all the dependencies, React and React Native among others


### If you are using npm v3.X

As of now (October 14th) react-native and npm v3.X do not cooperate well together. Then, if you are using npm v3.X as global the best way to install the project is to install npm v2.X locally and use this freshly installed npm to install the other packages.

- `npm install npm@2` to install npm v2.X locally
- `node_modules/npm/cli.js install` to install all the dependencies, React and React Native among others

## The iOS App

### Requirements for React Native

- OS X - This repo only contains the iOS (7+) implementation right now, and Xcode only runs on Mac.
- Xcode 6.3 or higher is recommended.
- Homebrew is the recommended way to install node, watchman, and flow.
- `brew install node`
- `brew install watchman`. We recommend installing watchman, otherwise you might hit a node file watching bug.
- `brew install flow`. If you want to use flow.

### Quick start

- Open iosApp.xcodeproj and hit run in Xcode.
- Hit cmd+R in your iOS simulator to reload the app and see your change!

Congratulations! You've just successfully run the project as an iOS App.

## The Website App

### Requirements for React

There isn't any addtional requirements since you already installed the deps with `npm install`.

### Quick start

- `grunt build` to build the project (at least the first time)
- `grunt serve-web` to preview in the browser at http://localhost:8000/index.web.html or http://localhost:8000/webpack-dev-server/index.web.html with webpack-dev-server and hot reload enabled

Congratulations! You've just successfully run the project as a Website App.

## The Desktop App

### Requirements for NW

To run the project, you are supposed to run something like:

`/path/to/nw .`

On OSX, the executable binary is in a hidden directory within the .app file. The easier solution to install it is to downlaod the app on http://nwjs.io/ then copying it to your application folder. You will now be able to run:

`/Applications/nwjs.app/Contents/MacOS/nwjs .`

You can also setup an alias to call the binary.

`alias nw="/Applications/nwjs.app/Contents/MacOS/nwjs"`

### Quick start

- `grunt build` to build the project (at least the first time)
- `grunt serve-nw` to launch the desktop app and enable livereload

Congratulations! You've just successfully run the project as a Desktop App.

# Run the tests

To run the tests, simply run:

```
npm test
```
