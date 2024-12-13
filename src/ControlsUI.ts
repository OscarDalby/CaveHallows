import * as ex from "excalibur";
import { spriteFont } from "./resources";

interface ControlsUIProps {
  pos: ex.Vector;
}

export class ControlsUI {
  pos: ex.Vector;
  actor: ex.Actor;
  controlsString: string =
    "Arrows to move\nD to jump\nS to use item\nA to interact\nR to reset";
  controlsText: ex.Text = new ex.Text({
    text: this.controlsString,
    font: spriteFont,
  });
  constructor({ pos }: ControlsUIProps) {
    this.pos = pos;
    this.actor = new ex.Actor({
      pos: this.pos,
    });
    this.actor.graphics.opacity = 0;
    this.actor.graphics.use(this.controlsText);
  }

  public show(show: boolean): void {
    this.actor.graphics.opacity = show ? 1 : 0;
  }
}
