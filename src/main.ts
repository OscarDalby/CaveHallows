import * as ex from "excalibur";
import { Resources, loader } from "./resources";
import { Player } from "./player";
import { SpeechBubble } from "./SpeechBubble";
import { PauseMenu } from "./PauseMenu";
import { UI } from "./UI";
import { EnemyStatic } from "./enemies/EnemyStatic";

let player: Player;
let speechBubble: SpeechBubble;
let ui: UI;
let pauseMenu: PauseMenu;
let enemyStatic: EnemyStatic;

export class Game extends ex.Engine {
  isPaused: boolean = false;
  constructor() {
    super({
      width: 128,
      height: 128,
      canvasElementId: "game",
      backgroundColor: ex.Color.Blue,
      pixelArt: true,
      pixelRatio: 6,
    });
  }

  public async togglePause() {
    if (!this.isPaused) {
      this.isPaused = true;
      pauseMenu = new PauseMenu();
      game.add(pauseMenu.actor);
      this.stop();
    } else {
      this.isPaused = false;
      pauseMenu.actor.kill();
      this.start(loader);
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    game.togglePause();
  }
});

const game = new Game();

game.start(loader).then(() => {
  player = new Player(new ex.Vector(50, 50));
  speechBubble = new SpeechBubble();
  ui = new UI(game);
  enemyStatic = new EnemyStatic(60, 90);
  Resources.TiledMap.addToScene(game.currentScene);
  game.add(player);
  game.add(speechBubble.actor);
  game.add(enemyStatic);
  speechBubble.setSpeech("Hello, World!");
});

game.onPreUpdate = (engine: ex.Engine, delta: number) => {
  ui.update(game, player);
};
