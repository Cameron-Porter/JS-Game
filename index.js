const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;
class Sprite {
  constructor({ position, gravity, height }) {
    this.position = position;
    this.gravity = gravity;
    this.height = height;
  }

  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity;
    if (this.position.y + this.velocity + this.height >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }
}

const player = new Sprite({
  position: {
    x: 200,
    y: 400,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  height: 150,
});

const enemy = new Sprite({
  position: {
    x: 774,
    y: 400,
  },
  veloity: {
    x: 0,
    y: 0,
  },
  height: 150,
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function animation() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  // Movement logic for player
  if (keys.a.pressed) {
    player.velocity.x = -1;
  } else if (keys.d.pressed) {
    player.velocity.x = 1;
  }
  window.requestAnimationFrame(animation);
}

animation();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
  }
});

// Stop player from moving when keyup
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }
});
