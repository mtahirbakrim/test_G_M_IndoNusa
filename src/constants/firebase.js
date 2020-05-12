import firebase from 'react-native-firebase';

const config = {
    apiKey: "AIzaSyCzZG2PY86RSu5P00VpeQDlCeNQonZp6lE",
    authDomain: "chattahirbakrim-16a3f.firebaseapp.com",
    databaseURL: "https://chattahirbakrim-16a3f.firebaseio.com",
    projectId: "chattahirbakrim-16a3f",
    storageBucket: "chattahirbakrim-16a3f.appspot.com",
    messagingSenderId: "928950775026",
    appId: "1:928950775026:web:13c012837b3ea300c3346b",
    measurementId: "G-F36GNYYE2H"
}

const Firebase = firebase.initializeApp(config);

export default Firebase;