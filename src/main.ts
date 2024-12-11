import * as ex from "excalibur";
import { Resources, loader } from "./resources";
import { Player } from "./player";
import { SpeechBubble } from "./SpeechBubble";
import { PauseMenu } from "./PauseMenu";
import { UI } from "./UI";
import { EnemyStatic } from "./enemies/EnemyStatic";
import { NPC } from "./NPC";
import { Ladder } from "./Ladder";
import { ControlsUI } from "./ControlsUI";

let player: Player;
let speechBubble: SpeechBubble;
let ui: UI;
let pauseMenu: PauseMenu;
let enemyStatic: EnemyStatic;
let npc: NPC;
let ladder: Ladder;
let controlsUI: ControlsUI;

export class Game extends ex.Engine {
  isPaused: boolean = false;
  controlsUIVisible: boolean = false;
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

  public toggleControlsUI() {
    this.controlsUIVisible = !this.controlsUIVisible;
    if (this.controlsUIVisible) {
      controlsUI.show();
    } else {
      controlsUI.hide();
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    game.togglePause();
  }
  if (e.key === "h") {
    controlsUI.show();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "h") {
    controlsUI.hide();
  }
});

const game = new Game();

game.start(loader).then(() => {
  speechBubble = new SpeechBubble();
  player = new Player(new ex.Vector(50, 50), speechBubble);
  ui = new UI(game);
  enemyStatic = new EnemyStatic(new ex.Vector(60, 90));
  npc = new NPC(game, new ex.Vector(16, 80), "greeter");
  ladder = new Ladder(new ex.Vector(32, 80));
  controlsUI = new ControlsUI(160, 60);

  Resources.TiledMap.addToScene(game.currentScene);
  game.add(player);
  game.add(player.promptActor);
  game.add(speechBubble.actor);
  game.add(speechBubble.bubbleGroupActor);
  game.add(enemyStatic);
  game.add(npc);
  game.add(ladder);
  game.add(controlsUI.actor);
});

game.onPreUpdate = (engine: ex.Engine, delta: number) => {
  ui.update(game, player);
};
