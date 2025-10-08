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
      const cellSymbol= document.createElement('span')
      cell.classList.add("cells") //add class "cells" to it
      cell.id = `${i}` // add it's number as an id
      cell.appendChild(cellSymbol)
      board.appendChild(cell) // add "cell" to DOM inside the div with class "board"
      //click event listener
      cell.addEventListener('click',onClick)

    }
  })
}
/////////////////////////////


function onClick(cell){
  hitCounter++
  counterSpan.innerText= `tries : ${hitCounter}`

  //ship hit
  if(cell.target.classList.contains('ship')){
  cell.target.querySelector('span').innerText='X' //write X
    shipCells.forEach((shipCell,index)=>{//its not ship any more (removing it from shipCells)
      if(shipCell == cell.target.id){
        shipCells.splice(index,1)
        console.log(shipCells)
      }
    })
  }else{//non ship hit
    cell.target.innerText = "."
  }
  cell.target.removeEventListener('click',onClick)//cant be clicked again

  //win condition
  console.log(shipCells)
  if(shipCells.length==0){
    console.log(shipCells)
    ShowWin()
  }
}


/////////////////////////////





////////////////////////////////////

//check if cell is a ship or not
//return true if no mach found , false otherwise
const isNotOccupied = (cell)=>{
  return shipCells.every((cellID)=> cellID!=cell
  )
}

////////////////////////////////////
let ships=[]
class Ship{
  constructor(len){
    this.len= len
  }
}
const battleship = new Ship(4); ships.push(battleship)
const cruiser = new Ship(3); ships.push(cruiser)
const destroyer = new Ship(2); ships.push(destroyer)
const boat = new Ship(1); ships.push(boat)

//////////////////////////////////

function placeShipsRandomly() {
  //const taken = [] // to track occupied cells

  for (const ship of ships) {
    let isDeployed = false;//to check if the ship placed or not
    while (!isDeployed) {

      const isHorizontal = Math.random() < 0.5;
      const start = Math.floor(Math.random() * 100); //the cell location that will start converting to ship

      const coords = []; // inbound cells (not placed yet)

      for (let i = 0; i < ship.len; i++) {
        let next = isHorizontal ? start + i : start + (i * 10);
        //if

        // Check out of bounds
        const StartRow = Math.floor(start / 10) * 10;
        if (isHorizontal && next >= StartRow + 10) {// invalid placement
          coords.length = 0;
          break;
        }
        if (next > 100) {// out of grid
          coords.length = 0;
          break;
        }
        coords.push(next);
      }
      // If all coordinates valid and not overlapping
      if (coords.length == ship.len && coords.every((c)=>isNotOccupied(c))) {
        coords.forEach(cellID => document.getElementById(cellID).classList.add('ship'));
        shipCells.push(...coords)
        isDeployed = true;
      }
    }
  }
}
////////////////////////////////////
const ShowWin= ()=>{
    //creating what I need to show
    const winDiv= document.createElement("div")
    const textSpan= document.createElement("span")
    const resetBtn = document.createElement("button")
    //adding text to show
    textSpan.innerText= 'You Won!'
    resetBtn.innerText= 'reset'
    //adding the style class
    winDiv.classList.add('win-div')
    resetBtn.classList.add('reset-btn')
    //assigning them to the body
    document.body.appendChild(winDiv)
    document.querySelector('.win-div').appendChild(textSpan)
    document.querySelector('.win-div').appendChild(resetBtn)

    //reset function
    
}


//functions execution
createCells()
placeShipsRandomly()
console.log(shipCells.length)
