import { Resources } from "./resources";
import * as ex from "excalibur";

const processText = (text: string): string => {
  if (text.length > 10) {
    return text.slice(0, 10);
  }
};

const spriteFontSheet = ex.SpriteSheet.fromImageSource({
  image: Resources.SpriteFontImage,
  grid: {
    rows: 3,
    columns: 16,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});
const spriteFont = new ex.SpriteFont({
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz,!'&.\"?-()+ ",
  caseInsensitive: true,
  spriteSheet: spriteFontSheet,
  scale: new ex.Vector(0.3, 0.3),
});
const text = new ex.Text({
  text: "This is sprite font text!!",
  font: spriteFont,
});

export const speechActor = new ex.Actor({
  pos: ex.vec(210, 100),
});

speechActor.graphics.use(text);
