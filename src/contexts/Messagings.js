import React, { createContext, useEffect, useState } from 'react'

import { getToken } from 'config/firebase'

const MessagingsContext = createContext({ messages: {} })

function notifyMe () {
  console.log(Notification.permission)
  if (Notification.permission === 'granted') {
    return true
  }

  // Otherwise, we need to ask the user for permission
  if (Notification.permission === 'denied') {
    return false
  }
  if (Notification.permission === 'default') {
    return undefined
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

export function MessagingsProvider ({ children }) {
  const [showPermission, setShowPermission] = useState(notifyMe())
  const [newVersion, setNewVersion] = useState(false)
  const [isTokenFound, setTokenFound] = useState(false)

  const getPermissions = () => {
    getToken({ setTokenFound })
  }

  const onShowPermission = () => {
    setShowPermission(true)
  }

  // useEffect(() => messageListener(), [])
  useEffect(() => {
    if (showPermission) {
      getPermissions()
    }
  }, [showPermission])
  // const [hasPermissions, setHasPermissions] = useState(false)

  const onReloadApp = () => location.reload()

  const value = {
    isTokenFound,
    newVersion,
    showPermission,
    getPermissions,
    onReloadApp,
    onShowPermission
  }

  return (
    <MessagingsContext.Provider value={value}>
      {children}
    </MessagingsContext.Provider>
  )
}

export default MessagingsContext

// function App() {

//   const [show, setShow] = useState(false);
//   const [notification, setNotification] = useState({title: '', body: ''});

//   onMessageListener().then(payload => {
//     setShow(true);
//     setNotification({title: payload.notification.title, body: payload.notification.body})
//     console.log(payload);
//   }).catch(err => console.log('failed: ', err));

//   return (
//     <div className="App">
//         <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
//           position: 'absolute',
//           top: 20,
//           right: 20,
//           minWidth: 200
//         }}>
//           <Toast.Header>
//             <img
//               src="holder.js/20x20?text=%20"
//               className="rounded mr-2"
//               alt=""
//             />
//             <strong className="mr-auto">{notification.title}</strong>
//             <small>just now</small>
//           </Toast.Header>
//           <Toast.Body>{notification.body}</Toast.Body>
//         </Toast>
//       <header className="App-header">
//         {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
//         {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
//         <img src={logo} className="App-logo" alt="logo" />
//         <Button onClick={() => setShow(true)}>Show Toast</Button>
//       </header>

//     </div>
//   );
// }

// export default App;
