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
let particleSystem: ParticleSystem;

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
  player = new Player({ pos: new ex.Vector(8, 0), speechBubble: speechBubble });
  ui = new UI({ game: game });
  enemyStatic = new EnemyStatic({ pos: new ex.Vector(60, 90) });
  npc = new NPC({
    game: game,
    pos: new ex.Vector(16, 80),
    name: "greeter",
  });
  ladder = new Ladder({ pos: new ex.Vector(32, 80) });
  controlsUI = new ControlsUI({ pos: new ex.Vector(160, 60) });
  prompt = new Prompt();
  particleSystem = new ParticleSystem({ accX: 2, accY: 2 });

  Resources.TiledMap.addToScene(game.currentScene);
  game.add(player);
  game.add(speechBubble.bubbleBackgroundActor);
  game.add(speechBubble.bubbleGroupActor);
  game.add(speechBubble.textActor);
  game.add(enemyStatic);
  game.add(npc);
  game.add(ladder);
  game.add(controlsUI.actor);
  game.add(prompt.actor);
  game.add(particleSystem.actor);
});

game.onPreUpdate = (engine: ex.Engine, delta: number) => {
  sceneManager.update(game, player);
  ui.update(game, player);
  speechBubble.update(game, player);
  prompt.update(player);
};
