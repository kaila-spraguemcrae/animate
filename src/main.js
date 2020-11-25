/* eslint-disable */
//import Triangle from './triangle.js'; //export default function Triangle() {}
// import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import anime from 'animejs/lib/anime.es.js';

const canvas = document.getElementById('canvas1'); //gets HTML element 'canvas1' sets it to JavaScript element 'canvas'
const ctx = canvas.getContext('2d');//ctx short for context. creates built in context object which contains all 2D drawing methods using canvas API
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//canvas width and height makes sure canvas covers entire browser window
let particleArray = []; //will hold all particle objects


//HANDLE MOUSE
const mouse = {
  x: null, //position of mouse on horizontal x-axis
  y: null, //position of mouse on vertical y-axis
  radius: 100 // size of circular are surrounding mouse
}

window.addEventListener('mousemove'/* type of event we listen for, we are listening for 'mousemove' event */, function(event){
  //everytime mouse moves in window we will run following:
  //assigning to custom mouse variable
  mouse.x = event.x;
  mouse.y = event.y;
  // this makes mouse coordinates available check by:`console.log(mouse.x, mouse.y);`
});

//DRAW TEXT ON CANVAS
ctx.fillStyle = 'white'; // text will be back unless you set
ctx.font = '30px Verdana'; //size, font-fmaily
ctx.fillText('A', 0, 30); //text we want to write, x coordinate, y coordinate, max width of pixels

//ctx.strokeStyle = 'white'; // White line for box
//ctx.strokeRect(0, 0, 100, 100); //same coordinates as getImageData to see what we are scanning

const data = ctx.getImageData(0, 0, 100, 100); //canvas method to scan portion of canvas to get image data (coordinates to start at top left corner= '0, 0' 'width, height' in pixels)

class Particle {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.size = 3; 
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random()* 40) + 5;
  }
  draw(){
    ctx.fillStyle = 'teal';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x; //difference x
    let dy = mouse.y - this.y; //difference y
    let distance = Math.sqrt(dx * dx + dy * dy); //pythagorean theorem finding distance betwwen 2 points
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
  
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx/10;
      }
      if (this.y !== this.basey){
        let dy = this.y - this.baseY;
        this.y -= dy/10;
      } 
    }
  }
}
console.log(data);
function init(){
  particleArray = [];
  // for (let y =0 , y2 = data.height; y < y2; y++){
  //   for (let x = 0, x2 = data.width; x < x2; x++){
  //     if (data.data[(y * 4 * data.width) * (x * 4) + 3] > 128){
  //       let positionX = x;
  //       let positionY = y;
  //       particleArray.push(new Particle(positionX * 20, positionY * 20));
  //     }
  //   }
  // }

  for (let i = 0; i < 10000; i++){
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particleArray.push(new Particle(x, y));
  }
  particleArray.push(new Particle(50,50));
  particleArray.push(new Particle(80, 50));
}

init();
// console.log(particleArray);

function animate(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
  for (let i=0; i < particleArray.length; i++){
    particleArray[i].draw();
    particleArray[i].update();
  }
  requestAnimationFrame(animate);
}
animate();