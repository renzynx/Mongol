class Command {
  constructor(options) {
    this.id = options.id || '';
    this.aliases = options.aliases || [];
    this.description = options.description || null;
    this.usage = options.usage || null;
    this.example = options.example || [];
    this.category = options.category || null;
    this.guildOnly = Boolean(options.guildOnly) || true;
    this.ownerOnly = Boolean(options.ownerOnly) || false;
    this.requiredArgs = Number(options.requiredArgs) || 0;
    this.inVoiceChannel = Boolean(options.inVoiceChannel) || false;
    this.sameVoiceChannel = Boolean(options.sameVoiceChannel) || false;
    this.isPlaying = Boolean(options.isPlaying) || false;
    this.cooldown = Number(options.cooldown) || 0;
    this.userPermissions = options.userPermissions || [];
    this.clientPermissions = options.clientPermissions || [];
  }
}

module.exports = Command;