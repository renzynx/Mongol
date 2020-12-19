const Event = require('../struct/Event.js');

class ReadyEvent extends Event {
  constructor() {
    super({
      id: 'ready',
      once: true,
    });
  }

  exec() {
    this.client.manager.init(this.client.user.id)
    console.log(`Logged in as ${this.client.user.tag}`);
  }
}

module.exports = ReadyEvent;