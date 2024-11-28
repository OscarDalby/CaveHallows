import * as ex from "excalibur";
import { Resources, loader } from "./resources";
import { Player } from "./player";
import { SpeechBubble } from "./speech";

const game = new ex.Engine({
  width: 128,
  height: 128,
  canvasElementId: "game",
  backgroundColor: ex.Color.Black,
  pixelArt: true,
  pixelRatio: 6,
});

game.start(loader).then(() => {
  const player = new Player(new ex.Vector(50, 50));
  const speechBubble = new SpeechBubble();

  Resources.TiledMap.addToScene(game.currentScene);
  game.add(player);

  game.add(speechBubble.actor);
  speechBubble.setSpeech("Hello, World!");
});
