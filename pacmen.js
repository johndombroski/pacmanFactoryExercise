var pos = 0;
var counter = 0;
const pacArray = [
  ['./PacMan1.png', './PacMan2.png'],
  ['./PacMan3.png', './PacMan4.png'],
];

const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);


  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './PacMan1.png';
  newimg.width = 100;

  newimg.style.left = position.x +'px';
  newimg.style.top = position.y +'px';
  
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  ++counter;
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;

    if(counter == 10){
    if(item.velocity.x >= 0){
      if(item.newimg.src.includes('PacMan1')){
        item.newimg.src = './PacMan2.png';
      }
      else{
        item.newimg.src = './PacMan1.png'
      }
    }
    else{
      if(item.newimg.src.includes('PacMan3')){
        item.newimg.src = './PacMan4.png';
      }
      else{
        item.newimg.src = './PacMan3.png'
      }
    }
    }



  });
  setTimeout(update, 20);
  if(counter == 10){counter = 0;}
}

function checkCollisions(item) {
  let xPos = 0;
  if(item.velocity.x >= 0){
    xPos = item.position.x + item.velocity.x + item.newimg.width;
  }
  else{
    xPos = item.position.x + item.velocity.x;
  }

  if(xPos >= window.innerWidth ||
    xPos <= 0){
      item.velocity.x = - item.velocity.x
    };

  let yPos = 0;
  if(item.velocity.y >= 0){
    yPos = item.position.y + item.velocity.y + item.newimg.height;
  }
  else{
    yPos = item.position.y + item.velocity.y;
  }
  
  
  if(yPos >= window.innerHeight ||
    yPos <= 0){
      item.velocity.y = - item.velocity.y
    };
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
