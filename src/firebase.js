import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyARFnYuXV7rtFfwWDN8Z4iR_-M9bS9g59k",
  authDomain: "pwa-quiz-app-e534f.firebaseapp.com",
  databaseURL: "https://pwa-quiz-app-e534f.firebaseio.com",
  projectId: "pwa-quiz-app-e534f",
  storageBucket: "pwa-quiz-app-e534f.appspot.com",
  messagingSenderId: "306102495750",
  appId: "1:306102495750:web:63304975557d670d7b7187",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
