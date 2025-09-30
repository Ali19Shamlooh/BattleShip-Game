//Variables
const boards = document.querySelectorAll(".boards")


//creates the cells inside each board (divs with class boards)
boards.forEach((board)=>{
  for(let i =1 ; i <= 100; i++){ // for 100 times
    const cell = document.createElement("div") //create a cell
    cell.classList.add("cells") //add class "cells" to it
    cell.id = `cell-${i}` // add id "cell" followed by its number based on the "i"
    board.append(cell) // add "cell" to DOM inside the board
  }
})

let cells = document.querySelectorAll(".cells")

cells.forEach((cell)=>{
  cell.textContent = "."
})

