import * as ex from "excalibur";
import { npcAnim } from "./resources";

export class NPC extends ex.Actor {
  constructor(pos: ex.Vector) {
    super({
      pos: pos,
      width: 8,
      height: 8,
      z: 3,
      collisionType: ex.CollisionType.Passive,
      anchor: ex.Vector.Zero,
    });
    this.graphics.use(npcAnim);
  }
}
