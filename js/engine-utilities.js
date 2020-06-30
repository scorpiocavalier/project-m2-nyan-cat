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
  // ctx.drawImage(image, dx, dy, image.width, image.height, x, y, GAME_WIDTH, GAME_HEIGHT)
}

function createBackground(ctx, x, y, dx, dy) {
  const image = new Image(GAME_WIDTH, GAME_HEIGHT)
  image.onload = () => drawBg(ctx, image, dx, dy, x, y)
  image.src = '../images/bg-2.jpg'

  return { image: image, x, y, dx, dy }
}

const addWhiteBox = (root) => {
  const whiteBox = document.createElement('div')

  whiteBox.style.zIndex = 100
  whiteBox.style.position = 'absolute'
  whiteBox.style.top = `${GAME_HEIGHT}px`
  whiteBox.style.height = `${ENEMY_HEIGHT}px`
  whiteBox.style.width = `${GAME_WIDTH}px`
  whiteBox.style.background = '#fff'
  root.append(whiteBox)
}

// const addBackground = (root) => {
//   const bg = document.createElement('img')

//   bg.src = 'images/bg-2.jpg'
//   // bg.src = 'images/stars.png'
//   bg.style.height = `${GAME_HEIGHT}px`
//   bg.style.width = `${GAME_WIDTH}px`

//   root.append(bg)

//   const whiteBox = document.createElement('div')

//   whiteBox.style.zIndex = 100
//   whiteBox.style.position = 'absolute'
//   whiteBox.style.top = `${GAME_HEIGHT}px`
//   whiteBox.style.height = `${ENEMY_HEIGHT}px`
//   whiteBox.style.width = `${GAME_WIDTH}px`
//   whiteBox.style.background = '#fff'
//   root.append(whiteBox)
// }
