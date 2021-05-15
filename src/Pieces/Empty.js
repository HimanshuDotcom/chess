export default class Empty {
    constructor() {
      this.style = { backgroundcolor: "black", width: 'calc(var(--sizeBoard) /8)', height: 'calc(var(--sizeBoard) /8)' };

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