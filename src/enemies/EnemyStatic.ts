import * as ex from "excalibur";
import { enemyStaticAnim } from "../resources";

export class EnemyStatic extends ex.Actor {
  constructor(pos: ex.Vector) {
    super({
      pos: pos,
      width: 8,
      height: 8,
      anchor: ex.Vector.Zero,
    });
    this.graphics.use(enemyStaticAnim);
  }
}
