import { spriteFont, opaqueTileSpriteSheet } from "./resources";
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

  // Bubble actors
  bubbleTopLeftX: number = 10;
  bubbleTopLeftY: number = 80;
  bubbleTopLeft: ex.Actor;
  bubbleTopRight: ex.Actor;
  bubbleBottomLeft: ex.Actor;
  bubbleBottomRight: ex.Actor;
  bubbleTop: ex.Actor;
  bubbleBottom: ex.Actor;
  bubbleLeft: ex.Actor;
  bubbleRight: ex.Actor;
  bubbleActors: ex.Actor[];

  constructor(x: number = 120, y: number = 120) {
    this.pos = ex.vec(x, y);
    this.actor = new ex.Actor({
      pos: this.pos,
      z: 100,
    });
    this.actor.graphics.use(this.text);
    // Bubble actors
    this.bubbleTopLeft = new ex.Actor({
      pos: ex.vec(this.bubbleTopLeftX, this.bubbleTopLeftY),
      z: 99,
    });
    this.bubbleTopLeft.graphics.use(opaqueTileSpriteSheet.getSprite(10, 0));
    this.bubbleTop = new ex.Actor({
      pos: ex.vec(this.bubbleTopLeftX + 8, this.bubbleTopLeftY),
      z: 99,
    });
    this.bubbleTop.graphics.use(opaqueTileSpriteSheet.getSprite(11, 0));
    this.bubbleTopRight = new ex.Actor({
      pos: ex.vec(this.bubbleTopLeftX + 16, this.bubbleTopLeftY),
      z: 99,
    });
    this.bubbleTopRight.graphics.use(opaqueTileSpriteSheet.getSprite(12, 0));
    this.bubbleRight = new ex.Actor({
      pos: ex.vec(this.bubbleTopLeftX + 16, this.bubbleTopLeftY + 8),
      z: 99,
    });
    this.bubbleRight.graphics.use(opaqueTileSpriteSheet.getSprite(12, 1));
    this.bubbleBottomRight = new ex.Actor({
      pos: ex.vec(this.bubbleTopLeftX + 16, this.bubbleTopLeftY + 16),
      z: 99,
    });
    this.bubbleBottomRight.graphics.use(opaqueTileSpriteSheet.getSprite(12, 2));
    this.bubbleBottom = new ex.Actor({
      pos: ex.vec(this.bubbleTopLeftX + 8, this.bubbleTopLeftY + 16),
      z: 99,
    });
    this.bubbleBottom.graphics.use(opaqueTileSpriteSheet.getSprite(11, 2));
    this.bubbleBottomLeft = new ex.Actor({
      pos: ex.vec(this.bubbleTopLeftX, this.bubbleTopLeftY + 16),
      z: 99,
    });
    this.bubbleBottomLeft.graphics.use(opaqueTileSpriteSheet.getSprite(10, 2));
    this.bubbleLeft = new ex.Actor({
      pos: ex.vec(this.bubbleTopLeftX, this.bubbleTopLeftY + 8),
      z: 99,
    });
    this.bubbleLeft.graphics.use(opaqueTileSpriteSheet.getSprite(10, 1));
    this.bubbleActors = [
      this.bubbleTopLeft,
      this.bubbleTop,
      this.bubbleTopRight,
      this.bubbleRight,
      this.bubbleBottomRight,
      this.bubbleBottom,
      this.bubbleBottomLeft,
      this.bubbleLeft,
    ];
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

  public show(): void {
    this.actor.graphics.opacity = 1;
  }

  public hide(): void {
    this.actor.graphics.opacity = 0;
  }

  public setSpeech(speech: string): void {
    this.speech = this.processText(speech);
    this.text.text = this.speech;
  }

  public setPosition(x: number, y: number): void {
    this.pos = ex.vec(x, y);
    this.actor.pos = this.pos;
  }
}
