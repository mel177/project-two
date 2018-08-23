  // Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');




  // Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': 'YOUR-SENDER-ID'
});


  const messaging = firebase.messaging();
  messaging.setBackgroundMessageHandler(function(payload){
    //const title = *title of message
    //const options = {
    //    body: *body of the message
   // };  
    return self.registration.showNotification(title, options);
  });



