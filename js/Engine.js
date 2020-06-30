class Engine {
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];
    addBackground(this.root);
  }

  gameLoop = () => {
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    while (this.enemies.length < MAX_ENEMIES) {
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    this.isPlayerDead() ? window.alert('Game over') : setTimeout(this.gameLoop, 20)
  };

  isPlayerDead = () => {
    for(const enemy of this.enemies) {
      let enemy_head_offset = -10
      let enemy_tail_offset = 0.6

      let enemy_head    = enemy.y + ENEMY_HEIGHT + enemy_head_offset
      let enemy_left    = enemy.x
      let enemy_tail    = enemy.y + ENEMY_HEIGHT * enemy_tail_offset

      let player_head   = this.player.y
      let player_left   = this.player.x
      let player_tail   = this.player.y + PLAYER_HEIGHT

      if(  player_left == enemy_left
        && player_head <= enemy_head
        && player_tail >= enemy_tail)
        return true
    }
    return false
  };
}
