class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe = (type, callback) => {
    !this.events[type] && (this.events[type] = []);
    this.events[type].push(callback);
  };

  unsubscribe = (type, callback) => {
    this.events[type] = this.events[type].filter((eventCallback) => callback !== eventCallback);
  };

  emit = ({ type, payload }) => {
    const event = this.events[type];
    event && event.forEach((callback) => callback.call(null, payload));
  };
}

const eventEmitter = new EventEmitter();
export default eventEmitter;
