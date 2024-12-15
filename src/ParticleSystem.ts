import * as ex from "excalibur";

interface ParticleSystemProps {
  x?: number;
  y?: number;
  accelX?: number;
  accelY?: number;
}

export class ParticleSystem {
  actor: ex.Actor;
  emitter: ex.ParticleEmitter;

  constructor({ x, y, accelX, accelY }: ParticleSystemProps) {
    this.actor = new ex.Actor({
      x: x,
      y: y,
      width: 10,
      height: 10,
    });
    this.emitter = new ex.ParticleEmitter({
      x: x,
      y: y,
      radius: 5,
      emitterType: ex.EmitterType.Circle,
      minVel: 100,
      maxVel: 200,
      minAngle: 0,
      maxAngle: Math.PI * 2,
      isEmitting: true,
      emitRate: 300,
      opacity: 0.5,
      fadeFlag: true,
      particleLife: 1000,
      minSize: 1,
      maxSize: 10,
      startSize: 10,
      endSize: 1,
      acceleration: new ex.Vector(accelX || 0, accelY || 0),
      beginColor: ex.Color.Red,
      endColor: ex.Color.Blue,
      focusAccel: 800,
    });

    this.actor.addChild(this.emitter);
  }

  public updatePosition(x: number, y: number) {
    this.actor.pos = new ex.Vector(x, y);
    this.emitter.pos = new ex.Vector(x, y);
  }
}
