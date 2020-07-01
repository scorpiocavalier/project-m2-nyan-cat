const nextEnemySpot = (enemies) => {
  const enemySpots = GAME_WIDTH / ENEMY_WIDTH

  const spotsTaken = [false, false, false, false, false]
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true
  })

  let candidate = undefined
  while (candidate === undefined || spotsTaken[candidate]) {
    candidate = Math.floor(Math.random() * enemySpots)
  }

  return candidate
}

function drawBg(ctx, image, dx, dy, x, y) {
  ctx.drawImage(image, dx, dy, 3820, 2160, x, y, GAME_WIDTH, GAME_HEIGHT)
}

function createBackground(ctx, x, y, dx, dy) {
  const image = new Image(GAME_WIDTH, GAME_HEIGHT)
  image.onload = () => drawBg(ctx, image, dx, dy, x, y)
  image.src = '../images/bg-2.jpg'

  return { image: image, x, y, dx, dy }
}

const addHiddenBox = (root) => {
  const hiddenBox = document.createElement('div')

  hiddenBox.style.zIndex = 100
  hiddenBox.style.position = 'absolute'
  hiddenBox.style.top = `${GAME_HEIGHT}px`
  hiddenBox.style.height = `${ENEMY_HEIGHT}px`
  hiddenBox.style.width = `${GAME_WIDTH}px`
  hiddenBox.style.backgroundColor = 'lightslategray'
  root.append(hiddenBox)
}