import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyDa8NssD0bSJJh-scKNrYydbCn9WJwW1I4',
  authDomain: 'instagra-m-clone.firebaseapp.com',
  databaseURL: 'https://instagra-m-clone.firebaseio.com',
  projectId: 'instagra-m-clone',
  storageBucket: 'instagra-m-clone.appspot.com',
  messagingSenderId: '702109496641',
  appId: '1:702109496641:web:041cc2d912a6500c63ddc0',
  measurementId: 'G-6CPB22VE59',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
export { db, auth, storage };
