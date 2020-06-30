const GAME_WIDTH = 375
const GAME_HEIGHT = 500

const ENEMY_WIDTH = 75
const ENEMY_HEIGHT = 156
const MAX_ENEMIES = 3

const PLAYER_WIDTH = 75
const PLAYER_HEIGHT = 54

const STATE = {
  'paused': 0,
  'running': 1,
  'gameover': 2
}

let CURRENT_STATE = STATE.paused