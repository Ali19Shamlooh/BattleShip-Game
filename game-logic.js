//elements vars
const boards = document.querySelectorAll(".boards")
const counterSpan= document.querySelector('#counter')

//normal vars
let hitCounter= 0;
let isWin= false; // winning trigger
let shipCells= [] // to save the cells that have been a ships


/////////////////////////////////////////////////

//creates the cells inside each board (divs with class boards)
function createCells(){
  boards.forEach((board)=>{
    for(let i =0 ; i <= 99; i++){ // for 100 times
      const cell = document.createElement("div") //create a cell
      cell.classList.add("cells") //add class "cells" to it
      cell.id = `${i}` // add it's number as an id
      board.appendChild(cell) // add "cell" to DOM inside the div with class "board"

      //click event listener
      cell.addEventListener('click',(cell)=>{
        hitCounter++
        counterSpan.innerText= `tries : ${hitCounter}`

        //
        cell.classList.forEach((className)=>{
          if(className == "ship"){//chick if the cell is ship or not
            cell.innerText='X'
          }
        })


        checkWin(isWin)
      })
    }
  })
}
/////////////////////////////

const checkWin= (isWin)=>{
  if(isWin){
    //creating what I need to show
    const winDiv= document.createElement("div")
    const textSpan= document.createElement("span")
    //adding text to show
    textSpan.innerText= 'You Won!'
    //adding the style class
    winDiv.classList.add('win-div')
    //assigning them to the body
    document.body.appendChild(winDiv)
    document.querySelector('.win-div').appendChild(textSpan)
  }
}


////////////////////////////////////

//check if cell is a ship or not
//return true if no mach found , false otherwise
const isNotOccupied = (cell)=>{
  return shipCells.every((cellID=>{
    cellID!=cell
  }))
}

////////////////////////////////////
let ships=[]
class ship{
  constructor(len){
    this.len= len
  }
}
const battleship = ship(4); ships.push(battleship)
const cruiser = ship(3); ships.push(cruiser)
const destroyer = ship(2); ships.push(destroyer)
const boat = ship(1); ships.push(boat)

// const ships = [
//   { name: "battleship", size: 4 },
//   { name: "cruiser", size: 3 },
//   { name: "destroyer", size: 2 },
//   {name:'1', size:1}
// ];
//////////////////////////////////

////////////////////////////////////



//functions execution

createCells()
placeShipsRandomly()
