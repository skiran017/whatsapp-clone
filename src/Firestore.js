import firebase from 'firebase';

const db = firebase
  .initializeApp({
    projectId: 'whatsapp-clone-a7478',
    databaseURL: 'https://whatsapp-clone-a7478.firebaseio.com',
  })
  .firestore();

export default db;
