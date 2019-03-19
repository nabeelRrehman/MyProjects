import firebase from 'firebase'

// Put firebase configuration here...

{/* <script src="https://www.gstatic.com/firebasejs/5.5.7/firebase.js"></script> */}

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBU99AXDttK9D-ajONd4coIW-yTDM3Br08",
    authDomain: "vendor-web-ffe78.firebaseapp.com",
    databaseURL: "https://vendor-web-ffe78.firebaseio.com",
    projectId: "vendor-web-ffe78",
    storageBucket: "vendor-web-ffe78.appspot.com",
    messagingSenderId: "96659735524"
};
// Stripe.setPublishableKey('pk_test_38k055gR0zaLMFig7K9tXsBn');
firebase.initializeApp(config);



export default firebase