import * as ex from "excalibur";
import { Resources, playerAnim } from "./resources";

export class Player extends ex.Actor {
  // constants
  gravity: number = 1;
  accMag: number = 4;
  maxSpeed: number = 5;
  jumpStrength: number = 220;
  friction: number = 0.5;
  maxJumps: number = 1;
  // properties
  grounded: boolean = true;
  numJumps: number = 1;

  constructor(pos: ex.Vector) {
    super({
      pos,
      width: 8,
      height: 8,
      collisionType: ex.CollisionType.Active,
    });
    // props
  }

  private resetPosition(engine: ex.Engine): void {
    if (engine.input.keyboard.isHeld(ex.Keys.R)) {
      this.pos = new ex.Vector(9, 0);
      this.vel = new ex.Vector(0, 0);
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

  private updateInput(engine: ex.Engine): void {
    if (engine.input.keyboard.wasPressed(ex.Keys.Up)) {
      this.jump();
    }
    if (engine.input.keyboard.isHeld(ex.Keys.Left)) {
      this.vel.x -= this.accMag;
    }
    if (engine.input.keyboard.isHeld(ex.Keys.Right)) {
      this.vel.x += this.accMag;
    }
  }

  onInitialize(engine: ex.Engine<any>): void { }

  onPreUpdate(engine: ex.Engine, delta: number): void { }

  update(engine: ex.Engine, delta: number): void {
    // debug functions & logs
    this.resetPosition(engine);
    //console.log("this.vel.y", this.vel.y);
    //console.log("this.vel.x", this.vel.x);

    // check player states
    this.checkDirection();
    this.checkIfGrounded();

    // physics and movement logic
    this.updateGravity(delta);
    this.updateFriction();
    this.updateInput(engine);

    this.graphics.use(playerAnim);
  }
}
