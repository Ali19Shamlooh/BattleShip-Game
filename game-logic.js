//elements vars
const boards = document.querySelectorAll(".boards")
const counterSpan = document.querySelector("#counter")
const highScoreSpan = document
  .querySelector(".high-score")
  .querySelector("span")
let resetBtn

//normal vars
let hitCounter = 0
let isWin = false // winning trigger
let shipCells = [] // to save the cells that have been a ships
let highScore = 100

//////////////////////////////////////////////////////////////

//creates the cells inside each board (divs with class boards)
function createCells() {
  boards.forEach((board) => {
    for (let i = 0; i <= 99; i++) {
      // for 100 times
      const cell = document.createElement("div") //create a cell
      const cellSpan = document.createElement("span")
      cell.classList.add("cells") //add class "cells" to it
      cell.id = `${i}` // add it's number as an id
      cell.appendChild(cellSpan)
      board.appendChild(cell) // add "cell" to DOM inside the div with class "board"
      //click event listener
      cell.addEventListener("click", onClick)
    }
  })
}
///////////////////////////////////////////////////////////////

function onClick(cell) {
  hitCounter++
  counterSpan.innerText = `tries : ${hitCounter}`

  //ship hit
  if (cell.target.classList.contains("ship")) {
    cell.target.querySelector("span").innerText = '💥' //write X
    shipCells.forEach((shipCell, index) => {
      //its not ship any more (removing it from shipCells)
      if (shipCell == cell.target.id) {
        shipCells.splice(index, 1)
      }
    })
  } else {
    //non ship hit
    cell.target.innerText = "🌊"
  }
  cell.target.removeEventListener("click", onClick) //cant be clicked again

  //win condition
  if (shipCells.length == 0) {
    ShowWin()
    resetBtn = document.querySelector(".reset-btn")
  }
}

///////////////////////////////////////////////////////////////

//check if cell is a ship or not
//return true if no mach found , false otherwise
const isNotOccupied = (cell) => {
  return shipCells.every((cellID) => cellID != cell)
}

////////////////////////////////////
let ships = []

class Ship {
  constructor(len) {
    this.len = len
  }
}
//ship instances
const battleship = new Ship(4)
ships.push(battleship)
const cruiser = new Ship(3)
ships.push(cruiser)
const destroyer = new Ship(2)
ships.push(destroyer)
const boat = new Ship(1)
ships.push(boat)

////////////////////////////////////////////////////////////////////

function placeShipsRandomly() {
  for (const ship of ships) {
    let isDeployed = false //to check if the ship placed or not
    while (!isDeployed) {
      const isHorizontal = Math.random() < 0.5
      const start = Math.floor(Math.random() * 100) //the cell location that will start converting to ship

      const coords = [] // inbound cells (not placed yet)

      for (let i = 0; i < ship.len; i++) {
        let next = isHorizontal ? start + i : start + i * 10

        // Check out of bounds
        const StartRow = Math.floor(start / 10) * 10 //example: floor(8/10)> 0 * 10 > startRow = 0
        if (isHorizontal && next >= StartRow + 10) {
          // invalid placement
          coords.length = 0
          break
        }
        if (next > 100) {
          // out of grid
          coords.length = 0
          break
        }
        coords.push(next)
      }
      // If all coordinates valid and not overlapping
      if (coords.length == ship.len && coords.every((c) => isNotOccupied(c))) {
        coords.forEach((cellID) =>
          document.getElementById(cellID).classList.add("ship")
        )
        shipCells.push(...coords)
        isDeployed = true
      }
    }
  }
}
////////////////////////////////////

function removeCells() {
  const cells = document.querySelectorAll(".cells")
  cells.forEach((cell) => {
    cell.remove()
  })
}
//////////////////////////////////
function removeWinDiv() {
  const winDiv = document.querySelector(".win-div")
  winDiv.remove()
}
//////////////////////////////////

//reset function
function reset() {
  createCells()
  placeShipsRandomly()
  hitCounter = 0
}

//////////////////////////////////
const ShowWin = () => {
  //creating what I need to show
  const winDiv = document.createElement("div")
  const textSpan = document.createElement("span")
  const resetBtn = document.createElement("button")
  //adding text to show
  textSpan.innerText = "You Win!"
  resetBtn.innerText = "Restart"
  //adding the style class
  winDiv.classList.add("win-div")
  resetBtn.classList.add("reset-btn")
  //assigning them to the body
  document.body.appendChild(winDiv)
  document.querySelector(".win-div").appendChild(textSpan)
  document.querySelector(".win-div").appendChild(resetBtn)
  //eventlistener for the rest button
  resetBtn.addEventListener("click", () => {
    if (hitCounter < highScore) {
      highScore = hitCounter
      highScoreSpan.innerText = `Least tries: ${highScore}`
    }

    removeCells()
    removeWinDiv()
    reset()
  })
}
////////////////////////////////////////////////////////////////////

//start function
reset()
