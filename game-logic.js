//elements vars
const boards = document.querySelectorAll(".boards")
const counterSpan= document.querySelector('#counter')

//normal vars
let hitCounter= 0;
let isWin= false; // winning trigger




//creates the cells inside each board (divs with class boards)
function createCells(){
  boards.forEach((board)=>{
    for(let i =1 ; i <= 100; i++){ // for 100 times
      const cell = document.createElement("div") //create a cell
      cell.classList.add("cells") //add class "cells" to it
      cell.id = `${i}` // add it's number as an id
      board.appendChild(cell) // add "cell" to DOM inside the div with class "board"

      //click event listener
      cell.addEventListener('click',()=>{
        hitCounter++
        counterSpan.innerText= `tries : ${hitCounter}`
      })
    }
  })
}

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
    console.log('poped')
  }
}





//functions execution

createCells()
placeShipsRandomly();

checkWin(isWin)
