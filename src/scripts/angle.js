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

const size = 10
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
          ctx.fillStyle = 'black'
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
    //console.log(rays[0])
    rays.forEach(ray => {
      ctx.strokeStyle = 'purple'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(player.position.x * size, player.position.y * size)
      ctx.lineTo(
        (player.position.x + Math.cos(ray.angle) * ray.distance) * size,
        (player.position.y + Math.sin(ray.angle) * ray.distance) * size
      )
      ctx.closePath()
      ctx.stroke()
    })
  }
}

class Player {
  constructor(size, px, py) {
    this.size = size
    this.position = { x: px, y: py }
    this.mouse = { x: 0, y: 0 }
    this.angle = 0
    this.speed = 0
    this.crab = 0
    this.fov = toRad(66) //padrão de fov em fps
  }

  changeBlock(map) {
    const xIndex = Math.floor(this.mouse.x / this.size)
    const yIndex = Math.floor(this.mouse.y / this.size)
    map.content[xIndex][yIndex] = map.content[xIndex][yIndex] === 0 ? 1 : 0
  }

  handleKeyDown = e => {
    switch (e.key) {
      case 'z':
        this.changeBlock(map)
        break
      case 'a':
        this.crab = 1 / this.size
        break
      case 'd':
        this.crab = -1 / this.size
        break
      case 'w':
        this.speed = 1 / this.size
        break
      case 's':
        this.speed = -1 / this.size
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
    this.mouse.x = e.clientX
    this.mouse.y = e.clientY
    this.angle += toRad(e.movementX / 10)
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
    if (
      map.content[indexY] == undefined ||
      map.content[indexY][indexX] == undefined
    ) {
      return
    }
    const cell = map.content[indexY][indexX]
    if (!cell) {
      this.position.x += xIncrement
      this.position.y += yIncrement
    }
  }

  renderScene(rays, map) {
    rays.forEach((ray, i) => {
      const distance = fixFishEye(ray.distance, ray.angle, player.angle)
      const wallHeight = ((1 * 5) / distance) * 177 // mudar esse valor
      ctx.fillStyle = ray.vertical
        ? 'dark' + map.colors[ray.color]
        : map.colors[ray.color]
      ctx.fillRect(i, canvas.height / 2 - wallHeight / 2, 1, wallHeight)

      ctx.fillStyle = 'dimgray'
      ctx.fillRect(
        i,
        canvas.height / 2 + wallHeight / 2,
        1,
        canvas.height / 2 - wallHeight / 2
      )
      ctx.fillStyle = 'white'
      ctx.fillRect(i, 0, 1, canvas.height / 2 - wallHeight / 2)
    })
  }
}

const fixFishEye = (distance, angle, playerAngle) => {
  const diff = angle - playerAngle
  return distance * Math.cos(diff)
}

const outOfMapBounds = (xIndex, yIndex) => {
  return (
    xIndex < 0 ||
    xIndex >= map.content[0].length ||
    yIndex < 0 ||
    yIndex >= map.content.length
  )
}

const distance = (x1, y1, x2, y2) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

const getVCollision = angle => {
  const right = Math.abs(Math.floor((angle - Math.PI / 2) / Math.PI) % 2)

  const firstX = right
    ? Math.floor(player.position.x / 1) * 1 + 1
    : Math.floor(player.position.x / 1) * 1

  const firstY =
    player.position.y + (firstX - player.position.x) * Math.tan(angle)

  const xA = right ? 1 : -1
  const yA = xA * Math.tan(angle)

  let wall
  let nextX = firstX
  let nextY = firstY
  while (!wall) {
    const cellX = right ? Math.floor(nextX / 1) : Math.floor(nextX / 1) - 1
    const cellY = Math.floor(nextY / 1)

    if (outOfMapBounds(cellX, cellY)) {
      break
    }
    wall = map.content[cellX][cellY] // O ERRO ESTAVA AQUI
    if (!wall) {
      nextX += xA
      nextY += yA
    }
  }
  return {
    angle,
    distance: distance(player.position.x, player.position.y, nextX, nextY),
    vertical: true,
    color: wall
  }
}

const getHCollision = angle => {
  const up = Math.abs(Math.floor(angle / Math.PI) % 2)
  const firstY = up
    ? Math.floor(player.position.y / 1) * 1
    : Math.floor(player.position.y / 1) * 1 + 1
  const firstX =
    player.position.x + (firstY - player.position.y) / Math.tan(angle)
  const yA = up ? -1 : 1
  const xA = yA / Math.tan(angle)

  let wall
  let nextX = firstX
  let nextY = firstY
  while (!wall) {
    const cellX = Math.floor(nextX / 1)
    const cellY = up ? Math.floor(nextY / 1) - 1 : Math.floor(nextY / 1)
    if (outOfMapBounds(cellX, cellY)) {
      break
    }

    wall = map.content[cellX][cellY]
    if (!wall) {
      nextX += xA
      nextY += yA
    }
  }
  return {
    angle,
    distance: distance(player.position.x, player.position.y, nextX, nextY),
    vertical: false,
    color: wall
  }
}

const castRay = angle => {
  const vCollision = getVCollision(angle)
  const hCollision = getHCollision(angle)
  return vCollision.distance <= hCollision.distance ? vCollision : hCollision
}

const getRays = player => {
  const initialAngle = player.angle - player.fov / 2
  const numberOfRays = canvas.width
  const angleStep = player.fov / numberOfRays

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
const player = new Player(size, 2.5, 2.5)

const animate = () => {
  map.clearScreen()
  player.move(map)
  const rays = getRays(player)
  player.renderScene(rays, map)
  map.drawMap()
  map.drawEye(player)
  map.drawPlayer(player)
  map.drawRays(player, rays)
  requestAnimationFrame(animate)
}

animate()

document.addEventListener('keydown', player.handleKeyDown)
document.addEventListener('keyup', player.handleKeyUp)
document.addEventListener('mousemove', player.handleMouseMove)
canvas.addEventListener('click', () => {
  canvas.requestPointerLock()
})
