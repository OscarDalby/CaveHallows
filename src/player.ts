import * as ex from "excalibur";
import { Resources, playerAnim } from "./resources";

export class Player extends ex.Actor {
  // constants
  gravity: number;
  accMag: number;
  maxSpeed: number;
  jumpStrength: number;
  friction: number;
  // properties

  constructor(pos: ex.Vector) {
    super({
      pos,
      width: 8,
      height: 8,
      collisionType: ex.CollisionType.Active,
    });
    this.gravity = 1;
    this.accMag = 4;
    this.maxSpeed = 5;
    this.jumpStrength = 220;
    this.friction = 0.5;
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

  private jump(): void {
    this.vel.y = -this.jumpStrength;
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

  onPreUpdate(engine: ex.Engine, delta: number): void { }

  update(engine: ex.Engine, delta: number): void {
    // debug functions & logs
    this.resetPosition(engine);
    console.log("this.vel.y", this.vel.y);
    console.log("this.vel.x", this.vel.x);
    // physics and movement logic
    this.updateGravity(delta);
    this.updateFriction();
    this.updateInput(engine);

    this.graphics.use(playerAnim);
  }
}
