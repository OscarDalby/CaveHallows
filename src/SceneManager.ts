import * as ex from "excalibur";
import { Game } from "./Game";
import { Player } from "./Player";

interface Screen {
  h: number;
  w: number;
}

export class SceneManager {
  screen: Screen = { h: 0, w: 0 };

  constructor() {
    this.screen.h = this.getScreenHeight();
    this.screen.w = this.getScreenWidth();
  }

  private getScreenWidth(): number {
    return 128;
  }

  private getScreenHeight(): number {
    return 128;
  }

  private changeScene(game: Game, scene: string): void {}

  public update(game: Game, player: Player): void {
    if (player.pos.x > this.screen.w) {
      player.pos.x = 0 + 8;
      // change scene to the next level
    } else if (player.pos.x < 0) {
      player.pos.x = screenWidth - 8;
      // change scene to the previous level
    }
  }
}
