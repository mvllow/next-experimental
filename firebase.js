import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDtnwo2Kkhjz_LEaOnpQTcwsxblguXLo5A',
  authDomain: 'next-experimental.firebaseapp.com',
  databaseURL: 'https://next-experimental.firebaseio.com',
  projectId: 'next-experimental',
  storageBucket: 'next-experimental.appspot.com',
  messagingSenderId: '379992636448',
  appId: '1:379992636448:web:e7ed0850845b30fdea5045',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
