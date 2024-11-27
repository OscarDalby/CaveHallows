import * as ex from "excalibur";
import { Resources, playerAnim } from "./resources";

export class Player extends ex.Actor {
  constructor(pos: ex.Vector) {
    super({
      pos,
      width: 8,
      height: 8,
      collisionType: ex.CollisionType.Active,
    });
  }

  playerSpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Resources.PlayerSpriteSheetPng as ex.ImageSource,
    grid: {
      spriteWidth: 8,
      spriteHeight: 8,
      rows: 1,
      columns: 6,
    },
  });

  onPreUpdate(engine: ex.Engine, delta: number): void {}

  update(engine: ex.Engine, delta: number): void {
    console.log("Player updated");
    this.graphics.use(playerAnim);
  }
}
