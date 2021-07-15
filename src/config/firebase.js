// Firebase App (the core Firebase SDK) is always required and
import firebase from 'firebase/app'

// Add the Firebase services that you want to use
// must be listed before other Firebase SDKs
// import "firebase/auth";
// import "firebase/firestore";
import 'firebase/messaging'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyAaOPf04QWfSVAvR4F96vBMhR7YcSp4mBA',
  authDomain: 'pwa-notifications-react.firebaseapp.com',
  projectId: 'pwa-notifications-react',
  storageBucket: 'pwa-notifications-react.appspot.com',
  messagingSenderId: '418677280329',
  appId: '1:418677280329:web:ac81b0c642af7034ed3998'
}

// Initialize Firebase

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

export const getToken = async ({ setBloqued }) => {
  try {
    const currentToken = await messaging.getToken({
      vapidKey:
        'BElWHnQes-JT8OTCKPUpQcItNMCwtA3EQbXRIUi9-Dv5KDGcsDfIBnqjpLZoxhIES9ICarMuaVJR7Lwe2Z5DfXU'
    })
    if (currentToken) {
      console.log('current token for client: ', currentToken)
      const subscribedNewVersion = await getSubscriptions(currentToken, 'new-version')
      if (!subscribedNewVersion) {
        subscribeTokenToTopic(currentToken, 'new-version')
      }
    } else {
      console.log(
        'No registration token available. Request permission to generate one.'
      )
      // shows on the UI that permission is required
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err)
    setBloqued(true)
  }
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload)
    })
  })

function subscribeTokenToTopic (token, topic) {
  fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
    method: 'POST',
    headers: {
      Authorization: `key=${process.env.REACT_APP_KEY_MESSAGINGS}`
    }
  }).then(response => {
    if (response.status < 200 || response.status >= 400) {
      throw new Error(`Error subscribing to topic: ${response.status} - ${response.text()}`)
    }
    console.log(`Subscribed to "${topic}"`)
  }).catch(error => {
    console.error(error)
  })
}

async function getSubscriptions (token, topic) {
  try {
    const resp = await fetch(`https://iid.googleapis.com/iid/info/${token}?details=true`, {
      headers: {
        Authorization: `key=${process.env.REACT_APP_KEY_MESSAGINGS}`
      }
    })
    const data = await resp.json()
    if ('rel' in data) {
      const { rel: { topics } } = data
      return topic in topics
    }
    return false
  } catch (error) {
    console.error(error)
    return false
  }
}

// Firebase Analytics
const analytics = firebase.analytics()

export default analytics
