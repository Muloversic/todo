class EventEmitter {
  constructor() {
    this.events = {}
  }

  subscribe = (type, callback) => {
    !this.events[type] && (this.events[type] = [])
    this.events[type].push(callback)
  }

  unsubscribe = (type, callback) => {
    this.events[type] = this.events[type].filter((eventCallback) => callback !== eventCallback)
  }

  emit = (action) => {
    const event = this.events[action.type]
    event && event.forEach((callback) => callback.call(null, action))
    // console.log(`%c ACTION "${action.type}" DISPATCHED: `, 'color: green; font-weight: 700', {
    //   type: action.type,
    //   payload: action.payload,
    // })
  }
}

const eventEmitter = new EventEmitter()
export default eventEmitter
