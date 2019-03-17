import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBpxe0AjJolUSgjva6RtrGCcjaxeavwTmo",
  authDomain: "sakoonapp.firebaseapp.com",
  databaseURL: "https://sakoonapp.firebaseio.com",
  projectId: "sakoonapp",
  storageBucket: "sakoonapp.appspot.com",
  messagingSenderId: "385273294757"
};
firebase.initializeApp(config);

export default firebase
