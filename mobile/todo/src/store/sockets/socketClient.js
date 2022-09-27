import io from 'socket.io-client'

const host = 'http://localhost:4000'

const socketClient = io(host, {
  transports: ['websocket'],
  upgrade: false,
})

export default socketClient
