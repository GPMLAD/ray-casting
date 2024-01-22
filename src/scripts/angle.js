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
const cellSize = 64

class Map {
  constructor(matrix, size) {
    this.content = matrix
    this.size = size
    this.colors = { 1: 'red', 2: 'green', 3: 'blue', 4: 'gray', 5: 'cyan' }
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

  drawPlayer(player) {
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'
    ctx.beginPath()
    ctx.arc(
      player.position.x * this.size,
      player.position.y * this.size,
      this.size / 4,
      0,
      2 * Math.PI
    )
    ctx.fill()
    ctx.stroke()
  }

  drawEye(player) {
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(player.position.x * size, player.position.y * size)
    ctx.lineTo(
      (player.position.x + Math.cos(player.angle)) * size,
      (player.position.y + Math.sin(player.angle)) * size
    )
    ctx.closePath()
    ctx.stroke()
  }

  drawRays(player, rays) {
    ctx.strokeStyle = 'purple'
    ctx.lineWidth = 1
    rays.forEach(ray => {
      ctx.beginPath()
      ctx.moveTo(player.position.x * size, player.position.y * size)
      ctx.lineTo(
        (player.position.x + Math.cos(ray.angle) * rayLength) * size,
        (player.position.y + Math.sin(ray.angle) * rayLength) * size
      )
      ctx.closePath()
    })
  }
}

class Player {
  constructor(size, px, py) {
    this.size = size
    this.position = { x: 2.5, y: 2.5 }
    this.angle = 0
    this.speed = 0
    this.crab = 0
    this.fov = 66
  }

  handleKeyDown = e => {
    switch (e.key) {
      case 'z':
        console.log('z')
        break
      case 'a':
        this.crab = 2 / this.size
        break
      case 'd':
        this.crab = -2 / this.size
        break
      case 'w':
        this.speed = 2 / this.size
        break
      case 's':
        this.speed = -2 / this.size
        break
    }
  }

  handleKeyUp = e => {
    if (e.key == 'a' || e.key == 'd') {
      this.crab = 0
    }
    if (e.key == 'w' || e.key == 's') {
      this.speed = 0
    }
  }

  handleMouseMove = e => {
    this.angle += toRad(e.movementX)
    if (this.angle >= 2 * Math.PI || this.angle <= -2 * Math.PI) {
      this.angle = 0
    }
  }

  move(map) {
    const xIncrement =
      Math.cos(this.angle) * this.speed +
      Math.cos(this.angle - Math.PI / 2) * this.crab
    const yIncrement =
      Math.sin(this.angle) * this.speed +
      Math.sin(this.angle - Math.PI / 2) * this.crab

    const indexY = Math.floor(this.position.x + xIncrement)
    const indexX = Math.floor(this.position.y + yIncrement)

    const cell = map.content[indexY][indexX]
    if (!cell) {
      this.position.x += xIncrement
      this.position.y += yIncrement
    }
  }

  renderScene() {}
}

const getVCollision = angle => {}
const getHCollision = angle => {}

const castRay = angle => {
  const vCollision = getVCollision(angle)
  const hCollision = getHCollision(angle)
  return vCollision.distance >= hCollision.distance ? vCollision : hCollision
}

const getRays = player => {
  const initialAngle = player.angle - player.fov / 2
  const numberOfRays = canvas.width
  const angleStep = player.fov / numberOfRays
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
  }
  return Array.from({ length: numberOfRays }, (_, i) => {
    const angle = initialAngle + i * angleStep
    const ray = castRay(angle)
    return ray
  })
}

const toRad = degree => {
  return (degree * Math.PI) / 180
}

const map = new Map(initialMap, size)
const player = new Player(size)

const animate = () => {
  map.clearScreen()
  player.move(map)
  map.drawMap()
  map.drawRays(player, [])
  map.drawEye(player)
  map.drawPlayer(player)
  requestAnimationFrame(animate)
}

animate()

document.addEventListener('keydown', player.handleKeyDown)
document.addEventListener('keyup', player.handleKeyUp)
document.addEventListener('mousemove', player.handleMouseMove)

// https://youtu.be/5nSFArCgCXA?t=1240
