const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const map = [
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

const mapWidth = map[0].length
const mapHeight = map.length

const colors = { 1: 'red', 2: 'green', 3: 'blue', 4: 'gray', 5: 'cyan' }

let posX = 22
let posY = 12
let dirX = -1
let dirY = 0
let planeX = 0
let planeY = 0.66

const moveSpeed = 1 / 10
const rotSpeed = Math.PI / 120

const updateCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const castRays = () => {
  for (let i = 0; i < canvas.width; i++) {
    let cameraX = (2 * i) / canvas.width - 1
    let rayDirX = dirX + planeX * cameraX
    let rayDirY = dirY + planeY * cameraX

    let mapX = Math.floor(posX)
    let mapY = Math.floor(posY)

    let sideDistX
    let sideDistY

    let deltaDistX = Math.abs(1 / rayDirX)
    let deltaDistY = Math.abs(1 / rayDirY)

    let perpWallDist

    let stepX
    let stepY

    let cell
    let hit = 0
    let side

    if (rayDirX < 0) {
      stepX = -1
      sideDistX = (posX - mapX) * deltaDistX
    } else {
      stepX = 1
      sideDistX = (mapX + 1 - posX) * deltaDistX
    }
    if (rayDirY < 0) {
      stepY = -1
      sideDistY = (posY - mapY) * deltaDistY
    } else {
      stepY = 1
      sideDistY = (mapY + 1 - posY) * deltaDistY
    }

    while (hit === 0) {
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX
        mapX += stepX
        side = 0
      } else {
        sideDistY += deltaDistY
        mapY += stepY
        side = 1
      }
      cell = map[mapY][mapX]
      if (cell > 0) hit = 1
    }

    if (side === 0) {
      perpWallDist = (mapX - posX + (1 - stepX) / 2) / rayDirX
    } else {
      perpWallDist = (mapY - posY + (1 - stepY) / 2) / rayDirY
    }

    let lineHeight = canvas.height / perpWallDist

    let drawStart = Math.max(0, -lineHeight / 2 + canvas.height / 2)
    let drawEnd = Math.min(
      canvas.height - 1,
      lineHeight / 2 + canvas.height / 2
    )

    let color = colors[cell]
    if (side === 1) {
      color = 'dark' + color
    }

    ctx.fillStyle = color
    ctx.fillRect(i, drawStart, 1, drawEnd - drawStart + 1)
  }
}

const handleKeyPress = e => {
  const moveForward = () => {
    const nextX = posX + dirX * moveSpeed
    const nextY = posY + dirY * moveSpeed

    if (map[Math.floor(nextY)][Math.floor(nextX)] === 0) {
      posX = nextX
      posY = nextY
    }
  }

  const moveBackward = () => {
    const nextX = posX - dirX * moveSpeed
    const nextY = posY - dirY * moveSpeed

    if (map[Math.floor(nextY)][Math.floor(nextX)] === 0) {
      posX = nextX
      posY = nextY
    }
  }

  const rotate = angle => {
    const oldDirX = dirX
    dirX = dirX * Math.cos(angle) - dirY * Math.sin(angle)
    dirY = oldDirX * Math.sin(angle) + dirY * Math.cos(angle)

    const oldPlaneX = planeX
    planeX = planeX * Math.cos(angle) - planeY * Math.sin(angle)
    planeY = oldPlaneX * Math.sin(angle) + planeY * Math.cos(angle)
  }

  switch (e.key) {
    case 'ArrowUp':
      moveForward()
      break
    case 'ArrowDown':
      moveBackward()
      break
    case 'ArrowRight':
      rotate(-rotSpeed)
      break
    case 'ArrowLeft':
      rotate(rotSpeed)
      break
  }
}

const animate = () => {
  updateCanvas()
  castRays()
  requestAnimationFrame(animate)
}

animate()

canvas.addEventListener('click', () => {
  canvas.requestPointerLock()
})

document.addEventListener('keydown', handleKeyPress)
