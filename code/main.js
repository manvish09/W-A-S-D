
import kaboom from "kaboom"

// initialize context
kaboom({
  font: "sink",
  background: [32, 32, 32]
})
loadSprite("wall", "sprites/wall.png");

//loading the sprites
loadSprite("cube", "sprites/cube.png");
loadSprite("Manvish", "sprites/Manvish.png");
loadSprite("virus", "sprites/virus.png");
loadSprite("coffee", "sprites/coffee.png");

//loading the music
loadSound("background", "sounds/background.mp3");
loadSound("sipping coffee", "sounds/sipping coffee.mp3");
loadSound("levelComplete", "sounds/levelComplete.wav");
loadSound("game over", "sounds/game over.wav");

//game variables
let speed = 620
let vSpeed = 2
let scoreText;
let score = 0;
let bg = false;
let bgMusic;

// function to play the background music of the game
const playBg = () => {
  if (!bg) {
    play("background")
    bg = true
  }

}

//function to display score
const displayScore = () => {
  destroy(scoreText)
  scoreText = add([
    text("Score: " + score),
    scale(4),
    pos(width() - 250, 151),

  ])

}

// const map = [
//   '                                       ',
//   '                                       ',
//   '                     *                  ',
//   '                     *                 ',
//   '         *           *                 ',
//   '         *                              ',
//   '=======================================================================',


// ]
// const levelConfig = {
//   width: 20,
//   height: 20,
//   pos: vec2(0, 0),
//   // define each object as a list of components
//   "=": () => [
//     scale(0.2),
//     sprite("cube"),
//     area(),
//     solid(),
//     origin("bot"),
//     "cube"
//   ],

// }
// addLevel(map, levelConfig)


//adding programmer
const player = add([
  sprite("Manvish"),
  scale(0.25),
  pos(120, 180),
  area(),
  outview({ hide: true, pause: true }),
  destroy(player),
  // play("game over"),
  displayScore()
])

const wall = add([
  sprite("wall"),
  area(),
  pos(height(),width()),
])

onKeyDown("left", () => {
  playBg()
  player.move(-speed, 0)
})

onKeyDown("right", () => {
  playBg()

  player.move(speed, 0)
})

onKeyDown("up", () => {
  playBg()

  player.move(0, -speed)
})

onKeyDown("down", () => {
  playBg()

  player.move(0, speed)
})

//add virus on loop
setInterval(() => {
  for (let i = 0; i < 4; i++) {
    let x = rand(0, width())
    let y = height(0, height())
    let c = add([
      sprite("virus"),
      scale(0.1),
      pos(x, y),
      area(),
      "virus",

    ])

    c.onUpdate(() => {
      c.moveTo(c.pos.x, c.pos.y - vSpeed)

    })
  }
  let x = rand(0, width())
  let y = height(0, height())
  let c = add([
    sprite("coffee"),
    scale(0.15),
    pos(x, y),
    area(),
    "coffee"
  ])

  c.onUpdate(() => {
    c.moveTo(c.pos.x, c.pos.y - vSpeed)
  })
  if (vSpeed <= 10) {
    vSpeed += 1
  }
}, 4000)
player.onCollide("virus", () => {
  // play()
  play("game over")
  destroy(player)
  // destroy(virus)
  addKaboom(player.pos)
  scoreText = add([
    text(" Game Over "),
    scale(4),
    pos(width() - 250, 151),

  ])

})
player.onCollide("coffee", () => {
  // bgMusic.volume(0.7)
  play("sipping coffee")
  score += 1
  displayScore()
  // bgMusic.volume(1)
})

player.onCollide("cube", () => {
  // bgMusic.volume(0.7)
  destroy(player)
  play("game over")
  // bgMusic.volume(1)

})

// onCollide("cube", "virus", () => {
//   destroy(virus)
// })