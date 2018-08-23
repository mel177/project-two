// Initialize Firebase

var config = {
    apiKey: "AIzaSyDUVyHtfih5U6Ie3i-c4tlwZS4Go9LI4vI",
    authDomain: "tutorapp-fc0c1.firebaseapp.com",
    databaseURL: "https://tutorapp-fc0c1.firebaseio.com",
    projectId: "tutorapp-fc0c1",
    storageBucket: "tutorapp-fc0c1.appspot.com",
    messagingSenderId: "881810633614"
  };
  firebase.initializeApp(config);

//retrieve firebase messaging object
const messaging = firebase.messaging();

let userId;
  //gcm sender id indicating that FCM is authorized to send messages to this app
 

// Add the public key generated from the console here.
messaging.usePublicVapidKey("BNSp2__MZ9XvBG7JWOnZkqOxj8UwMI8dimhQuKP_keOivWzV-4vwBADa7wkjE9OFhe2vwS-Fz3ty1V3oo-Q3l-0");
//request permission to receive notifcations
messaging.requestPermission().then(function() {
  console.log('Notification permission granted.');
  // Retrieve an Instance ID token for use with FCM.
  return messaging.getToken();
}).then(function(token) {
    //console.log(token)
    userId = token;
    console.log(userId);
    //send to server so we can send a message to this token later on
    
}).catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});

/*
// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then(function(currentToken) {
  if (currentToken) {
    sendTokenToServer(currentToken);
    updateUIForPushEnabled(currentToken);
    console.log(currentToken);
  } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    // Show permission UI.
    updateUIForPushPermissionRequired();
    setTokenSentToServer(false);
  }
}).catch(function(err) {
  console.log('An error occurred while retrieving token. ', err);
  showToken('Error retrieving Instance ID token. ', err);
  setTokenSentToServer(false);
});
*/


