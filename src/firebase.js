import firebase from 'firebase'
var firebaseConfig = {
apiKey: "AIzaSyABJl6FTcLgJxiWMnigFIReDi3iFVAby5k",
authDomain: "library-f4f21.firebaseapp.com",
projectId: "library-f4f21",
storageBucket: "library-f4f21.appspot.com",
messagingSenderId: "631849451285",
appId: "1:631849451285:web:7e092c35f5f7ab3e76731c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth= firebase.auth();