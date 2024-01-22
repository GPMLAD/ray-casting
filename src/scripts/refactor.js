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

class Player {
  constructor(size, pX, pY, dirX, dirY, planeX, planeY) {
    this.mousePositions = { x: 0, y: 0 }
    this.size = size
    this.position = { x: pX, y: pY }
    this.dir = { x: dirX, y: dirY }
    this.plane = { x: planeX, y: planeY }
    this.moveSpeed = 2 / size
    this.rotSpeed = Math.PI / 32
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

  rotate(rotSpeed) {
    const oldDirX = this.dir.x
    const oldDirY = this.dir.y

    this.dir.x = oldDirX * Math.cos(rotSpeed) - oldDirY * Math.sin(rotSpeed)
    this.dir.y = oldDirY * Math.cos(rotSpeed) + oldDirX * Math.sin(rotSpeed)

    const oldPlaneX = this.plane.x
    const oldPlaneY = this.plane.y

    this.plane.x =
      oldPlaneX * Math.cos(rotSpeed) - oldPlaneY * Math.sin(rotSpeed)
    this.plane.y =
      oldPlaneY * Math.cos(rotSpeed) + oldPlaneX * Math.sin(rotSpeed)
  }

  drawView() {
    for (let i = 0; i < canvas.width; i++) {
      let cameraX = (2 * i) / canvas.width - 1
      let rayDirX = this.dir.x + this.plane.x * cameraX
      let rayDirY = this.dir.y + this.plane.y * cameraX

      let mapX = Math.floor(this.position.x)
      let mapY = Math.floor(this.position.y)

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
        sideDistX = (this.position.x - mapX) * deltaDistX
      } else {
        stepX = 1
        sideDistX = (mapX + 1 - this.position.x) * deltaDistX
      }
      if (rayDirY < 0) {
        stepY = -1
        sideDistY = (this.position.y - mapY) * deltaDistY
      } else {
        stepY = 1
        sideDistY = (mapY + 1 - this.position.y) * deltaDistY
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
        cell = map.content[mapY][mapX]
        if (cell > 0) hit = 1
      }

      if (side === 0) {
        perpWallDist = (mapX - this.position.x + (1 - stepX) / 2) / rayDirX
      } else {
        perpWallDist = (mapY - this.position.y + (1 - stepY) / 2) / rayDirY
      }

      let lineHeight = canvas.height / perpWallDist

      let drawStart = Math.max(0, -lineHeight / 2 + canvas.height / 2)
      let drawEnd = Math.min(
        canvas.height - 1,
        lineHeight / 2 + canvas.height / 2
      )

      let color = map.colors[cell]
      if (side === 1) {
        color = 'dark' + color
      }

      ctx.fillStyle = color
      ctx.fillRect(i, drawStart, 1, drawEnd - drawStart + 1)
    }
  }
}

