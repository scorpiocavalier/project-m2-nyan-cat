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

    addHiddenBox(this.root)
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

    this.isPlayerDead() ? this.endGame() : this.run()
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
      this.bg.x, this.bg.y, this.canvas.width, this.canvas.height
    )
  }

  run = () => {
    this.timeoutID = setTimeout(this.gameLoop, 20)
  }

  pause = () => {
    clearTimeout(this.timeoutID)
  }

  endGame = () => {
    this.pause()
    soundtrack.pause()
    this.statusText.update(
      `GAME OVER

      Score: ${SCORE}
      Highest Level: ${LEVEL}

      [Space] Restart]`
    )
    this.statusText.center()
    this.statusText.show()
    this.setGameState(STATE.gameover)
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
    if(SCORE >= 200) {
      this.levelText.update('You are a Grandmaster!')
      this.endGame()
      return
    }

    if(  SCORE >=  10 && LEVEL == 1   
      || SCORE >=  50 && LEVEL == 2  
      || SCORE >= 100 && LEVEL == 3  
      || SCORE >= 150 && LEVEL == 4)  
    //|| SCORE >= 200 && LEVEL == 5
    //|| SCORE >= 250 && LEVEL == 6  
    //|| SCORE >= 300 && LEVEL == 7) 
      {
        MAX_ENEMIES++
        LEVEL++
        this.levelText.update(`Level ${LEVEL}`)
      }
  }
}