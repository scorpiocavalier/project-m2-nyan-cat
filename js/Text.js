class Text {
  constructor(root, xPos, yPos) {
    const div = document.createElement('div')

    div.style.position = 'absolute'
    div.style.left = xPos
    div.style.top = yPos
    div.style.color = 'white'
    div.style.font = 'bold 30px Impact'
    div.style.zIndex = 2000
    
    root.appendChild(div)
    
    this.domElement = div
  }

  update(txt) {
    this.domElement.innerText = txt
  }

  hide = () => {
    this.domElement.style.visibility = 'hidden'
  }

  show = () => {
    this.domElement.style.visibility = 'visible'
  }

  center = () => {
    this.domElement.style.textAlign = 'center'
    this.domElement.style.left = (GAME_WIDTH - this.domElement.clientWidth) / 2 
    this.domElement.style.top = (GAME_HEIGHT - this.domElement.clientHeight) / 2
  }
}
