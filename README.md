# What is this project? Code once run every where!

This project tries to show how the code can be organized to be used with multiple devices/outputs. This code source is for now able to run as:

- an iOS App (based on React Native)
- a Website App in any browser (based on React)

## Limitations

Of course some of the choices made here to share the code between specific build are nt optimal. Packaging some of them as npm modules would have been probably a much better idea but it wouldn't have shown all of the project structure as easily and would have made the project harder to understand.

## What's next

Here are some thoughts about what can come next:

- Add some NW implementation to make the project able to run as a Desktop App
- Make the Website App Isomorphic/Universal

# How to build/run the projects

## General requirements before running any specific projects

- `npm install` to install all the dependencies, React and React Native among others

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

![Mobile App](https://github.com/benoitvallon/calculator-app-react/images/mobile-app.png "Mobile App")

## The Website App

### Requirements for React

There isn't any addtional requirements since you already installed the deps with `npm install`.

### Quick start

- `grunt build` to build the project
- `grunt serve` to preview in the browser at http://localhost:8000/index.web.html or http://localhost:8000/webpack-dev-server/index.web.html

Congratulations! You've just successfully run the project as a Website App.

![Website App](https://github.com/benoitvallon/calculator-app-react/images/website-app.png "Website App")

## The Desktop App

### Requirements for NW

To run the project, you are supposed to run something like:

`/path/to/nw .`

On OSX, the executable binary is in a hidden directory within the .app file. The easier solution to install it is to downlaod the app on http://nwjs.io/ then copying it to your application folder. You will now be able to run:

`/Applications/nwjs.app/Contents/MacOS/nwjs .`

You can also setup an alias to call the binary.

`alias nw="/Applications/nwjs.app/Contents/MacOS/nwjs"`

### Quick start

If you have setup the alias mentioned above, just run:

- `nw .` to build and launch the project

Congratulations! You've just successfully run the project as a Desktop App.

![Desktop App](https://github.com/benoitvallon/calculator-app-react/images/desktop-app.png "Desktop App")
