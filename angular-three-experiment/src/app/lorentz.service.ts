import {Vector3} from 'three';

export class LorentzService {
  private _electricField: Vector3 = new Vector3(1e-7, 0, 0);
  private _magneticField: Vector3 = new Vector3(1e-10, 0, 0);
  private _startVelocity: Vector3 = new Vector3(0, 3e5, 0);
  private _startPosition: Vector3 = new Vector3(0, 0, 0);
  private _samples: Sample[];
  private _shouldRecalculate = true;

  set electricField(value: Vector3) {
    if (this._electricField !== value) {
      this._electricField = value;
      this._shouldRecalculate = true;
    }
  }

  get electricField(): Vector3 {
    return this._electricField;
  }

  set magneticField(value: Vector3) {
    if (this._magneticField !== value) {
      this._magneticField = value;
      this._shouldRecalculate = true;
    }
  }

  get magneticField(): Vector3 {
    return this._magneticField;
  }

  set startVelocity(value: Vector3) {
    if (this._startVelocity !== value) {
      this._startVelocity = value;
      this._shouldRecalculate = true;
    }
  }

  get startVelocity(): Vector3 {
    return this._startVelocity;
  }

  set startPosition(value: Vector3) {
    if (this._startPosition !== value) {
      this._startPosition = value;
      this._shouldRecalculate = true;
    }
  }

  get startPosition(): Vector3 {
    return this._startPosition;
  }

  get trajectory(): Sample[] {
    if (this._shouldRecalculate) {
      this._shouldRecalculate = false;

      const particleMass = 9.1e-31;
      const particleCharge = 1.6e-19;
      const startTime = 0;
      const stopTime = 5;
      const timeStep = 1e-4;

      const samples: Sample[] = [];

      let velocity = this.startVelocity.clone();
      let position = this.startPosition.clone();
      for (let time = startTime; time < stopTime; time += timeStep) {
        const electricForce = this.electricField.clone().multiplyScalar(particleCharge);
        const magneticForce = velocity.clone().cross(this.magneticField).multiplyScalar(particleCharge);
        const lorentzForce = electricForce.clone().add(magneticForce);

        const acceleration = lorentzForce.divideScalar(particleMass);

        const sample = new Sample(
          time,
          position.clone().multiplyScalar(1e-5),
          velocity.clone(),
          acceleration.clone(),
          electricForce.clone(),
          magneticForce.clone(),
          lorentzForce.clone());
        samples.push(sample);

        velocity = velocity.clone().add(acceleration.clone().multiplyScalar(timeStep));
        position = position.clone().add(velocity.clone().multiplyScalar(timeStep));
      }

      this._samples = samples;
    }

    return this._samples;
  }
}

export class Sample {
  constructor(
    public timestamp: number,
    public position: Vector3,
    public velocity: Vector3,
    public acceleration: Vector3,
    public electricForce: Vector3,
    public magneticForce: Vector3,
    public lorentzForce: Vector3) {
  }
}
