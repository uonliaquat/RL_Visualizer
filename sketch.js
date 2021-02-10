// let arr = [];
CAVAS_SIZE = {WIDTH:1000, HEIGHT:700}
var env;
function setup() {
  createCanvas(CAVAS_SIZE.WIDTH, CAVAS_SIZE.HEIGHT);
  env = new GridWorld({width:18, height:12});

}

function draw() {
  background(220);
  env.loop();
}


//   textAlign(CENTER, CENTER);
//
//
//   for (let y = 0; y < 10; y++) {
//     for (let x = 0; x < 7; x++) {
//       let xpos = x *100;
//       let ypos = y *100;
//
//       let index = y * 7 + x; // find the index
//
//       if( inside(xpos, ypos, 100,100) ){
//         // were inside
//         fill(255,0,0);
//       } else {
//         // not inside
//       	fill(255);
//       }
//
//       stroke(0);
//       rect(xpos, ypos, 100, 100);
//
//       // colorMode(HSB);
//       let h = map(index, 0, 69, 0, 255);
//       fill(h);
//       noStroke();
//       text(arr[index], xpos, ypos, 100,100);
//
//       // colorMode(RGB);
//     }
//   }
//
//   // make the gradient
//   for(let i =0; i < height; i++){
//     colorMode(HSB);
//     let h = map(i, 0, height, 100, 180);
//     stroke(h, 80,80);
//     line(700, i, 1000, i);
//   }
//
//   colorMode(RGB);
//
// }
//
//
// function inside(x, y, w, h){
//  if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
//   return true;
//  } else {
//   return false;
//  }
// }
//
//
// function mousePressed(event) {
//   console.log(event);
// }
