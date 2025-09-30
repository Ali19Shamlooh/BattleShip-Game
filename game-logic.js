const ships = document.querySelectorAll('.ships')
const rotateBTN= document.getElementById('rotate')

let angle = 0
function rotateShips(){
  if(angle === 0){
    ships.forEach(ship => ship.style.transform = "rotate(90deg)")
  }else{
    ships.forEach(ship => ship.style.transform = "rotate(0deg)")
  }
console.log("functioning")
}

rotateBTN.addEventListener('click', rotateShips)
