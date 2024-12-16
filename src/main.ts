import * as ex from "excalibur";
import { Resources, loader } from "./resources";
import { Player } from "./Player";
import { SpeechBubble } from "./SpeechBubble";
import { PauseMenu } from "./PauseMenu";
import { UI } from "./UI";
import { EnemyStatic } from "./enemies/EnemyStatic";
import { NPC } from "./NPC";
import { Ladder } from "./Ladder";
import { ControlsUI } from "./ControlsUI";
import { Prompt } from "./Prompt";
import { SceneManager } from "./SceneManager";
import { ParticleSystem } from "./ParticleSystem";
import { Mask } from "./Mask";

let sceneManager: SceneManager;

let player: Player;
let speechBubble: SpeechBubble;
let ui: UI;
let pauseMenu: PauseMenu;
let enemyStatic: EnemyStatic;
let npc: NPC;
let ladder: Ladder;
let controlsUI: ControlsUI;
let prompt: Prompt;
let torch: ParticleSystem;

let mask: Mask;

export class Game extends ex.Engine {
  isPaused: boolean = false;
  controlsUIVisible: boolean = false;
  constructor() {
    super({
      width: 128,
      height: 128,
      canvasElementId: "game",
      backgroundColor: ex.Color.Black,
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
      controlsUI.show(true);
    } else {
      controlsUI.show(false);
    }
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    game.togglePause();
  }
  if (e.key === "h") {
    controlsUI.show(true);
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "h") {
    controlsUI.show(false);
  }
});

const game = new Game();

game.start(loader).then(() => {
  sceneManager = new SceneManager();

  speechBubble = new SpeechBubble();
  torch = new ParticleSystem({
    accX: 0,
    accY: -2,
    emitting: false,
    minA: (Math.PI * 11) / 8,
    maxA: (Math.PI * 13) / 8,
    focusAcc: 400,
  });
  player = new Player({
    pos: new ex.Vector(8, 0),
    speechBubble: speechBubble,
  });
  player.onInitialize(game);
  ui = new UI({ game: game });
  enemyStatic = new EnemyStatic({ pos: new ex.Vector(60, 90) });
  npc = new NPC({
    pos: new ex.Vector(16, 80),
    name: "greeter",
  });
  ladder = new Ladder({ pos: new ex.Vector(32, 80) });
  controlsUI = new ControlsUI({ pos: new ex.Vector(160, 60) });
  prompt = new Prompt();

  mask = new Mask(game);

  Resources.TiledMap.addToScene(game.currentScene);
  game.add(player);
  game.add(enemyStatic);
  game.add(npc);
  game.add(ladder);
  game.add(controlsUI.actor);
  game.add(prompt.actor);
  game.add(mask);
});

game.onPreUpdate = (engine: ex.Engine, delta: number) => {
  sceneManager.update(game, player);
  ui.update(game, player);
  speechBubble.update(game, player);
  prompt.update(player);
};

game.onPostDraw = (ctx: ex.ExcaliburGraphicsContext, delta: number) => {
  mask.onPostDraw(ctx);
};
