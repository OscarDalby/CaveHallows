import * as ex from "excalibur";
import { enemyStaticAnim } from "../resources";

interface EnemyStaticProps {
  pos: ex.Vector;
}

export class EnemyStatic extends ex.Actor {
  constructor({ pos }: EnemyStaticProps) {
    super({
      pos: pos,
      width: 8,
      height: 8,
      anchor: ex.Vector.Zero,
    });
    this.graphics.use(enemyStaticAnim);
  }
}
