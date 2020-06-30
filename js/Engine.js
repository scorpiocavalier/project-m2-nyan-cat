class Engine {
  constructor(theRoot) {
    this.root = theRoot
    this.player = new Player(this.root)
    this.enemies = []
    this.scoreText = this.createScoreText(SCORE)
    this.statusText = this.createCenteredText('Start [Spacebar]')
    addBackground(this.root)
  }

  gameLoop = () => {
    this.statusText.hide()
    this.scoreText.update(SCORE)

    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime()
    }

    let timeDiff = new Date().getTime() - this.lastFrame

    this.lastFrame = new Date().getTime()
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff)
    })

    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed
    })

    while (this.enemies.length < MAX_ENEMIES) {
      const spot = nextEnemySpot(this.enemies)
      this.enemies.push(new Enemy(this.root, spot))
    }

    if(this.isPlayerDead()) {
      this.pause()
      this.statusText.update(
        `GAME OVER
        [Spacebar to restart]`
      )
      this.statusText.center()
      this.statusText.show()
      this.setGameState(STATE.gameover)
    } else {
      this.run()
    }
  }

  run = () => {
    this.timeoutID = setTimeout(this.gameLoop, 20)
  }

  pause = () => {
    clearTimeout(this.timeoutID)
  }

  restart = () => {
    this.enemies
      .filter(enemy => !enemy.destroyed)
      .forEach(enemy => this.root.removeChild(enemy.domElement))
    this.enemies = []
    this.lastFrame === undefined
    this.gameLoop()
  }

  setGameState = state => CURRENT_STATE = state

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
  }

  createCenteredText = txt => {
    let statusText = new Text(root, 0, 0)
    statusText.update(txt)
    statusText.center()
    return statusText
  }
  
  createScoreText = txt => {
    let statusText = new Text(root, 20, 10)
    statusText.update(txt)
    return statusText
  }
}
