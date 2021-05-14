export default class Piece {
    constructor(player, iconUrl) {
      this.player = player;
      this.style = { backgroundImage: "url('" + iconUrl + "')", width:'10%', height: '10vh' };
      this.value = true;
    }
  
    getPlayer() {
      return this.player
    }
  }