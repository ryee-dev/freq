# FREQ, FKA nu-wav

#### Group project - JavaScript Unit - 4.12.18

#### Jared Clemmensen | Katie Fujihara | Roger Yee | Emily Watkins

## Description

FREQ is an audio visualizer. It uses the p5.js library to create visualizations informed by a the amplitude or FFT of either an mp3 file or mic input. A user can play an mp3 file and toggle between two different visualizations. This application includes a mobile component that can interact with the live desktop version by changing visualizations remotely.

Nagivate to the below link to view and interact with the site.
https://nuwav-e65f2.firebaseapp.com

To utilize the mobile feature, navigate to the desktop page first from a computer or other device, select the desktop icon, and play the song. Next, using a mobile device, navigate to the site and select the mobile icon. Tap "Switch it up!" and watch the visualization change on the first device.

## Setup

Not necessary to interact with the app. However if you would like to run this on your local machine, follow these steps:

Clone this repository: https://github.com/emilywatkins/ba-clone.git

`$ npm install`

`$ ng serve`

Navigate to http://localhost:4200/

To set up Firebase:
* Create a Firebase account at firebase.google.com
* Create a project and choose 'add Firebase to your web app'
* On the left menu, under Develop, choose 'Database', click 'Rules' in the upper tab for that project, and make sure read and write are both true.
* Create a file in the src folder of the project files to hold the Firebase API credentials (src/api-keys.ts) and replace the below x's with the credentials given when project was created

export var masterFirebaseConfig = {  
    apiKey: "xxxx",  
    authDomain: "xxxx.firebaseapp.com",  
    databaseURL: "https://xxxx.firebaseio.com",  
    storageBucket: "xxxx.appspot.com",  
    messagingSenderId: "xxxx"  
  };

To add or change songs:
Add audio file to assets folder. Update the songPaths array in player component:  
`songPaths: string[] = ['../assets/newsong.mp3'];`

To use mic input instead of an audio file:
Replace instances of 'this.amplitude.getLevel();' with 'this.audioIn.getLevel();'
For more information about p5.audioIn, visit https://p5js.org/examples/sound-mic-input.html

## Functionality

Current:
* Two different audio visualizations: one informed by amplitude and the other by FFT - visualizations created using p5.js library
* Audio visualization using microphone input - p5.js feature
* Secondary (mobile) user interaction - click from secondary device adds value to firebase database. Player component retrieves that value and shows corresponding visualization.
* Audio visualization based on microphone input

Future:
* Incorporation of audio streaming for more intuitive user experience - exploring SoundCloud or similar APIs.
* Additional visualizations
* More live user options such as volume control, changing songs, visualizations reactive to mouse clicks or movements, etc.


## Technologies Used

* Angular
* Typescript
* Firebase
* p5.js


## License

Licensed under the MIT License.

Copyright (c) 2018 Jared Clemmensen, Katie Fujihara, Roger Yee, and Emily Watkins
