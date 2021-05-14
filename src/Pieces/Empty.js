export default class Empty {
    constructor() {
      this.style = { backgroundImage: "transparent", width:'10%', height: '10vh' };
      this.value = false;
    }
    isMovePossible(src, dest, squares) {
      return true
    }
    getPlayer() {
      return this.player
    }
}