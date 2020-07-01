const root = document.getElementById('app')
const gameEngine = new Engine(root)

// Audio
const soundtrack = document.createElement('audio')
soundtrack.src = "./audio/Defense Line.mp3"

const keydownHandler = (event) => {
  if(CURRENT_STATE == STATE.running) {
    if (event.code === 'ArrowLeft') {
      gameEngine.player.moveLeft()
    }
  
    if (event.code === 'ArrowRight') {
      gameEngine.player.moveRight()
    }
    
    if (event.code === 'ArrowUp') {
      gameEngine.player.moveUp()
    }
    
    if (event.code === 'ArrowDown') {
      gameEngine.player.moveDown()
    }
  }
  
  if(event.code === 'Space') {
    if(CURRENT_STATE === STATE.paused) {
      soundtrack.play()
      gameEngine.setGameState(STATE.running)
      gameEngine.gameLoop()
    } else if (CURRENT_STATE === STATE.gameover) {
      soundtrack.currentTime = 0
      soundtrack.play()
      gameEngine.setGameState(STATE.paused)
      gameEngine.restart()
      gameEngine.setGameState(STATE.running)
    }
  }
}

document.addEventListener('keydown', keydownHandler)