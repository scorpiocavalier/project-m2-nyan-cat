const body = document.querySelector('body')
body.style.margin = '0'
body.style.padding = '0'
body.style.backgroundColor = 'lightslategray'

const section = document.querySelector('section')
section.style.position = 'relative'
section.style.display = 'flex'
section.style.justifyContent = 'center'

const root = document.getElementById('app')
root.style.position = 'absolute'
root.style.width = GAME_WIDTH
root.style.height = GAME_HEIGHT

const gameEngine = new Engine(root)

// Audio
const soundtrack = document.createElement('audio')
soundtrack.src = "./audio/Defense Line.mp3"

const keydownHandler = (event) => {
  if(CURRENT_STATE == STATE.running) {
    switch(event.code) {
      case 'ArrowLeft': gameEngine.player.moveLeft(); break;
      case 'ArrowRight': gameEngine.player.moveRight(); break;
      case 'ArrowUp': gameEngine.player.moveUp(); break;
      case 'ArrowDown': gameEngine.player.moveDown(); break;
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