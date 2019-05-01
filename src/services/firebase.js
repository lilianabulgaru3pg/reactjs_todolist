import React from 'react';
import { Auth } from './firebaseConfig';

export const signInWithEmailAndPassword = (username, pass) => {
  const authPromise = Auth.signInWithEmailAndPassword(username, pass);
  return authPromise;
};

export const isAuthenticated = () => !!Auth.currentUser;

export const signOut = () => Auth.signOut();

export const FirebaseContext = React.createContext('');
