//the target that gona contain the cells
const boards = document.querySelectorAll(".boards")



const shipDropped = (cell)=>{
  //drop event listener
  cell.addEventListener('drop', (event)=>{
  const shipID = event.dataTransfer.getData("text/plain", event.target.id)//get data
  const draggedShip = document.getElementById(shipID)
  cell.appendChild(draggedShip)

  //check the ship size
  const size = 0
  draggedShip.classList.remove('ships')
  const shipClass= draggedShip.classList[0]
  switch(shipClass){
    case 'ship-1':
      cell.style.backgroundColor = `${draggedShip.style.backgroundColor}`
    break;
    case 'ship-2':

    break;
    case 'ship-3':

    break;
    case 'ship-4':

    break;
  }
  //change the cell background

  //remove ship from the selection
  draggedShip.remove()
  })
}
//creates the cells inside each board (divs with class boards)
function createCells(){
  boards.forEach((board)=>{
    for(let i =1 ; i <= 100; i++){ // for 100 times
      const cell = document.createElement("div") //create a cell
      cell.classList.add("cells") //add class "cells" to it
      cell.id = `${i}` // add id "cell" followed by its number based on the "i"
      board.append(cell) // add "cell" to DOM inside the board


      //dargover event listener
      cell.addEventListener('dragover', (event)=>{
        event.preventDefault()
      })

      shipDropped(cell)
    }
  })
}

createCells()



const ships = document.querySelectorAll('.ships')
const rotateBTN= document.getElementById('rotate')

let isRotated= true

//rotates the ships horizontally and vertically
function rotateShips(){
  if(isRotated){
    ships.forEach(ship => ship.style.transform = "rotate(90deg)")
    isRotated=false
  }else{
    ships.forEach(ship => ship.style.transform = "rotate(0deg)")
    isRotated=true
  }
console.log("rotate triggered")
}

rotateBTN.addEventListener('click', rotateShips)





ships.forEach((ship)=>{
  ship.addEventListener('dragstart', (event)=>{
    event.dataTransfer.setData("text/plain",event.target.id);    console.log(event.target.id)
  })
})

