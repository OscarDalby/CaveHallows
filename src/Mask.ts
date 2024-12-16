import * as ex from "excalibur";

export class Mask extends ex.Actor {
  constructor(game: ex.Engine) {
    super({
      x: game.halfDrawWidth,
      y: game.halfDrawHeight,
      width: game.drawWidth,
      height: game.drawHeight,
      color: ex.Color.Transparent,
      z: 150,
    });
    console.log("Mask created", game.halfDrawWidth, game.halfDrawHeight);
    console.log("Mask created", game.drawWidth, game.drawHeight);
  }

  onPostDraw(ctx: ex.ExcaliburGraphicsContext) {
    ctx.save();
    ctx.drawRectangle(
      new ex.Vector(0, 0),
      this.width,
      this.height,
      ex.Color.Black,
    );
    ctx.drawCircle(new ex.Vector(64, 64), 30, ex.Color.Transparent);
    ctx.restore();
  }
}