class Map {
  constructor(matrix, size) {
    this.content = matrix
    this.size = size
    this.rays = []
    this.view = []

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

    this.drawDir(player.dir, player.position, this.size)
    this.drawPlane(player.plane, player.dir, player.position, this.size)
    //this.drawRays(this.rays)
    this.drawRays(player, 10)
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

  // aqui funciona

  drawRays(player, numberOfRays = 1) {
    const dxPlane = player.plane.x / numberOfRays
    const dyPlane = player.plane.y / numberOfRays

    for (let i = 0; i < numberOfRays; i++) {
      const onPlane = {
        x: player.position.x + player.dir.x - player.plane.x / 2 + dxPlane * i,
        y: player.position.y + player.dir.y - player.plane.y / 2 + dyPlane * i
      }

      let mapX = Math.floor(onPlane.x)
      let mapY = Math.floor(onPlane.y)

      const rayDirX = player.dir.x
      const rayDirY = player.dir.y

      let deltaDistX = rayDirX == 0 ? Infinity : Math.abs(1 / rayDirX)
      let deltaDistY = rayDirY == 0 ? Infinity : Math.abs(1 / rayDirY)

      let stepX = 0
      let stepY = 0

      let cell
      let hit = 0
      let sideDistX, sideDistY, side, finalX, finalY
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
        if (
          mapY >= 0 &&
          mapY < this.content.length &&
          mapX >= 0 &&
          mapX < this.content[0].length
        ) {
          cell = this.content[mapX][mapY]

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
      ctx.fillRect(
        mapX * this.size,
        mapY * this.size,
        this.size - 2,
        this.size - 2
      )

      ctx.fillStyle = 'yellow'
      ctx.strokeStyle = 'yellow'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(onPlane.x * this.size, onPlane.y * this.size)
      ctx.lineTo(finalX * this.size, finalY * this.size)
      ctx.fill()
      ctx.stroke()
    }
  }

  

  drawRaysTeste(rayArr) {
    rayArr.forEach(ray => {
      //mapX, mapY, finalX, finalY, onPlane
      ctx.fillStyle = 'red'
      ctx.fillRect(
        ray.mapX * this.size,
        ray.mapY * this.size,
        this.size - 2,
        this.size - 2
      )

      ctx.fillStyle = 'black'
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(ray.onPlane.x * this.size, ray.onPlane.y * this.size)
      ctx.lineTo(ray.finalX * this.size, ray.finalY * this.size)
      ctx.fill()
      ctx.stroke()
    })
  }

  drawViewTeste(viewArr) {
    viewArr.forEach(element => {
      let lineHeight = canvas.height / element.perpWallDist

      let drawStart = Math.max(0, -lineHeight / 2 + canvas.height / 2)
      let drawEnd = Math.min(
        canvas.height - 1,
        lineHeight / 2 + canvas.height / 2
      )
      let color = this.colors[this.content[element.mapX][element.mapY]]
      if (element.side === 1) {
        color = 'dark' + color
      }
      console.log(
        canvas.height,
        element.perpWallDist,
        lineHeight,
        drawStart,
        drawEnd,
        color
      )
      ctx.fillStyle = color
      ctx.fillRect(element.i, drawStart, 1, drawEnd - drawStart + 1)
    })
  }

  // até aqui

  //drawView
  //drawMap
  //drawPlayer
  //drawDir
  //drawPlane
  //drawRays
  /*
  drawSeiLa(player, numberOfRays = 1) {
    this.rays = []
    const { dxPlane, dyPlane } = this.calculatePlaneIncrements(
      player.plane,
      numberOfRays
    )

    for (let i = 0; i < numberOfRays; i++) {
      const onPlane = this.calculateOnPlane(
        player.position,
        player.dir,
        player.plane,
        dxPlane,
        dyPlane,
        i
      )

      let {
        mapX,
        mapY,
        deltaDistX,
        deltaDistY,
        stepX,
        stepY,
        sideDistX,
        sideDistY
      } = this.initializeRayVariables(onPlane, player.dir)

      let result = this.performDDARayCasting(
        mapX,
        mapY,
        sideDistX,
        sideDistY,
        stepX,
        stepY,
        deltaDistX,
        deltaDistY
      )
      let side = result.side
      mapX = result[1]
      mapY = result[2]

      const { perpWallDist, finalX, finalY } = this.calculateFinalValues(
        side,
        mapX,
        mapY,
        player.dir,
        onPlane,
        stepX,
        stepY
      )
      const rayDic = { mapX, mapY, finalX, finalY, onPlane }
      this.rays.push(rayDic)

      const viewDic = { perpWallDist, side, mapX, mapY, i }
      this.view.push(viewDic)

      //console.log(rayDic)
      //this.drawView(perpWallDist, side, mapX, mapY, i)
      //this.drawPerpRays(mapX, mapY, finalX, finalY, onPlane)
    }
  }

  calculatePlaneIncrements(plane, numberOfRays) {
    const dxPlane = plane.x / numberOfRays
    const dyPlane = plane.y / numberOfRays
    return { dxPlane, dyPlane }
  }

  calculateOnPlane(positions, dir, plane, dxPlane, dyPlane, i) {
    return {
      x: positions.x + dir.x - plane.x / 2 + dxPlane * i,
      y: positions.y + dir.y - plane.y / 2 + dyPlane * i
    }
  }

  initializeRayVariables(onPlane, dir) {
    let mapX = Math.floor(onPlane.x)
    let mapY = Math.floor(onPlane.y)

    let deltaDistX = dir.x == 0 ? Infinity : Math.abs(1 / dir.x)
    let deltaDistY = dir.y == 0 ? Infinity : Math.abs(1 / dir.y)

    let stepX = 0
    let stepY = 0

    let sideDistX
    let sideDistY

    if (dir.x < 0) {
      stepX = -1
      sideDistX = (onPlane.x - mapX) * deltaDistX
    } else {
      stepX = 1
      sideDistX = (mapX + 1 - onPlane.x) * deltaDistX
    }

    if (dir.y < 0) {
      stepY = -1
      sideDistY = (onPlane.y - mapY) * deltaDistY
    } else {
      stepY = 1
      sideDistY = (mapY + 1 - onPlane.y) * deltaDistY
    }

    return {
      mapX,
      mapY,
      deltaDistX,
      deltaDistY,
      stepX,
      stepY,
      sideDistX,
      sideDistY
    }
  }

  performDDARayCasting(
    mapX,
    mapY,
    sideDistX,
    sideDistY,
    stepX,
    stepY,
    deltaDistX,
    deltaDistY
  ) {
    let hit = 0
    let side
    while (hit === 0) {
      if (sideDistX <= sideDistY) {
        sideDistX += deltaDistX
        mapX += stepX
        side = 0
      } else {
        mapY += stepY
        sideDistY += deltaDistY
        side = 1
      }

      if (
        mapY >= 0 &&
        mapY < this.content.length &&
        mapX >= 0 &&
        mapX < this.content[0].length
      ) {
        let cell = this.content[mapX][mapY]

        if (cell > 0) {
          hit = 1
          return [side, mapX, mapY]
        }
      } else {
        hit = 1
        return { side, mapX, mapY }
      }
    }
  }

  calculateFinalValues(side, mapX, mapY, dir, onPlane, stepX, stepY) {
    let perpWallDist
    let finalX
    let finalY
    if (side === 0) {
      perpWallDist = (mapX - onPlane.x + (1 - stepX) / 2) / dir.x
      finalX = onPlane.x + perpWallDist * dir.x
      finalY = onPlane.y + perpWallDist * dir.y
    } else {
      perpWallDist = (mapY - onPlane.y + (1 - stepY) / 2) / dir.y
      finalX = onPlane.x + perpWallDist * dir.x
      finalY = onPlane.y + perpWallDist * dir.y
    }

    return { perpWallDist, finalX, finalY }
  }

  drawPerpRays(mapX, mapY, finalX, finalY, onPlane) {
    ctx.fillStyle = 'red'
    ctx.fillRect(
      mapX * this.size,
      mapY * this.size,
      this.size - 2,
      this.size - 2
    )

    ctx.fillStyle = 'yellow'
    ctx.strokeStyle = 'yellow'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(onPlane.x * this.size, onPlane.y * this.size)
    ctx.lineTo(finalX * this.size, finalY * this.size)
    ctx.fill()
    ctx.stroke()
  }
  */
}

const player = new Player(size, 2.2, 2.2, 1, 0, 0, 0.66)
const map = new Map(initialMap, player.size)

const animate = () => {
  map.clearScreen()
  //map.calculateValues()
  //map.drawView()
  //map.drawSeiLa(player)

  player.drawView()
  map.drawMap()
  map.drawPlayer(player)
  requestAnimationFrame(animate)
}

animate()

document.addEventListener('keydown', player.handleKeyDown)
document.addEventListener('mousemove', player.handleMouseMove)
