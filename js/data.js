// const GAME_WIDTH = 525
// const GAME_HEIGHT = 700

// const ENEMY_WIDTH = 75
// const ENEMY_HEIGHT = 156

// const PLAYER_WIDTH = 75
// const PLAYER_HEIGHT = 54

const ENEMY_WIDTH = 100
const ENEMY_HEIGHT = 120

const PLAYER_WIDTH = 100
const PLAYER_HEIGHT = 120
const PLAYER_BOTTOM_SPAWN_OFFSET = -20

const GAME_LANES = 7
const GAME_WIDTH = GAME_LANES * PLAYER_WIDTH
const GAME_HEIGHT = 6 * PLAYER_HEIGHT - PLAYER_BOTTOM_SPAWN_OFFSET

const STATE = {
  'paused': 0,
  'running': 1,
  'gameover': 2
}

let SCORE = 0
let MAX_ENEMIES = 3
let LEVEL = 1
let CURRENT_STATE = STATE.paused