import {
  ImageFiltering,
  ImageSource,
  Loader,
  Resource,
  Animation,
  range,
  SpriteSheet,
} from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";

import playerImagePath from "../img/void-break-player-transparent.png?url";
import tilesetPath from "../img/void-break-transparent.png?url";
import tmxPath from "../res/ch_level_0.tmx?url";
import tsxPath from "../res/cave_hallows_tileset.tsx?url";

export const Resources = {
  PlayerSpriteSheetPng: new ImageSource(
    playerImagePath,
    false,
    ImageFiltering.Pixel,
  ),
  TiledMap: new TiledResource(tmxPath, {
    pathMap: [
      { path: "ch_level_0.tmx", output: tmxPath },
      { path: "void-break-transparent.png", output: tilesetPath },
      { path: "cave_hallows_tileset.tsx", output: tsxPath },
    ],
  }),
  TsxResource: new Resource(tsxPath, "text"),
};

const playerSpriteSheet = SpriteSheet.fromImageSource({
  image: Resources.PlayerSpriteSheetPng,
  grid: {
    spriteWidth: 8,
    spriteHeight: 8,
    rows: 1,
    columns: 6,
  },
});

export const playerAnim = Animation.fromSpriteSheet(
  playerSpriteSheet,
  range(1, 6),
  200,
);

export const loader = new Loader();
for (let resource of Object.values(Resources)) {
  loader.addResource(resource);
}
