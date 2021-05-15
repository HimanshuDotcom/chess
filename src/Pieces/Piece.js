export default class Piece {
    constructor(player, iconUrl) {
      this.player = player;
      this.style = { backgroundImage: "url('" + iconUrl + "')", width: 'calc(var(--sizeBoard) /8)', height: 'calc(var(--sizeBoard) /8)' };

      this.value = true;
    }
    
    getPlayer() {
      return this.player
    }
  }