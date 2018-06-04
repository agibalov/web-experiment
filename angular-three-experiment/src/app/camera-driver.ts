import {Camera, Vector2, Vector3} from 'three';

export class CameraDriver {
  cameraTarget = new Vector3(0, 0, 0);

  private cameraPhi = -Math.PI / 4;
  private cameraTheta = -Math.PI / 8;
  private cameraDistance = 1;
  private manipulation: Manipulation = null;

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
      phiStart: this.cameraPhi,
      thetaStart: this.cameraTheta,
      translationStart: this.cameraTarget,
      horizontalAxis: xAxis.normalize(),
      verticalAxis: yAxis.normalize(),
      depthicalAxis: zAxis.normalize()
    };
  }

  handleRotationUpdate(position: Vector2) {
    this.cameraPhi = this.manipulation.phiStart + position.x * 10;
    this.cameraTheta = this.manipulation.thetaStart + position.y * 10;
  }

  handleTranslationUpdate(position: Vector2) {
    const horizontalTranslation = this.manipulation.horizontalAxis.clone().multiplyScalar(position.x * 3);
    const verticalTranslation = this.manipulation.verticalAxis.clone().multiplyScalar(-position.y * 3);
    this.cameraTarget = this.manipulation.translationStart.clone()
      .add(horizontalTranslation)
      .add(verticalTranslation);
  }

  handleZoomUpdate(zoom: number) {
    const translation = this.manipulation.depthicalAxis.clone().multiplyScalar(zoom * 0.1);
    this.cameraTarget = this.manipulation.translationStart.clone()
      .add(translation);
  }

  handleManipulationEnd() {
    this.manipulation = null;
  }
}

interface Manipulation {
  phiStart: number;
  thetaStart: number;
  translationStart: Vector3;
  horizontalAxis: Vector3;
  verticalAxis: Vector3;
  depthicalAxis: Vector3;
}
