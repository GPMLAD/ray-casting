const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const initialMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 4, 0, 0, 0, 0, 5, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 4, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

const size = 25

class Player {
  constructor(size, pX, pY, dirX, dirY, planeX, planeY) {
    this.mousePositions = { x: 0, y: 0 }
    this.size = size
    this.position = { x: pX, y: pY }
    this.dir = { x: dirX, y: dirY }
    this.plane = { x: planeX, y: planeY }
    this.moveSpeed = 1
    this.rotSpeed = Math.PI / 120
  }

  handleKeyDown = e => {
    switch (e.key) {
      case 'z':
        map.changeBlock(this.mousePositions.x, this.mousePositions.y, this.size)
        break
      case 'a':
        this.rotate(-this.rotSpeed)
        break
      case 'd':
        this.rotate(this.rotSpeed)
        break
      case 'w':
        this.translate(this.moveSpeed)
        break
      case 's':
        this.translate(-this.moveSpeed)
        break
    }
  }

  handleMouseMove = e => {
    this.mousePositions.x = e.clientX
    this.mousePositions.y = e.clientY
  }

  translate(moveSpeed) {
    this.position.x = this.position.x + this.dir.x * moveSpeed
    this.position.y = this.position.y + this.dir.y * moveSpeed
  }
}

class Map {
  constructor(matrix, size) {
    this.content = matrix
    this.size = size
  }

  clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  drawMap() {
    for (let i = 0; i < this.content.length; i++) {
      const row = this.content[i]
      for (let j = 0; j < row.length; j++) {
        const element = row[j]
        if (element) {
          ctx.fillStyle = 'blue'
          ctx.fillRect(
            i * this.size,
            j * this.size,
            this.size - 2,
            this.size - 2
          )
        } else {
          ctx.fillStyle = 'grey'
          ctx.fillRect(
            i * this.size,
            j * this.size,
            this.size - 2,
            this.size - 2
          )
        }
      }
    }
  }

  drawPlayer(x, y, size) {
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'
    ctx.beginPath()
    ctx.arc(x * size, y * size, size / 4, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
  }

  drawDir(dir, playerPosition, size) {
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(playerPosition.x * size, playerPosition.y * size)
    ctx.lineTo(
      (playerPosition.x + dir.x) * size,
      (playerPosition.y + dir.y) * size
    )
    ctx.fill()
    ctx.stroke()
  }

  drawPlane(plane, dir, player, size) {
    ctx.fillStyle = 'purple'
    ctx.strokeStyle = 'purple'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo((player.x + dir.x) * size, (player.y + dir.y) * size)
    ctx.lineTo(
      (player.x + dir.x + plane.x / 2) * size,
      (player.y + dir.y + plane.y / 2) * size
    )
    ctx.lineTo(
      (player.x + dir.x - plane.x / 2) * size,
      (player.y + dir.y - plane.y / 2) * size
    )
    ctx.fill()
    ctx.stroke()
  }

  changeBlock(x, y, size) {
    const xIndex = Math.floor(x / size)
    const yIndex = Math.floor(y / size)
    this.content[xIndex][yIndex] = this.content[xIndex][yIndex] === 0 ? 1 : 0
  }
}

const player = new Player(size, 2, 2, 1, 0, 0, 0.66)
const map = new Map(initialMap, player.size)

const animate = () => {
  map.clearScreen()
  map.drawMap()
  map.drawPlayer(player.position.x, player.position.y, player.size)
  map.drawDir(player.dir, player.position, player.size)
  map.drawPlane(player.plane, player.dir, player.position, player.size)
  requestAnimationFrame(animate)
}

animate()

document.addEventListener('keydown', player.handleKeyDown)
document.addEventListener('mousemove', player.handleMouseMove)
