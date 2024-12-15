import * as ex from "excalibur";

interface ParticleSystemProps {
  x?: number;
  y?: number;
  r?: number;
  accX?: number;
  accY?: number;
  minV?: number;
  maxV?: number;
  minA?: number;
  maxA?: number;
  shape?: ex.EmitterType;
  emitting?: boolean;
  emitRate?: number;
  opacity?: number;
  fade?: boolean;
  life?: number;
  minSize?: number;
  maxSize?: number;
  startSize?: number;
  endSize?: number;
  startColor?: ex.Color;
  endColor?: ex.Color;
  focusAcc?: number;
}

export class ParticleSystem {
  actor: ex.Actor;
  emitter: ex.ParticleEmitter;

  constructor({
    x,
    y,
    r,
    accX,
    accY,
    minV,
    maxV,
    minA,
    maxA,
    shape,
    emitting,
    emitRate,
    opacity,
    fade,
    life,
    minSize,
    maxSize,
    startSize,
    endSize,
    startColor,
    endColor,
    focusAcc,
  }: ParticleSystemProps) {
    this.actor = new ex.Actor({
      x: x,
      y: y,
      width: 10,
      height: 10,
    });
    this.emitter = new ex.ParticleEmitter({
      x: x,
      y: y,
      radius: r,
      emitterType: shape || ex.EmitterType.Circle,
      minVel: minV || 100,
      maxVel: maxV || 200,
      minAngle: minA || 0,
      maxAngle: maxA || Math.PI * 2,
      isEmitting: emitting || true,
      emitRate: emitRate || 100,
      opacity: opacity || 0.5,
      fadeFlag: fade || true,
      particleLife: life || 1000,
      minSize: minSize || 5,
      maxSize: maxSize || 10,
      startSize: startSize || 10,
      endSize: endSize || 5,
      acceleration: new ex.Vector(accX || 0, accY || 0),
      beginColor: startColor || ex.Color.Red,
      endColor: endColor || ex.Color.Yellow,
      focusAccel: focusAcc || 800,
    });
    this.actor.addChild(this.emitter);
  }

  public update() { }

  public turnOn() {
    this.emitter.isEmitting = true;
  }
  public turnOff() {
    this.emitter.isEmitting = false;
  }
}
