const Event = require('../struct/Event');

class RawEvent extends Event {
    constructor() {
        super({
            id: 'raw',
            once: false
        })
    }
    exec (d) {
        this.client.manager.updateVoiceState(d);
    }
}

module.exports = RawEvent;