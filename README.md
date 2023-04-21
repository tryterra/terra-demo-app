# Terra Demo App - React Native Framework

The Terra Demo App is a React Native demo app repository that provides a good starting point for integrating your app with the Terra service. The app showcases how to authenticate users, request health data through Terra series, and use the Terra service effectively.
## Requirements

This project was initially tested using iOS development. If you have never used React Native before, you can follow the steps in the following link to set up your React Native iOS environment (base React Native setup, not Expo): https://reactnative.dev/docs/environment-setup. By following the instructions in the link, you will have the following dependencies installed:
- React Native version (Version **0.69**)
- Node & Watchman
- Ruby (Version **2.7.6**)
- Xcode (for iOS development)
- CocoaPods
- React Native Command Line Interface


## React Native Library Installation and Start running

1. Clone the repository:
```bash
git clone https://github.com/username/repo.git
```
2. Install the dependencies:
```bash
cd repo
npm install
```
3. URL scheme set up in xcode: https://reactnative.dev/docs/linking
set url scheme to `terraficapp` and `identifier` to you project's Bundle Identifier which can be find at identity > Bundle Identifier as below.
![img_1.png](img_1.png)
![img.png](img.png)

4. Linking in react-native:
Detail: https://guides.cocoapods.org/using/pod-install-vs-update.html
```bash
cd ios
pod install
cd ..
```
5. Now you are good to go! npm start!
```bash
npx react-native start
npx react-native run-ios
```

