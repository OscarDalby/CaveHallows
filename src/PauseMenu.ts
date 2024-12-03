import { Resources } from "./resources";
import * as ex from "excalibur";

export class PauseMenu {
  pos: ex.Vector;
  maxLettersInLine: number = 26;
  spriteSheet: ex.SpriteSheet = ex.SpriteSheet.fromImageSource({
    image: Resources.SpriteFontImage,
    grid: {
      rows: 3,
      columns: 16,
      spriteWidth: 16,
      spriteHeight: 16,
    },
  });
  spriteFont: ex.SpriteFont = new ex.SpriteFont({
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz,!'&.\"?-()+ ",
    caseInsensitive: true,
    spriteSheet: this.spriteSheet,
    scale: new ex.Vector(0.3, 0.3),
  });
  text: ex.Text = new ex.Text({
    text: "resume\nsave\nload\nquit",
    font: this.spriteFont,
  });
  actor: ex.Actor;

  constructor(x: number = 60, y: number = 100) {
    this.pos = ex.vec(x, y);
    this.actor = new ex.Actor({
      pos: this.pos,
    });
    this.actor.graphics.use(this.text);
    this.actor.z = 150;
  }
}
