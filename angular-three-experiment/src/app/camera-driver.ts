import {Vector2, Vector3} from 'three';

export class CameraDriver {
  cameraTarget = new Vector3(0, 0, 0);

  cameraPhi = -Math.PI / 2;
  cameraTheta = 0;
  cameraDistance = 1;

  cameraPhiStart: number;
  cameraThetaStart: number;

  cameraTranslationStart: Vector3;
  cameraHorizontalDirection: Vector3;
  cameraVerticalDirection: Vector3;

  get cameraPosition() {
    const position = new Vector3(
      -Math.cos(this.cameraPhi) * Math.cos(this.cameraTheta) * this.cameraDistance,
      -Math.sin(this.cameraTheta) * this.cameraDistance,
      Math.sin(this.cameraPhi) * Math.cos(this.cameraTheta) * this.cameraDistance
    ).add(this.cameraTarget);
    return position;
  }

  handleManipulationBegin() {
    this.cameraPhiStart = this.cameraPhi;
    this.cameraThetaStart = this.cameraTheta;
    this.cameraTranslationStart = this.cameraTarget;

    this.cameraHorizontalDirection = new Vector3(
      -Math.cos(this.cameraPhi + Math.PI / 2),
      0,
      Math.sin(this.cameraPhi + Math.PI / 2)
    );
    this.cameraVerticalDirection = new Vector3(
      -Math.cos(this.cameraPhi) * Math.cos(this.cameraTheta + Math.PI / 2),
      -Math.sin(this.cameraTheta + Math.PI / 2),
      Math.sin(this.cameraPhi) * Math.cos(this.cameraTheta + Math.PI / 2)
    );
  }

  handleRotationUpdate(position: Vector2) {
    this.cameraPhi = this.cameraPhiStart + position.x * 10;
    this.cameraTheta = this.cameraThetaStart + position.y * 10;
  }

  handleTranslationUpdate(position: Vector2) {
    const horizontalTranslation = this.cameraHorizontalDirection.clone().multiplyScalar(position.x * 3);
    const verticalTranslation = this.cameraVerticalDirection.clone().multiplyScalar(position.y * 3);
    this.cameraTarget = this.cameraTranslationStart.clone()
      .add(horizontalTranslation)
      .add(verticalTranslation);
  }

  handleManipulationEnd() {
    this.cameraPhiStart = null;
    this.cameraThetaStart = null;
    this.cameraTranslationStart = null;
  }
}
