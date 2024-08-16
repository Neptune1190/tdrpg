/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: TDRPG
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const wall = "w"
const usword = "s"
const dsword = "d"
const lsword = "l"
const rsword = "r"
const enemy = "e"
let swinging = false
let enemyhealth = 5
setLegend(
  [ player, bitmap`
6666666666666666
6662666666666266
6662666666666266
6662666666666266
6662666666666266
6662666666666266
6662666666666266
6666666666666666
6666666666666666
6666666666666666
6626666666666626
6662222222222266
6666666666666666
6666666666666666
6666666666666666
6666666666666666` ] ,
  [ usword, bitmap`
........1.......
.......111......
.......111......
.......111......
.......111......
.......111......
.......111......
.......111......
.......111......
.......111......
.....0000000....
........0.......
........0.......
........0.......
........0.......
........0.......` ] ,
  [ dsword, bitmap`
.......0........
.......0........
.......0........
.......0........
.......0........
....0000000.....
......111.......
......111.......
......111.......
......111.......
......111.......
......111.......
......111.......
......111.......
......111.......
.......1........` ] ,
  [ lsword, bitmap`
................
................
................
................
..........0.....
..........0.....
.1111111110.....
1111111111000000
.1111111110.....
..........0.....
..........0.....
................
................
................
................
................` ] ,
  [ rsword, bitmap`
................
................
................
................
................
.....0..........
.....0..........
.....0111111111.
0000001111111111
.....0111111111.
.....0..........
.....0..........
................
................
................
................` ] ,
  [ enemy, bitmap`
3333333333333333
3333333333333333
3332333333332333
3332333333332333
3332333333332333
3332333333332333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333222222223333
3332333333332333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ] ,
  [ wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ])

setSolids([ player, wall, usword, dsword, lsword, rsword, enemy])

let level = 0
const levels = [
  map`
wwwwwwwww
wwwwwwwww
w...e...w
w.......w
w.......w
w.......w
w.......w
w.......w
w...p...w
wwwwwwwww`
]

setMap(levels[level])
function updatetext() {
  clearText()
  if (getFirst(enemy)) {
  addText(`enemy health: ${enemyhealth}`, { x: 3, y: 0, color: color`3` });
  }
}
setPushables({
  [ player ]: []
})

onInput("w", () => {
  if (!swinging) {
    getFirst(player).y -= 1
  }
})
onInput("a", () => {
  if (!swinging) {
    getFirst(player).x -= 1
  }
})
onInput("d", () => {
  if (!swinging) {
    getFirst(player).x += 1
  }
})
onInput("s", () => {
  if (!swinging) {
    getFirst(player).y += 1
  }})
onInput("i", () => {
  if (!swinging) {
    swinging = true
    addSprite(getFirst(player).x, getFirst(player).y - 1, usword)
    setTimeout(() => getFirst(usword).remove(), 200);
    setTimeout(() => swinging = false, 300);
}})
onInput("j", () => {
  if (!swinging) {
    swinging = true
    addSprite(getFirst(player).x - 1, getFirst(player).y, lsword)
    setTimeout(() => getFirst(lsword).remove(), 200);
    setTimeout(() => swinging = false, 300);
}})
onInput("k", () => {
  if (!swinging) {
    swinging = true
    addSprite(getFirst(player).x, getFirst(player).y + 1, dsword)
   setTimeout(() => getFirst(dsword).remove(), 200);
    setTimeout(() => swinging = false, 300);
}})
onInput("l", () => {
  if (!swinging) {
    swinging = true
    addSprite(getFirst(player).x + 1, getFirst(player).y, rsword)
    setTimeout(() => getFirst(rsword).remove(), 200);
    setTimeout(() => swinging = false, 300);
}})

afterInput(() => {
  if (getFirst(enemy)) {
    if (enemyhealth == 0) {
    getFirst(enemy).remove()
  }
}
  if (tilesWith(enemy, usword).length == 1 || tilesWith(enemy, dsword).length == 1 || tilesWith(enemy, rsword).length == 1 || tilesWith(enemy, lsword).length == 1) {
     enemyhealth -= 1
  }
  updatetext()
})