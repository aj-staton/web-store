# WebStore
This app is was my introduction to App/Web Developement. It is a makeshift e-commerce application built with [Ionic UI Framework](https://ionicframework.com) v5 and integrated with Angular.

## Major Accomplishments
On top of basic naviagation, services, and state management, these are some of the features I've integrated into the app:
 * Integrated the app with Google's cloud services, [Firebase](https://firebase.google.com). This provided the No-SQL BaaS.
 * Added authenication features, including some for Google and Facebook login.
 * Integrated a camera with `cordova` plugins. This allows a user to upload an image thumbnail alongside product within the store.
 * Developed some backend functions for: content management, filtering, security, and image sizing.

## Dependancies
To resolve toolchain dependancies:
 * `Node.js` (I used v12.16.2)
 * The ionic toolchain; installed on debian-based linux with `npm install -g @ionic/cli`
To resolve all application dependancies:
 * Execute `npm install` in the directory within the `package-lock.json`.
 
 ## Execution
 To see this app for yourself there are two options (once dependancies have been resolved):
  * The first, is to execute `ionic serve` from the project directory. This __does not__ allow the use of native plugins.
  * The second, is to execute `ionic cordova run browser`. This __does__ allow for the use of native plugins. 
 
