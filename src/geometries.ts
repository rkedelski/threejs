import * as THREE from "three";

export class Geometries {
  public addCircle(scene: THREE.Scene): void {
    const geometry = new THREE.CircleGeometry(2, 32);
    // const wireFrameGeometry = new THREE.WireframeGeometry(geometry); // it doesnt work
    const material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true});
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  }
}