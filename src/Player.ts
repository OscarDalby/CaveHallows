import * as ex from "excalibur";
import { Resources, playerAnim, playerIdle, spriteFont } from "./resources";
import { EnemyStatic } from "./enemies/EnemyStatic";
import { NPC } from "./NPC";
import { Ladder } from "./Ladder";
import { SpeechBubble } from "./SpeechBubble";

export class Player extends ex.Actor {
  speechBubble: SpeechBubble;
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
  npcNearby: boolean = false;
  inConversation: boolean = false;
  canMove: boolean = true;
  ladderNearby: boolean = false;
  onLadder: boolean = false;

  promptText: ex.Text;
  promptActor: ex.Actor;
  constructor(pos: ex.Vector, speechBubble: SpeechBubble) {
    super({
      pos,
      width: 8,
      height: 8,
      z: 90,
      collisionType: ex.CollisionType.Active,
    });
    this.speechBubble = speechBubble;

    this.promptText = new ex.Text({
      text: "",
      font: spriteFont,
    });
    this.promptActor = new ex.Actor({
      pos: pos.add(new ex.Vector(-25, -25)),
      anchor: ex.Vector.Zero,
    });
    this.promptActor.graphics.use(this.promptText);
  }

  private resetPosition(engine: ex.Engine): void {
    if (engine.input.keyboard.isHeld(ex.Keys.R)) {
      this.pos = new ex.Vector(9, 0);
      this.vel = new ex.Vector(0, 0);
      this.hp = this.maxHp;
    }
  }

  private updateGravity(delta: number): void {
    if (!this.onLadder || !this.ladderNearby) {
      this.vel.y += this.gravity * delta;
    }
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

  private checkNpcCollision(): void {
    this.on("collisionstart", (e) => {
      if (e.other instanceof NPC) {
        this.npcNearby = true;
      }
    });
    this.on("collisionend", (e) => {
      if (e.other instanceof NPC) {
        this.npcNearby = false;
      }
    });
  }

  private checkLadderCollision(): void {
    this.on("collisionstart", (e) => {
      if (e.other instanceof Ladder) {
        this.ladderNearby = true;
      }
    });
    this.on("collisionend", (e) => {
      if (e.other instanceof Ladder) {
        this.ladderNearby = false;
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

  public updatePrompt() {
    if (this.npcNearby) {
      this.promptText.text = "Press A to talk";
      this.promptActor.graphics.use(this.promptText);
      this.promptActor.graphics.opacity = 1;
    } else {
      this.promptActor.graphics.opacity = 0;
    }
  }

  private updateInput(engine: ex.Engine): void {
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

    if (engine.input.keyboard.wasPressed(ex.Keys.Up) && this.ladderNearby) {
      this.onLadder = true;
      this.vel.y = -10;
    } else if (engine.input.keyboard.wasReleased(ex.Keys.Up)) {
      this.vel.y = 0;
    }
    if (engine.input.keyboard.wasPressed(ex.Keys.Down) && this.ladderNearby) {
      this.onLadder = true;
      this.vel.y = 10;
    }
  }

  private updateInteractions(engine: ex.Engine): void {
    if (engine.input.keyboard.wasPressed(ex.Keys.A)) {
      this.interactWithNpc();
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

  private interactWithNpc(): void {
    if (this.npcNearby && !this.inConversation) {
      console.log("loading speeches");
      this.speechBubble.loadSpeeches([
        "Hello!",
        "How are you?",
        "I'm fine, thank you!",
      ]);
      this.inConversation = true;
      this.canMove = false;
    }
  }

  onInitialize(engine: ex.Engine): void {}

  onPreUpdate(engine: ex.Engine, delta: number): void {}

  update(engine: ex.Engine, delta: number): void {
    // debug functions & logs
    this.resetPosition(engine);

    // check player states
    this.checkMoving();
    this.checkDirection();
    this.checkIfGrounded();
    this.updateInteractions(engine);

    // physics and movement logic
    this.updateGravity(delta);
    this.updateFriction();
    if (this.canMove) {
      this.updateInput(engine);
    }

    // collisions
    this.checkEnemyCollision();
    this.checkNpcCollision();
    this.updatePrompt();
    this.checkLadderCollision();
    this.updateInvulnerableTime(delta);
  }
}
