import { spriteFont } from "./resources";
import * as ex from "excalibur";

export class SpeechBubble {
  speech: string = "";
  pos: ex.Vector;
  maxLettersInLine: number = 26;
  text: ex.Text = new ex.Text({
    text: this.speech,
    font: spriteFont,
  });
  actor: ex.Actor;

  constructor(x: number = 160, y: number = 100) {
    this.pos = ex.vec(x, y);
    this.actor = new ex.Actor({
      pos: this.pos,
    });
    this.actor.graphics.use(this.text);
  }

  private processText = (text: string): string => {
    let result = [];
    while (text.length > 0) {
      if (text.length <= this.maxLettersInLine) {
        result.push(text);
        break;
      }
      let lastSpace = text.substring(0, this.maxLettersInLine).lastIndexOf(" ");
      if (lastSpace === -1) {
        lastSpace = this.maxLettersInLine;
      }
      result.push(text.substring(0, lastSpace));
      text = text.substring(lastSpace + 1);
    }
    return result.join("\n");
  };

  public setSpeech(speech: string): void {
    this.speech = this.processText(speech);
    this.text.text = this.speech;
  }

  public setPosition(x: number, y: number): void {
    this.pos = ex.vec(x, y);
    this.actor.pos = this.pos;
  }
}
