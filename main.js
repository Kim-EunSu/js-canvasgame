//캔버스 세팅
let canvas; //흰 도화지
let ctx; //그림을 그려주는 역할
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, bulletImage, enemyIamge, rocketImage, gameoverImage;

let gameOver = false; //true이면 게임오버, flase이면 게임끝나지 않음

//우주선 좌표
let rocketX = canvas.width / 2 - 48;
let rocketY = canvas.height - 100;

//총알
let bulletList = [];
function Bullet() {
  this.x = 0;
  this.y = 0;

  this.init = function () {
    this.x = rocketX + 19; //총알이 정가운데 나오게하기 위해서
    this.y = rocketY;

    bulletList.push(this);
  };

  this.update = function () {
    this.y -= 7;
  };
}

//적군
function newRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNum;
}

let enemyList = [];
function Enemy() {
  this.x = 0;
  this.y = 0;

  this.init = function () {
    this.x = newRandomValue(0, canvas.width - 96); //랜덤으로 나와야하기 때문에 새로운 함수생성
    this.y = 0; //최상단에서 출발

    enemyList.push(this);
  };

  this.update = function () {
    this.y += 3; //적군의 속도조절

    if (this.y >= canvas.height - 48) {
      gameOver = true;
      console.log("gameover");
    }
  };
}

//이미지를 불러오는 함수
function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.jpeg";

  rocketImage = new Image();
  rocketImage.src = "images/rocket.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  enemyIamge = new Image();
  enemyIamge.src = "images/enemy.png";

  gameoverImage = new Image();
  gameoverImage.src = "images/gameover.png";
}

let keysdown = {};
function setupKeyboardListener() {
  document.addEventListener("keydown", function (e) {
    keysdown[e.keyCode] = true;
    console.log(keysdown);
  });
  document.addEventListener("keyup", function (e) {
    delete keysdown[e.keyCode];
    console.log(keysdown);

    //스페이스는 keyCode가 32
    if (e.keyCode === 32) {
      createBullet(); //총알 생성
    }
  });
}

function createBullet() {
  console.log("총알 나감");
  let b = new Bullet(); //총알 하나 생성
  b.init();
  console.log("총알나감");
}

function createEnemy() {
  //1초마다 생성
  // const interval = setInterval(호출하고싶은 함수, 시간);
  const interval = setInterval(function () {
    let e = new Enemy(); //적군 생성
    e.init();
  }, 1000);
}

function upDate() {
  if (39 in keysdown) {
    rocketX += 5;
  }
  if (37 in keysdown) {
    rocketX -= 5;
  }

  if (rocketX <= 0) {
    rocketX = 0;
  }

  if (rocketX >= canvas.width - 96) {
    rocketX = canvas.width - 96;
  }

  //총알의 y좌표 업데이트함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    bulletList[i].update();
  }

  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
}

//이미지를 보여주는 함수
function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(rocketImage, rocketX, rocketY);

  for (let i = 0; i < bulletList.length; i++) {
    ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
  }

  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyIamge, enemyList[i].x, enemyList[i].y);
  }
}

function main() {
  if (!gameOver) {
    upDate();
    render();
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameoverImage, 0, 100, 400, 300);
  }
}

loadImage();
setupKeyboardListener();
createEnemy(); //웹페이지 시작하자마자 적군들도 내려옴
main();
