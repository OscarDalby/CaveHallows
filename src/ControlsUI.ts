import * as ex from "excalibur";
import { spriteFont } from "./resources";

export class ControlsUI {
  pos: ex.Vector;
  actor: ex.Actor;
  controlsString: string =
    "Arrows to move\nD to jump\nS to use item\nA to interact\nR to reset";
  controlsText: ex.Text = new ex.Text({
    text: this.controlsString,
    font: spriteFont,
  });
  constructor(x: number = 160, y: number = 100) {
    this.pos = ex.vec(x, y);
    this.actor = new ex.Actor({
      pos: this.pos,
    });
    this.actor.graphics.opacity = 0;
    this.actor.graphics.use(this.controlsText);
  }

  public show(): void {
    console.log("showing controls");
    this.actor.graphics.opacity = 1;
  }
  public hide(): void {
    console.log("hiding controls");
    this.actor.graphics.opacity = 0;
  }
}
