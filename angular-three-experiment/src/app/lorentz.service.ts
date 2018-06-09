import {Vector3} from 'three';

export class LorentzService {
  private readonly particleMass = 9.1e-31;
  private readonly particleCharge = 1.6e-19;
  private readonly minSubSampleTimeChange = 1e-4;

  private _electricField: Vector3 = new Vector3(1e-7, 0, 0);
  private _magneticField: Vector3 = new Vector3(1e-10, 0, 0);
  private _startVelocity: Vector3 = new Vector3(0, 3e5, 0);
  private _startPosition: Vector3 = new Vector3(0, 0, 0);
  private _numberOfSamples = 500;
  private _timeOfFlight = 5;
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

  set numberOfSamples(value: number) {
    if (this._numberOfSamples !== value) {
      this._numberOfSamples = value;
      this._shouldRecalculate = true;
    }
  }

  get numberOfSamples(): number {
    return this._numberOfSamples;
  }

  set timeOfFlight(value: number) {
    if (this._timeOfFlight !== value) {
      this._timeOfFlight = value;
      this._shouldRecalculate = true;
    }
  }

  get timeOfFlight(): number {
    return this._timeOfFlight;
  }

  get trajectory(): Sample[] {
    if (this._shouldRecalculate) {
      this._shouldRecalculate = false;

      const timeChangePerSample = this.timeOfFlight / this.numberOfSamples;
      const timeChangePerSubSample = Math.min(timeChangePerSample, this.minSubSampleTimeChange);
      const numberOfSubSamples = Math.floor(timeChangePerSample / timeChangePerSubSample);
      const samples: Sample[] = [];

      let velocity = this.startVelocity.clone();
      let position = this.startPosition.clone();
      for (let sampleIndex = 0; sampleIndex < this.numberOfSamples; ++sampleIndex) {
        for (let subSampleIndex = 0; subSampleIndex < numberOfSubSamples; ++subSampleIndex) {
          const time = (sampleIndex * numberOfSubSamples + subSampleIndex) * timeChangePerSubSample;
          const electricForce = this.electricField.clone().multiplyScalar(this.particleCharge);
          const magneticForce = velocity.clone().cross(this.magneticField).multiplyScalar(this.particleCharge);
          const lorentzForce = electricForce.clone().add(magneticForce);

          const acceleration = lorentzForce.divideScalar(this.particleMass);

          if (subSampleIndex === 0) {
            const sample = new Sample(
              time,
              position.clone(),
              velocity.clone(),
              acceleration.clone(),
              electricForce.clone(),
              magneticForce.clone(),
              lorentzForce.clone());
            samples.push(sample);
          }

          velocity = velocity.clone().add(acceleration.clone().multiplyScalar(timeChangePerSubSample));
          position = position.clone().add(velocity.clone().multiplyScalar(timeChangePerSubSample));
        }
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
