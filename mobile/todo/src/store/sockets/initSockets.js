import client from './socketClient'
import { NOTIFICATION_SENT, NOTIFICATION_RECEIVED } from '../../constants'

const initSockets = (store) => {
  client.on(NOTIFICATION_SENT, (event) => {
    console.log('new event received ===>', event)
    store.dispatch({ type: NOTIFICATION_RECEIVED, payload: event })
  })
}

export default initSockets
