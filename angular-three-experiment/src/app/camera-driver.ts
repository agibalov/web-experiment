import {Camera, Vector2, Vector3} from 'three';

export class CameraDriver {
  cameraTarget = new Vector3(0, 0, 0);

  private cameraPhi = -Math.PI / 2;
  private cameraTheta = 0;
  private cameraDistance = 1;

  manipulation: Manipulation = null;

  get cameraPosition() {
    const position = new Vector3(
      -Math.cos(this.cameraPhi) * Math.cos(this.cameraTheta) * this.cameraDistance,
      -Math.sin(this.cameraTheta) * this.cameraDistance,
      Math.sin(this.cameraPhi) * Math.cos(this.cameraTheta) * this.cameraDistance
    ).add(this.cameraTarget);
    return position;
  }

  handleManipulationBegin(camera: Camera) {
    const xAxis = new Vector3();
    const yAxis = new Vector3();
    const zAxis = new Vector3();
    camera.matrixWorld.extractBasis(xAxis, yAxis, zAxis);

    this.manipulation = {
      cameraPhiStart: this.cameraPhi,
      cameraThetaStart: this.cameraTheta,
      cameraTranslationStart: this.cameraTarget,
      cameraHorizontalDirection: xAxis.normalize(),
      cameraVerticalDirection: yAxis.negate().normalize()
    };
  }

  handleRotationUpdate(position: Vector2) {
    this.cameraPhi = this.manipulation.cameraPhiStart + position.x * 10;
    this.cameraTheta = this.manipulation.cameraThetaStart + position.y * 10;
  }

  handleTranslationUpdate(position: Vector2) {
    const horizontalTranslation = this.manipulation.cameraHorizontalDirection.clone().multiplyScalar(position.x * 3);
    const verticalTranslation = this.manipulation.cameraVerticalDirection.clone().multiplyScalar(position.y * 3);
    this.cameraTarget = this.manipulation.cameraTranslationStart.clone()
      .add(horizontalTranslation)
      .add(verticalTranslation);
  }

  handleManipulationEnd() {
    this.manipulation = null;
  }
}

interface Manipulation {
  cameraPhiStart: number;
  cameraThetaStart: number;
  cameraTranslationStart: Vector3;
  cameraHorizontalDirection: Vector3;
  cameraVerticalDirection: Vector3;
}
