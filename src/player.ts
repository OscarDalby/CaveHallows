import * as ex from "excalibur";
import { Resources, playerAnim, playerIdle } from "./resources";
import { EnemyStatic } from "./enemies/EnemyStatic";

export class Player extends ex.Actor {
  // constants
  gravity: number = 1;
  accMag: number = 4;
  maxSpeed: number = 5;
  jumpStrength: number = 220;
  friction: number = 0.5;
  maxJumps: number = 1;
  maxHp: number = 3;
  invulnerableTimeMax: number = 150;
  // properties
  grounded: boolean = true;
  numJumps: number = 1;
  hp: number = 3;
  heldItem: string = "torch";
  invulnerableTime: number = 0;

  constructor(pos: ex.Vector) {
    super({
      pos,
      width: 8,
      height: 8,
      z: 99,
      collisionType: ex.CollisionType.Active,
    });
  }

  private resetPosition(engine: ex.Engine): void {
    if (engine.input.keyboard.isHeld(ex.Keys.R)) {
      this.pos = new ex.Vector(9, 0);
      this.vel = new ex.Vector(0, 0);
      this.hp = this.maxHp;
    }
  }

  private updateGravity(delta: number): void {
    this.vel.y += this.gravity * delta;
  }

  private updateFriction(): void {
    if (this.vel.x > 0) {
      this.vel.x -= this.friction;
    } else if (this.vel.x < 0) {
      this.vel.x += this.friction;
    }
  }

  private checkIfGrounded(): void {
    this.on("collisionstart", (ev) => {
      if (ev.side === "Bottom") {
        this.grounded = true;
        this.numJumps = this.maxJumps;
      }
    });

    this.on("collisionend", (ev) => {
      if (ev.side === "Bottom") {
        this.grounded = false;
      }
    });
  }

  private checkMoving(): void {
    if (this.vel.x > 0 || this.vel.x < 0) {
      this.graphics.use(playerAnim);
    } else {
      this.graphics.use(playerIdle);
    }
  }

  private checkDirection(): void {
    if (this.vel.x > 0) {
      this.graphics.flipHorizontal = false;
    } else if (this.vel.x < 0) {
      this.graphics.flipHorizontal = true;
    }
  }

  private jump(): void {
    if (this.numJumps <= 0 || !this.grounded) {
      return;
    } else if (this.numJumps >= 1) {
      this.vel.y = -this.jumpStrength;
      this.numJumps--;
    }
  }

  private checkEnemyCollision(): void {
    this.on("collisionstart", (ev) => {
      if (this.invulnerableTime >= 0 && ev.other instanceof EnemyStatic) {
        this.hurt();
        this.invulnerableTime = this.invulnerableTimeMax;
      }
    });
  }

  private updateInvulnerableTime(delta: number): void {
    if (this.invulnerableTime > 0) {
      this.invulnerableTime -= delta;
      if (this.invulnerableTime <= 0) {
        this.invulnerableTime = 0;
      } else {
      }
    }
  }
  private updateInput(engine: ex.Engine): void {
    if (engine.input.keyboard.wasPressed(ex.Keys.H)) {
      this.hurt();
    }
    if (engine.input.keyboard.wasPressed(ex.Keys.D)) {
      this.jump();
    }
    if (engine.input.keyboard.isHeld(ex.Keys.Left)) {
      this.vel.x -= this.accMag;
    }
    if (engine.input.keyboard.isHeld(ex.Keys.Right)) {
      this.vel.x += this.accMag;
    }

    if (engine.input.keyboard.wasPressed(ex.Keys.S)) {
      this.useHeldItem();
    }

    if (engine.input.keyboard.wasPressed(ex.Keys.A)) {
      this.interactWithInteractables(engine);
    }
  }

  private hurt(): void {
    if (this.invulnerableTime > 0) {
      return;
    }
    this.hp--;
    if (this.hp <= 0) {
      this.kill();
    }
  }

  private useHeldItem(): void {
    if (this.heldItem === "torch") {
      console.log("used torch");
    }
  }

  private interactWithInteractables(engine: ex.Engine): void {}

  onInitialize(engine: ex.Engine): void {}

  onPreUpdate(engine: ex.Engine, delta: number): void {}

  update(engine: ex.Engine, delta: number): void {
    // debug functions & logs
    this.resetPosition(engine);
    //console.log("this.vel.y", this.vel.y);
    //console.log("this.vel.x", this.vel.x);

    // check player states
    this.checkMoving();
    this.checkDirection();
    this.checkIfGrounded();

    // physics and movement logic
    this.updateGravity(delta);
    this.updateFriction();
    this.updateInput(engine);

    // collisions
    this.checkEnemyCollision();
    this.updateInvulnerableTime(delta);
  }
}
