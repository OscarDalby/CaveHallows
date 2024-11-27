import * as ex from "excalibur";
import { Resources, loader } from "./resources";
import { Player } from "./player";

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

  Resources.TiledMap.addToScene(game.currentScene);
  game.add(player);
});
