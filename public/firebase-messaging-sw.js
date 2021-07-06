// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyAaOPf04QWfSVAvR4F96vBMhR7YcSp4mBA',
  authDomain: 'pwa-notifications-react.firebaseapp.com',
  projectId: 'pwa-notifications-react',
  storageBucket: 'pwa-notifications-react.appspot.com',
  messagingSenderId: '418677280329',
  appId: '1:418677280329:web:ac81b0c642af7034ed3998'
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body
  }

  self.registration.showNotification(notificationTitle,
    notificationOptions)
})
