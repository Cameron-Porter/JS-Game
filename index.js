const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
  constructor({ position, gravity }) {
    this.position = position;
    this.gravity = gravity;
  }

  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, 50, 150);
  }

  update() {
    this.draw();
    this.position.y += this.velocity;
  }
}

const player = new Sprite({
  position: { x: 200, y: 400 },
  velocity: { x: 0, y: 0 },
});

const enemy = new Sprite({
  position: { x: 774, y: 400 },
  veloity: { x: 0, y: 0 },
});

function animation() {
  window.requestAnimationFrame(animation);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
}

animation();
