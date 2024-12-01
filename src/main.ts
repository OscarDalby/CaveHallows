import * as ex from "excalibur";
import { Resources, loader } from "./resources";
import { Player } from "./player";
import { SpeechBubble } from "./SpeechBubble";
import { UI } from "./UI";

let player: Player;
let ui: UI;
let speechBubble: SpeechBubble;

const game = new ex.Engine({
  width: 128,
  height: 128,
  canvasElementId: "game",
  backgroundColor: ex.Color.Blue,
  pixelArt: true,
  pixelRatio: 6,
});

game.start(loader).then(() => {
  player = new Player(new ex.Vector(50, 50));
  speechBubble = new SpeechBubble();
  ui = new UI(game);
  Resources.TiledMap.addToScene(game.currentScene);
  game.add(player);
  game.add(speechBubble.actor);
  speechBubble.setSpeech("Hello, World!");
});

game.onPreUpdate = (engine: ex.Engine, delta: number) => {
  ui.update(game, player);
};
