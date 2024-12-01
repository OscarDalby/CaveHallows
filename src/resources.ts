import * as ex from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";

import playerImagePath from "../img/void-break-player-transparent.png?url";
import tilesetPath from "../img/void-break-transparent.png?url";
import tmxPath from "../res/ch_level_0.tmx?url";
import tsxPath from "../res/cave_hallows_tileset.tsx?url";

export const Resources = {
  TilesheetPng: new ex.ImageSource(tilesetPath),
  PlayerSpriteSheetPng: new ex.ImageSource(
    playerImagePath,
    false,
    ex.ImageFiltering.Pixel,
  ),
  SpriteFontImage: new ex.ImageSource("../img/sprite-font.png"),
  TiledMap: new TiledResource(tmxPath, {
    pathMap: [
      { path: "ch_level_0.tmx", output: tmxPath },
      { path: "void-break-transparent.png", output: tilesetPath },
      { path: "cave_hallows_tileset.tsx", output: tsxPath },
    ],
  }),
  TsxResource: new ex.Resource(tsxPath, "text"),
};

export const tileSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Resources.TilesheetPng,
  grid: {
    spriteWidth: 8,
    spriteHeight: 8,
    rows: 16,
    columns: 16,
  },
});

const playerSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Resources.PlayerSpriteSheetPng,
  grid: {
    spriteWidth: 8,
    spriteHeight: 8,
    rows: 1,
    columns: 6,
  },
});

export const playerAnim = ex.Animation.fromSpriteSheet(
  playerSpriteSheet,
  ex.range(1, 6),
  100,
);

export const playerIdle = ex.Animation.fromSpriteSheet(
  playerSpriteSheet,
  ex.range(1, 2),
  200,
);

export const loader = new ex.Loader();
for (let resource of Object.values(Resources)) {
  loader.addResource(resource);
}
