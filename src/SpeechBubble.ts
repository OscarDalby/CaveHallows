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

  // Bubble GraphicsGroup
  bubbleGraphicsGroup: ex.GraphicsGroup = new ex.GraphicsGroup({
    useAnchor: false,
    members: [
      {
        // Top left
        graphic: opaqueTileSpriteSheet.getSprite(10, 0),
        offset: ex.vec(0, 0),
      },
      {
        // Top 1
        graphic: opaqueTileSpriteSheet.getSprite(11, 0),
        offset: ex.vec(8, 0),
      },
      {
        // Top 2
        graphic: opaqueTileSpriteSheet.getSprite(11, 0),
        offset: ex.vec(16, 0),
      },
      {
        // Top 3
        graphic: opaqueTileSpriteSheet.getSprite(11, 0),
        offset: ex.vec(24, 0),
      },
      {
        // Top 4
        graphic: opaqueTileSpriteSheet.getSprite(11, 0),
        offset: ex.vec(32, 0),
      },
      {
        // Top 5
        graphic: opaqueTileSpriteSheet.getSprite(11, 0),
        offset: ex.vec(40, 0),
      },
      {
        // Top 6
        graphic: opaqueTileSpriteSheet.getSprite(11, 0),
        offset: ex.vec(48, 0),
      },
      {
        // Top 7
        graphic: opaqueTileSpriteSheet.getSprite(11, 0),
        offset: ex.vec(56, 0),
      },
      {
        // Top 8
        graphic: opaqueTileSpriteSheet.getSprite(11, 0),
        offset: ex.vec(64, 0),
      },
      {
        // Top 9
        graphic: opaqueTileSpriteSheet.getSprite(11, 0),
        offset: ex.vec(72, 0),
      },
      {
        // Top 10
        graphic: opaqueTileSpriteSheet.getSprite(11, 0),
        offset: ex.vec(80, 0),
      },
      {
        // Top right
        graphic: opaqueTileSpriteSheet.getSprite(12, 0),
        offset: ex.vec(88, 0),
      },
      {
        // Right 1
        graphic: opaqueTileSpriteSheet.getSprite(12, 1),
        offset: ex.vec(88, 8),
      },
      {
        // Right 2
        graphic: opaqueTileSpriteSheet.getSprite(12, 1),
        offset: ex.vec(88, 16),
      },
      {
        // Bottom right
        graphic: opaqueTileSpriteSheet.getSprite(12, 2),
        offset: ex.vec(88, 24),
      },
      {
        // Bottom 1
        graphic: opaqueTileSpriteSheet.getSprite(11, 2),
        offset: ex.vec(80, 24),
      },
      {
        // Bottom 2
        graphic: opaqueTileSpriteSheet.getSprite(11, 2),
        offset: ex.vec(72, 24),
      },
      {
        // Bottom 3
        graphic: opaqueTileSpriteSheet.getSprite(11, 2),
        offset: ex.vec(64, 24),
      },
      {
        // Bottom 4
        graphic: opaqueTileSpriteSheet.getSprite(11, 2),
        offset: ex.vec(56, 24),
      },
      {
        // Bottom 5
        graphic: opaqueTileSpriteSheet.getSprite(11, 2),
        offset: ex.vec(48, 24),
      },
      {
        // Bottom 6
        graphic: opaqueTileSpriteSheet.getSprite(11, 2),
        offset: ex.vec(40, 24),
      },
      {
        // Bottom 7
        graphic: opaqueTileSpriteSheet.getSprite(11, 2),
        offset: ex.vec(32, 24),
      },
      {
        // Bottom 8
        graphic: opaqueTileSpriteSheet.getSprite(11, 2),
        offset: ex.vec(24, 24),
      },
      {
        // Bottom 9
        graphic: opaqueTileSpriteSheet.getSprite(11, 2),
        offset: ex.vec(16, 24),
      },
      {
        // Bottom 10
        graphic: opaqueTileSpriteSheet.getSprite(11, 2),
        offset: ex.vec(8, 24),
      },
      {
        // Bottom left
        graphic: opaqueTileSpriteSheet.getSprite(10, 2),
        offset: ex.vec(0, 24),
      },
      {
        // Left 1
        graphic: opaqueTileSpriteSheet.getSprite(10, 1),
        offset: ex.vec(0, 16),
      },
      {
        // Left 2
        graphic: opaqueTileSpriteSheet.getSprite(10, 1),
        offset: ex.vec(0, 8),
      },
    ],
  });

  bubbleGroupActor: ex.Actor = new ex.Actor({ pos: ex.vec(64, 104), z: 99 });

  constructor(x: number = 120, y: number = 120) {
    this.pos = ex.vec(x, y);
    this.actor = new ex.Actor({
      pos: this.pos,
      z: 100,
    });
    this.actor.graphics.use(this.text);
    // Bubble actors

    this.bubbleGroupActor.graphics.use(this.bubbleGraphicsGroup);
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
