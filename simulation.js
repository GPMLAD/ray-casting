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

const size = 25
const mousePositions = { x: 0, y: 0 }
const player = { x: 2, y: 2 } // posição inicial do player
const dir = { x: 1, y: 0 } // vetor unitário da direção da visão ambos tem o range [-1,1]
const plane = { x: 0, y: 1 } // vetor unitário da paralelo a visão ambos tem o range [-1,1]

const moveSpeed = 1 / size
const rotSpeed = Math.PI / 32

const clearScreen = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const drawMap = map => {
  for (let i = 0; i < map.length; i++) {
    const row = map[i]
    for (let j = 0; j < row.length; j++) {
      const element = row[j]
      if (element) {
        ctx.fillStyle = 'blue'
        ctx.fillRect(i * size, j * size, size - 2, size - 2)
      } else {
        ctx.fillStyle = 'grey'
        ctx.fillRect(i * size, j * size, size - 2, size - 2)
      }
    }
  }
}

const drawPlayer = (x, y, size) => {
  ctx.fillStyle = 'red'
  ctx.strokeStyle = 'red'
  ctx.beginPath()
  ctx.arc(x * size, y * size, size / 4, 0, 2 * Math.PI)
  ctx.fill()
  ctx.stroke()
}

const drawDir = (dir, player, size) => {
  ctx.fillStyle = 'black'
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(player.x * size, player.y * size)
  ctx.lineTo((player.x + dir.x) * size, (player.y + dir.y) * size)
  ctx.fill()
  ctx.stroke()
}

const drawPlane = (plane, dir, player, size) => {
  ctx.fillStyle = 'purple'
  ctx.strokeStyle = 'purple'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo((player.x + dir.x) * size, (player.y + dir.y) * size)
  ctx.lineTo(
    (player.x + dir.x + plane.x) * size,
    (player.y + dir.y + plane.y) * size
  )
  ctx.lineTo(
    (player.x + dir.x - plane.x) * size,
    (player.y + dir.y - plane.y) * size
  )
  ctx.fill()
  ctx.stroke()
}

const changeBlock = (x, y) => {
  const xIndex = Math.floor(x / size)
  const yIndex = Math.floor(y / size)
  map[xIndex][yIndex] = map[xIndex][yIndex] === 0 ? 1 : 0
}

const rotate = rotSpeed => {
  const oldDirX = dir.x
  const oldDirY = dir.y

  dir.x = oldDirX * Math.cos(rotSpeed) - oldDirY * Math.sin(rotSpeed)
  dir.y = oldDirY * Math.cos(rotSpeed) + oldDirX * Math.sin(rotSpeed)

  const oldPlaneX = plane.x
  const oldPlaneY = plane.y

  plane.x = oldPlaneX * Math.cos(rotSpeed) - oldPlaneY * Math.sin(rotSpeed)
  plane.y = oldPlaneY * Math.cos(rotSpeed) + oldPlaneX * Math.sin(rotSpeed)
}

const translate = moveSpeed => {
  player.x = player.x + dir.x * moveSpeed
  player.y = player.y + dir.y * moveSpeed
}

const animate = () => {
  clearScreen()
  drawMap(map)
  drawPlayer(player.x, player.y, size)
  drawDir(dir, player, size)
  drawPlane(plane, dir, player, size)
  requestAnimationFrame(animate)
}

animate()

document.addEventListener('mousemove', e => {
  mousePositions.x = e.clientX
  mousePositions.y = e.clientY
})

document.addEventListener('keydown', e => {
  if (e.key == 'z') {
    changeBlock(mousePositions.x, mousePositions.y)
  }

  if (e.key == 'a') {
    rotate(-rotSpeed)
  }

  if (e.key == 'd') {
    rotate(rotSpeed)
  }

  if (e.key == 'w') {
    translate(rotSpeed)
  }

  if (e.key == 's') {
    translate(-rotSpeed)
  }
})
