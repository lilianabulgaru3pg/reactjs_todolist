import firebaseApp from "firebase/app";
import "firebase/auth";
const config = {
  apiKey: "AIzaSyAJb2Ey6t1vGfGCbEZHu3YDA4JTmXJ0my8",
  authDomain: "todolistserverapp.firebaseapp.com",
  databaseURL: "https://todolistserverapp.firebaseio.com",
  projectId: "todolistserverapp",
  storageBucket: "todolistserverapp.appspot.com",
  messagingSenderId: "816959137147"
};

class Firebase {
  constructor() {
    const app = firebaseApp.initializeApp(config);
    this.auth = app.auth();
  }

  onSignInWithEmailAndPassword = (username, pass, callbk) => {
    this.auth.onAuthStateChanged(callbk);
    return this.auth.signInWithEmailAndPassword(username, pass);
  };

  isAuthenticated() {
    return this.auth.currentUser ? true : false;
  }

  signOut = () => this.auth.signOut();
}

const FirebaseServ = new Firebase();
export default FirebaseServ;
