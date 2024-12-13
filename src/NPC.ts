import * as ex from "excalibur";
import { npcAnim, spriteFont } from "./resources";
import { Player } from "./Player";

interface NPCProps {
  game: ex.Engine;
  pos: ex.Vector;
  name: string;
}

export class NPC extends ex.Actor {
  playerNearby: boolean = false;
  constructor({ game, pos, name }: NPCProps) {
    super({
      pos: pos,
      width: 8,
      height: 8,
      z: 3,
      collisionType: ex.CollisionType.Passive,
      anchor: ex.Vector.Zero,
    });
    this.graphics.use(npcAnim);
    this.name = name;
  }

  private checkNpcCollision(): void {
    this.on("collisionstart", (e) => {
      if (e.other instanceof Player) {
        this.playerNearby = true;
      }
    });
    this.on("collisionend", (e) => {
      if (e.other instanceof Player) {
        this.playerNearby = false;
      }
    });
  }
  public update(game: ex.Engine): void {
    this.checkNpcCollision();
  }
}
