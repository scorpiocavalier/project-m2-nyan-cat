const root = document.getElementById('app')
const gameEngine = new Engine(root)

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
      gameEngine.setGameState(STATE.running)
      gameEngine.gameLoop()
    } else if (CURRENT_STATE === STATE.gameover) {
      gameEngine.setGameState(STATE.paused)
      gameEngine.restart()
      gameEngine.setGameState(STATE.running)
    }
  }
}

document.addEventListener('keydown', keydownHandler)