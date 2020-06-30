class Engine {
  constructor(theRoot) {
    this.root = theRoot
    this.player = new Player(this.root)
    this.enemies = []
    this.scoreText = this.createScoreText(SCORE)
    this.statusText = this.createCenteredText(`[Space] Start`)
    this.levelText = this.createLevelText(`Level ${LEVEL}`)

    this.canvas = document.createElement('canvas')
    this.canvas.width = GAME_WIDTH
    this.canvas.height = GAME_HEIGHT
    this.ctx = this.canvas.getContext('2d')
    this.bg = createBackground(this.ctx, 0, 0, 0, 2160)
    this.root.append(this.canvas)

    addWhiteBox(this.root)
  }
  
  gameLoop = () => {
    
    // Loop background
    this.animate()

    this.checkScore()
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

        Score: ${SCORE}
        Highest Level: ${LEVEL}

        [Space] Restart]`
      )
      this.statusText.center()
      this.statusText.show()
      this.setGameState(STATE.gameover)
    } else {
      this.run()
    }
  }

  animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.updateBg()
  }

  updateBg = () => {
    this.bg.dy == 0 && (this.bg.dy = 2160)
    this.bg.dy--
    this.ctx.drawImage(
      this.bg.image, 
      this.bg.dx, this.bg.dy, 3820, 2160, 
      // this.bg.dx, this.bg.dy, this.bg.image.width, this.bg.image.height, 
      this.bg.x, this.bg.y, this.canvas.width, this.canvas.height
    )
  }

  run = () => {
    this.timeoutID = setTimeout(this.gameLoop, 20)
  }

  pause = () => {
    clearTimeout(this.timeoutID)
  }

  restart = () => {
    this.player.domElement.remove()
    this.player = new Player(this.root)

    this.enemies
      .filter(enemy => !enemy.destroyed)
      .forEach(enemy => this.root.removeChild(enemy.domElement))
    this.enemies = []
    this.bg.dy = 2160
    SCORE = 0
    LEVEL = 1
    MAX_ENEMIES = 3
    this.scoreText.update(SCORE)
    this.levelText.update(`Level ${LEVEL}`)
    this.lastFrame === undefined
    this.gameLoop()
  }

  setGameState = state => CURRENT_STATE = state

  isPlayerDead = () => {
    for(const enemy of this.enemies) {
      let enemy_head_offset = -60
      let enemy_tail_offset = 0.4

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
    let text = new Text(root, 0, 0)
    text.update(txt)
    text.center()
    return text
  }
  
  createScoreText = txt => {
    let text = new Text(root, 30, 10)
    text.update(txt)
    return text
  }

  createLevelText = txt => {
    let text = new Text(root, 305, 10)
    text.update(txt)
    return text
  }

  checkScore = () => {
    switch(SCORE) {
      case 300: MAX_ENEMIES = 10; LEVEL = 8; this.levelText.update(`Level ${LEVEL}`); break;
      case 250: MAX_ENEMIES =  9; LEVEL = 7; this.levelText.update(`Level ${LEVEL}`); break;
      case 200: MAX_ENEMIES =  8; LEVEL = 6; this.levelText.update(`Level ${LEVEL}`); break;
      case 150: MAX_ENEMIES =  7; LEVEL = 5; this.levelText.update(`Level ${LEVEL}`); break;
      case 100: MAX_ENEMIES =  6; LEVEL = 4; this.levelText.update(`Level ${LEVEL}`); break;
      case  50: MAX_ENEMIES =  5; LEVEL = 3; this.levelText.update(`Level ${LEVEL}`); break;
      case  10: MAX_ENEMIES =  4; LEVEL = 2; this.levelText.update(`Level ${LEVEL}`); break;
    }
  }
}
