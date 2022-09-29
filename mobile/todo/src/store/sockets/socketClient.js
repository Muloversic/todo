import io from 'socket.io-client'

const host = 'http://10.0.2.2:4000'

const socketClient = io(host, {
  transports: ['websocket'],
  upgrade: false,
})

export default socketClient
