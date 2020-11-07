import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBU8fkd9IbR6u7iPYrj39Qt6eABetPWTs8",
    authDomain: "discord-clone-787ab.firebaseapp.com",
    databaseURL: "https://discord-clone-787ab.firebaseio.com",
    projectId: "discord-clone-787ab",
    storageBucket: "discord-clone-787ab.appspot.com",
    messagingSenderId: "172557716240",
    appId: "1:172557716240:web:6fac8e5b96582c365f3395",
    measurementId: "G-SEQ9E9132T"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export {auth, provider};
export default db;