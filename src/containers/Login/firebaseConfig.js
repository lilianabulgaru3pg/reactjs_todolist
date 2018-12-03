import firebase from "firebase/app";
const config = {
  apiKey: "AIzaSyAJb2Ey6t1vGfGCbEZHu3YDA4JTmXJ0my8",
  authDomain: "todolistserverapp.firebaseapp.com",
  databaseURL: "https://todolistserverapp.firebaseio.com",
  projectId: "todolistserverapp",
  storageBucket: "todolistserverapp.appspot.com",
  messagingSenderId: "816959137147"
};

const Firebase = firebase.initializeApp(config);

export default Firebase;
