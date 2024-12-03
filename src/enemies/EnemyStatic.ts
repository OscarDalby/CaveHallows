import * as ex from "excalibur";
import { tileSpriteSheet } from "../resources";
import { enemyStaticAnim } from "../resources";

export class EnemyStatic extends ex.Actor {
  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
      width: 8,
      height: 8,
      anchor: ex.Vector.Zero,
    });
    this.graphics.use(enemyStaticAnim);
  }
}
