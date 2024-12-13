import { Player } from "./Player";
import { spriteFont, opaqueTileSpriteSheet } from "./resources";
import * as ex from "excalibur";

export class SpeechBubble {
  speech: string = "";
  maxLettersInLine: number = 19;
  text: ex.Text = new ex.Text({
    text: this.speech,
    font: spriteFont,
  });
  textActor: ex.Actor;

  npcSpeeches: string[] = ["Hello!", "How are you?", "I'm fine, thank you!"];
  speechIndex: number = 0;
  loadedSpeeches: string[] = [];

  // Bubble pos
  bubbleTopLeftX: number = 16;
  bubbleTopLeftY: number = 92;

  // Bubble background
  bubbleBackgroundActor: ex.Actor = new ex.Actor({
    pos: ex.vec(this.bubbleTopLeftX, this.bubbleTopLeftY),
    z: 98,
    width: 96,
    height: 32,
    color: ex.Color.fromHex("#000000"),
  });
  // Bubble GraphicsGroup
  bubbleGraphicsGroup: ex.GraphicsGroup = new ex.GraphicsGroup({
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

  bubbleGroupActor: ex.Actor = new ex.Actor({
    pos: ex.vec(this.bubbleTopLeftX, this.bubbleTopLeftY),
    z: 99,
  });

  constructor() {
    this.textActor = new ex.Actor({
      pos: new ex.Vector(this.bubbleTopLeftX + 4, this.bubbleTopLeftY + 4),
      z: 100,
    });
    this.textActor.anchor = ex.vec(0, 0);
    this.bubbleBackgroundActor.anchor = ex.vec(0, 0);
    this.bubbleGroupActor.anchor = ex.vec(0, 0);
    this.textActor.graphics.use(this.text);

    this.bubbleGroupActor.graphics.use(this.bubbleGraphicsGroup);
  }

  private processText = (text: string): string => {
    let result: string[] = [];
    while (text.length > 0) {
      if (text.length <= this.maxLettersInLine) {
        result.push(text);
        break;
      }

      let chunk = text.substring(0, this.maxLettersInLine);
      let lastSpace = chunk.lastIndexOf(" ");

      if (lastSpace === -1) {
        result.push(chunk);
        text = text.substring(this.maxLettersInLine);
      } else {
        result.push(text.substring(0, lastSpace));
        text = text.substring(lastSpace + 1);
      }
    }
    const output = result.join("\n");
    return output;
  };

  private show(show: boolean): void {
    this.textActor.graphics.opacity = show ? 1 : 0;
    this.bubbleBackgroundActor.graphics.opacity = show ? 1 : 0;
    this.bubbleGroupActor.graphics.opacity = show ? 1 : 0;
  }

  private setSpeech(speech: string): void {
    this.speech = this.processText(speech);
    this.text.text = this.speech;
    this.textActor.graphics.use(this.text);
  }
  public loadSpeeches(speeches?: string[]): void {
    if (speeches === undefined) {
      this.loadedSpeeches = this.npcSpeeches;
    } else {
      this.loadedSpeeches = speeches;
    }
    this.speechIndex = 0;
  }

  private beginConversation(): void {
    this.show(true);
    if (this.speechIndex >= this.loadedSpeeches.length) {
      this.show(false);
      return;
    }
    this.setSpeech(this.loadedSpeeches[this.speechIndex]);
  }

  private incrementConversation(game: ex.Engine): void {
    if (game.input.keyboard.wasPressed(ex.Keys.A)) {
      this.speechIndex++;
    }
  }

  update(game: ex.Engine, player: Player): void {
    if (this.loadSpeeches.length > 0) {
      this.beginConversation();
      this.incrementConversation(game);
      if (this.speechIndex >= this.loadedSpeeches.length) {
        this.show(false);
        player.canMove = true;
      }
      if (this.speechIndex > this.loadedSpeeches.length) {
        player.inConversation = false;
      }
    }
  }
}
