document.addEventListener('DOMContentLoaded', () => { 
const rocket = document.querySelector('.rocket')
const grid = document.querySelector('.grid')
const alert = document.getElementById('alert')
const numOfStars = 100;


let isJumping = false 
let gravity = 0.9
let isGameOver = false


// Populate the star field
for (let i = 0; i < numOfStars; i++) {
  let star = document.createElement("div");
    star.className = "star";
    var xy = getRandomPosition();
     star.style.top = xy[0] +'px';
     star.style.left = xy[1] + 'px';
    document.body.append(star);
}


function getRandomPosition() {
  var y = window.innerWidth;
  var x = window.innerHeight;
    var randomX = Math.floor(Math.random()*x);
    var randomY = Math.floor(Math.random()*y);
    return [randomX,randomY];
}



function control(e){
 	if (e.keyCode === 32){
 		 if (!isJumping){
 		 	isJumping = true
 		 	jump()
 		 }
 		//console.log('pressed')
 		//code

 		 }
	}
document.addEventListener('keyup', control)

let position = 60
function jump() {
	let count   = 0
	let timerId = setInterval(function () {
		
		//move down 
		if (count === 15) {
			clearInterval(timerId)
			//console.log('down')
			let downTimerId = setInterval(function () {
				 if (count === 0) {
				 	 clearInterval(downTimerId)
				 	 isJumping = false
				 }
				position -= 5
				count --
				position = position * gravity
				rocket.style.bottom = position + 'px'
			},20)
			
		}

		//move up
		//console.log('up')
		position +=60
		count++
		position = position * gravity
		rocket.style.bottom = position + 'px'
		//console.log(rocket.style.bottom )
	},20)
} 

function generateObstacles() {
	let randomTime = Math.random() * 4000 
	let obstaclePosition = 1000
	const obstacle =  document.createElement('div')
	if (!isGameOver)obstacle.classList.add('obstacle')
	grid.appendChild(obstacle)
	obstacle.style.left = obstaclePosition + 'px'

	let timerId = setInterval(function() {
		if (obstaclePosition > 60 && obstaclePosition < 120 && position < 120) {
			alert.innerHTML = 'Game Over <p><input type="submit" value="Play again" class="btn btn-primary btn-large btn-block" id="submit" onclick="location.reload();">'
			isGameOver = true
			//remove child divs \
			//while (grid.firstChild){
			//	grid.removeChild(grid.lastChild)
			//}
		}
		obstaclePosition -=10
		obstacle.style.left = obstaclePosition + 'px'
	}, 20)
	if (!isGameOver) setTimeout(generateObstacles, randomTime)

}
	generateObstacles()

})




