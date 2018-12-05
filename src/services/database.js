import { Firebase } from "./firebaseConfig";
import "firebase/firestore";

export const Firestore = Firebase.firestore();
// Disable deprecated features
Firestore.settings({
  timestampsInSnapshots: true
});

export const postNewTaskData = data => {
  Firestore.collection("tasks")
    .add(data)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};
