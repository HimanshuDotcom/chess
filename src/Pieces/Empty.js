export default class Empty {
    constructor() {
      this.style = { backgroundcolor: "black", width:'10%', height: '10vh' };
      this.value = false;
    }
    isMovePossible(src, dest, squares) {
      return true
    }
    getPlayer() {
      return this.player
    }
    getSrcToDestPath() {
      return [];
    }
}