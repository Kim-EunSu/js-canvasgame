//캔버스 세팅
let canvas; //흰 도화지
let ctx; //그림을 그려주는 역할
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, bulletImage, enemyIamge, rocketImage, gameoverImage;

//우주선 좌표
let rocketX = canvas.width / 2 - 48;
let rocketY = canvas.height - 100;

//이미지를 불러오는 함수
function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.jpeg";

  rocketImage = new Image();
  rocketImage.src = "images/rocket.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  enemyIamge = new Image();
  enemyIamge.src = "image/enemy.png";

  gameoverImage = new Image();
  gameoverImage.src = "images/gameover.png";
}

let keysDown = {};
function setupKeyboardListener() {
  document.addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
    console.log(keysDown);
  });
  document.addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
    console.log(keysDown);
  });
}

function update() {
  if (39 in keysDown) {
    rocketX += 5;
  }
  if (37 in keysDown) {
    rocketX -= 5;
  }

  if (rocketX <= 0) {
    rocketX = 0;
  }
  if (rocketX >= canvas.width - 96) {
    rocketX = canvas.width - 96;
  }

  // if (38 in keysDown) {
  //   rocketY -= 5;
  // }
  // if (40 in keysDown) {
  //   rocketY += 5;
  // }

  //우주선의 좌표값 canvase안에서만 설정
}

//이미지를 보여주는 함수
function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(rocketImage, rocketX, rocketY);
}

function main() {
  update(); //좌표값을 업데이트하고
  render(); //그려주고!!!!
  requestAnimationFrame(main); // 계속 보여줌
}

loadImage();
setupKeyboardListener();
main();
