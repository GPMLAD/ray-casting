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
const plane = { x: 0, y: 0.66 } // vetor unitário da paralelo a visão ambos tem o range [-1,1]

const moveSpeed = 1 / size
const rotSpeed = Math.PI / 120

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

const drawRays = (player, dir, plane, numberOfRays = 1) => {
  const dxPlane = plane.x / numberOfRays
  const dyPlane = plane.y / numberOfRays

  for (let i = 0; i < numberOfRays; i++) {
    const onPlane = {
      x: player.x + dir.x - plane.x / 2 + dxPlane * i,
      y: player.y + dir.y - plane.y / 2 + dyPlane * i
    }

    let mapX = Math.floor(onPlane.x)
    let mapY = Math.floor(onPlane.y)

    const rayDirX = dir.x
    const rayDirY = dir.y

    let deltaDistX = rayDirX == 0 ? Infinity : Math.abs(1 / rayDirX)
    let deltaDistY = rayDirY == 0 ? Infinity : Math.abs(1 / rayDirY)

    let stepX = 0
    let stepY = 0

    let cell
    let hit = 0

    if (rayDirX < 0) {
      stepX = -1
      sideDistX = (onPlane.x - mapX) * deltaDistX
    } else {
      stepX = 1
      sideDistX = (mapX + 1 - onPlane.x) * deltaDistX
    }

    if (rayDirY < 0) {
      stepY = -1
      sideDistY = (onPlane.y - mapY) * deltaDistY
    } else {
      stepY = 1
      sideDistY = (mapY + 1 - onPlane.y) * deltaDistY
    }

    while (hit === 0) {
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX
        mapX += stepX
        side = 0
      } else {
        mapY += stepY
        sideDistY += deltaDistY
        side = 1
      }

      // Certifique-se de que os índices estejam dentro dos limites antes de acessar o mapa
      if (mapY >= 0 && mapY < map.length && mapX >= 0 && mapX < map[0].length) {
        cell = map[mapX][mapY]

        // Verifica se o valor da célula é maior que zero antes de pintar de vermelho
        if (cell > 0) {
          hit = 1
        }
      } else {
        // Se os índices estiverem fora dos limites, encerra o loop
        hit = 1
      }
    }

    let perpWallDist
    if (side === 0) {
      perpWallDist = (mapX - onPlane.x + (1 - stepX) / 2) / rayDirX
      finalX = onPlane.x + perpWallDist * rayDirX
      finalY = onPlane.y + perpWallDist * rayDirY
    } else {
      perpWallDist = (mapY - onPlane.y + (1 - stepY) / 2) / rayDirY
      finalX = onPlane.x + perpWallDist * rayDirX
      finalY = onPlane.y + perpWallDist * rayDirY
    }

    ctx.fillStyle = 'red'
    ctx.fillRect(mapX * size, mapY * size, size - 2, size - 2)

    ctx.fillStyle = 'yellow'
    ctx.strokeStyle = 'yellow'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(onPlane.x * size, onPlane.y * size)
    ctx.lineTo(finalX * size, finalY * size)
    ctx.fill()
    ctx.stroke()
  }
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
  drawRays(player, dir, plane, 25)
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
