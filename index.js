// Grab Canvas from index.html and set properties
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

// Sprite class for base of player and enemy
class Sprite {
  constructor({ position, velocity, color = "red", offset }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      // offset is for the position of the weapon
      offset,
      width: 150,
      height: 25,
    };
    this.color = color;
    this.isAttacking;
  }

  // Physically create the sprite
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // Draw Attack Box
    if (this.isAttacking) {
      c.fillStyle = "green";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  // Changes made per frame
  update() {
    this.draw();
    // Sword
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    //Sprite
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.velocity.y + this.height >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  // Displays the sword when sprite attacks then resheathes
  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

// Player -----------------
const player = new Sprite({
  position: {
    x: 200,
    y: 400,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 35,
  },
  color: "blue",
});

// Enemy -----------------
const enemy = new Sprite({
  position: {
    x: 774,
    y: 400,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -100,
    y: 35,
  },
  color: "orange",
});

// Tracking keys pressed
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

// Detecting if a sprite has been hit with a sword
function swordCollision({ sword1, sword2 }) {
  return (
    sword1.attackBox.position.x + sword1.attackBox.width >= sword2.position.x &&
    sword1.attackBox.position.x <= sword2.position.x + sword2.width &&
    sword1.attackBox.position.y + sword1.attackBox.height >=
      sword2.position.y &&
    sword1.attackBox.position.y <= sword2.position.y + sword2.height &&
    sword1.isAttacking
  );
}
function animation() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  // Movement logic for player
  player.velocity.x = 0;
  enemy.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
  }

  // Movement logic for enemy
  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
  }

  // detect collision from player to enemy
  if (swordCollision({ sword1: player, sword2: enemy }) && player.isAttacking) {
    player.isAttacking = false;
    console.log("hit");
  }
  // detect collision from enemy to player
  if (swordCollision({ sword1: enemy, sword2: player }) && enemy.isAttacking) {
    enemy.isAttacking = false;
    console.log("enemy hit");
  }

  window.requestAnimationFrame(animation);
}

animation();

// Listening for which keys are pressed to affect movement
window.addEventListener("keydown", (event) => {
  // console.log(event) to find key values
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      player.velocity.y = -15;
      break;
    case "s":
      player.attack();
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -15;
      break;
    case "ArrowDown":
      enemy.attack();
      break;
  }
});

// Stop player from moving when keyup
window.addEventListener("keyup", (event) => {
  // player keys
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }

  // enemy keys
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
