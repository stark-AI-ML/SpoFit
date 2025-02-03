
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCW6dKe_vHH4V9w6HX-Y898NDj5XMkcEcg",
    authDomain: "spofit-a02f9.firebaseapp.com",
    databaseURL: "https://spofit-a02f9-default-rtdb.firebaseio.com",
    projectId: "spofit-a02f9",
    storageBucket: "spofit-a02f9.firebasestorage.app",
    messagingSenderId: "98482577446",
    appId: "1:98482577446:web:0173b8f44dcec2fb07c6e7",
    measurementId: "G-B1YXBW9CJJ"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
export default firestore;

