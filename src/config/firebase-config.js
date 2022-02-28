import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDDM-aZiHuPay0ZLgKi1RX5REZ1NUN3D2w",
    authDomain: "cs458-project1-9009a.firebaseapp.com",
    projectId: "cs458-project1-9009a",
    storageBucket: "cs458-project1-9009a.appspot.com",
    messagingSenderId: "183858104803",
    appId: "1:183858104803:web:0f24728c104f7948af78d6",
    measurementId: "G-PM14NW0ERV"
};

firebase.initializeApp(firebaseConfig);

export default firebase;