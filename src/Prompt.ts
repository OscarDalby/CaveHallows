import { Player } from "./Player";
import * as ex from "excalibur";
import { spriteFont } from "./resources";

export class Prompt {
  text: ex.Text;
  actor: ex.Actor;
  constructor() {
    this.text = new ex.Text({
      text: "",
      font: spriteFont,
    });
    this.actor = new ex.Actor({
      anchor: ex.Vector.Zero,
    });
    this.actor.graphics.use(this.text);
  }

  public update(player: Player) {
    // set up this way for more flexibility when adding more prompts
    if (player.npcNearby) {
      this.text.text = "Press A to talk";
    }

    if (player.npcNearby) {
      const textWidth = 8 * this.text.text.length;
      this.actor.pos = player.pos.add(new ex.Vector(-textWidth / 2 + 16, -16));
      this.actor.pos.x = Math.min(
        128 - textWidth,
        Math.max(0, this.actor.pos.x),
      );
      this.actor.graphics.use(this.text);
      this.show(true);
    } else {
      this.show(false);
    }
  }

  private show(show: boolean): void {
    this.actor.graphics.opacity = show ? 1 : 0;
  }
}
