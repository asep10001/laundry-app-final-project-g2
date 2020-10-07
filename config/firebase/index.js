import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD8Sy3D2E73XW_FyxIQqvCEgj1AQQ2NQco',
  authDomain: 'laundrymockup.firebaseapp.com',
  databaseURL: 'https://laundrymockup.firebaseio.com',
  projectId: 'laundrymockup',
  storageBucket: 'laundrymockup.appspot.com',
  messagingSenderId: '774958500138',
  appId: '1:774958500138:web:dca739e309b2cd0fdd7653',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
