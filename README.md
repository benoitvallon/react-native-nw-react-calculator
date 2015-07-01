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

## The Website App

### Requirements for React

There isn't any addtional requirements since you already installed the deps with `npm install`.

### Quick start

- `grunt build` to build the project
- `grunt serve` to preview in the browser at localhost:8000

Congratulations! You've just successfully run the project as a Website App.
