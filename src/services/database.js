import { Firebase } from "./firebaseConfig";
import "firebase/firestore";

export const Firestore = Firebase.firestore();
// Disable deprecated features
Firestore.settings({
  timestampsInSnapshots: true
});

export const postNewTaskData = (collection, data) => {
  return Firestore.collection(collection).add(data);
};

export const tasksListsListener = (collection, condition, cb) => {
  Firestore.collection(collection)
    .where(...condition)
    .onSnapshot(docs => {
      cb(docs);
    });
};
