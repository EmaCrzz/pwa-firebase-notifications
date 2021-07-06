import { lazy, Suspense, useContext } from 'react'

import './App.css'
import MessagingsContext from 'contexts/Messagings'

import useGif from 'hooks/useGif'
import { onMessageListener } from 'config/firebase'

const Button = lazy(() => import('components/Button'))
const Alert = lazy(() => import('components/Alert'))
const Version = lazy(() => import('components/Version'))

const renderLoader = () => <div>Cargando ♾</div>

function App () {
  const { gif } = useGif()
  const {
    newVersion,
    onReloadApp,
    onShowPermission,
    showPermission
  } = useContext(MessagingsContext)

  onMessageListener()
    .then((payload) => {
      alert(payload.notification.body)
      // setShow(true);
      // setNotification({
      //   title: payload.notification.title,
      //   body: payload.notification.body,
      // });
      console.log(payload)
    })
    .catch((err) => console.log('failed: ', err))

  return (
    <Suspense fallback={renderLoader()}>
      <div className='App'>
        <header className='App-header'>
          <div className='content'>
            <img className='App-logo' alt={gif?.title} src={gif?.url} />
            <p>Estamos trabajando en esto 🤓</p>
            {showPermission === false && (
              <Alert severity='error' title='¡Necesitamos tus permisos!'>
                No tenemos permisos para enviarte notificaciones. Los
                necesitamos 😬
              </Alert>
            )}
            {showPermission === undefined && (
              <Alert
                action={<Button onClick={onShowPermission}>OK</Button>}
                severity='error'
                title='¡Necesitamos tus permisos!'
              >
                Queremos enviarte notificaciones. ¿Nos das permiso? 😇
              </Alert>
            )}
            {newVersion && (
              <Alert
                severity='error'
                title='Tenemos una nueva versión recarga para obenerla 😉'
                action={<Button onClick={onReloadApp}>Actualizar</Button>}
              />
            )}
            <br />
          </div>
          <p>
            <Version />
          </p>
        </header>
      </div>
    </Suspense>
  )
}

export default App
