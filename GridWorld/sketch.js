// let arr = [];
CANVAS_SIZE  = 0
var env;
function setup() {
    var url = new URL(window.location.href);
    var width = url.searchParams.get("width");
    var height = url.searchParams.get('height');
    CANVAS_SIZE =  {WIDTH:STATE_SIZE.WIDTH * width + 1, HEIGHT:STATE_SIZE.HEIGHT * height + 1}
    var canvas = createCanvas(CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
    canvas.parent('sketch-holder');
    env = new GridWorld({WIDTH:width, HEIGHT:height});
    canvas.mouseReleased(updateEnv);
    textSize(12)

}

function draw() {
    background(220);
    env.loop();
}

function updateEnv(event) {
  env.update();
}
