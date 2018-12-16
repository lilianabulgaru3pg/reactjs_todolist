import { Firebase } from './firebaseConfig';
import 'firebase/firestore';

export const Firestore = Firebase.firestore();
// Disable deprecated features
Firestore.settings({
  timestampsInSnapshots: true
});

export const postData = (collection, data) =>
  Firestore.collection(collection).add(data);

export const getData = (collection, doc) =>
  Firestore.collection(collection)
    .doc(doc)
    .get();

export const queryData = (collection, condition) =>
  Firestore.collection(collection)
    .where(...condition)
    .get();

export const addListener = (collection, condition, cb) =>
  Firestore.collection(collection)
    .where(...condition)
    .onSnapshot(docs => {
      cb(docs);
    });

export const putData = (collection, doc, data) =>
  Firestore.collection(collection)
    .doc(doc)
    .update(data);
