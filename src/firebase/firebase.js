const firebase = require('firebase');
require('firebase/firestore');

const users = require('./sample_data.js');

firebase.initializeApp({
  apiKey: 'AIzaSyD-_MgSIvYCOzC0PVI_jQeaJtGRX2chsc0',
  authDomain: 'whatsapp-clone-a7478.firebaseapp.com',
  projectId: 'whatsapp-clone-a7478',
});

const db = firebase.firestore();

users.forEach((user) => {
  db.collection('users')
    .add(user)
    .then((docRef) => console.log(`Documnet added with ID: ${docRef.id}`))
    .catch((error) => console.error(`Error writing document ${error}`));
});
