class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(e, listener) {
    if (this.events[e]) this.events[e].push(listener);
    else this.events[e] = [listener];
  }

  emit(e, arg) {
    if (this.events[e]) this.events[e].forEach(listener => listener(arg));
  }
}
