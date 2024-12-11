import * as ex from "excalibur";
import { tileSpriteSheet } from "./resources";
import { Player } from "./Player";

export class UI {
  numHearts: number = 3;
  hearts: ex.Actor[] = [];
  heldItemSprite: ex.Sprite;
  heldItemActor: ex.Actor;

  constructor(game: ex.Engine) {
    let heartSprite: ex.Sprite = tileSpriteSheet.getSprite(1, 7);

    for (let i = 0; i < this.numHearts; i++) {
      const heartActor = new ex.Actor({
        x: 8 + i * 16,
        y: 8,
        width: 8,
        height: 8,
        anchor: ex.Vector.Zero,
      });

      heartActor.graphics.use(heartSprite);
      this.hearts.push(heartActor);
      game.add(heartActor);
    }
    this.heldItemSprite = tileSpriteSheet.getSprite(1, 6);
    this.heldItemActor = new ex.Actor({
      x: 8 + this.numHearts * 16,
      y: 8,
      width: 8,
      height: 8,
      anchor: ex.Vector.Zero,
    });
    game.add(this.heldItemActor);
  }

  private updateHearts(game: ex.Engine, player: Player) {
    this.numHearts = player.hp;
    while (this.hearts.length > this.numHearts) {
      const heart = this.hearts.pop();
      if (heart) {
        heart.kill();
      }
    }
    while (this.hearts.length < this.numHearts) {
      const heartActor = new ex.Actor({
        x: 8 + this.hearts.length * 16,
        y: 8,
        width: 8,
        height: 8,
        anchor: ex.Vector.Zero,
      });
      heartActor.graphics.use(tileSpriteSheet.getSprite(1, 7));
      this.hearts.push(heartActor);
      game.add(heartActor);
    }
  }

  private updateHeldItem(game: ex.Engine, player: Player) {
    if (player.heldItem == "torch") {
      this.heldItemSprite = tileSpriteSheet.getSprite(2, 5);
      this.heldItemActor.graphics.use(this.heldItemSprite);
    } else if (player.heldItem == "bow") {
      this.heldItemSprite = tileSpriteSheet.getSprite(1, 5);
      this.heldItemActor.graphics.use(this.heldItemSprite);
    }
  }

  public update(game: ex.Engine, player: Player) {
    this.updateHearts(game, player);
    this.updateHeldItem(game, player);
  }
}
