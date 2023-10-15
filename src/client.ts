import * as THREE from "three";
import { GUI } from "dat.gui";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Geometries } from "./geometries";

const geometries = new Geometries();

const stats = new Stats();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
let axesHelper = undefined;

document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

camera.position.z = 2;
renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
renderer.render(scene, camera);

addWireFrameBox(0.5, 0.5, 0.5, false);
// addMeshWireFrameBox(0.5, 0.5, 0.5);

const light = new THREE.SpotLight();
light.position.set(3, 3, 3);
// scene.add(light);
// scene.add(new THREE.AxesHelper());

geometries.addCircle(scene);

const spotLightHelper = new THREE.SpotLightHelper(light);
// scene.add(spotLightHelper);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth - 20 / window.innerHeight - 20;
  renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  stats.update();
}

function addWireFrameBox(x: number, y: number, z: number, edgeGeometry: boolean) {
  const boxGeometry = new THREE.BoxGeometry(x, y, z);
  var geometry = edgeGeometry ? new THREE.EdgesGeometry(boxGeometry) : new THREE.WireframeGeometry(boxGeometry);
  var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
  var wireframe = new THREE.LineSegments(geometry, material);
  scene.add(wireframe);
}

function addMeshWireFrameBox(x: number, y: number, z: number) {
  const boxGeometry = new THREE.BoxGeometry(x, y, z);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });
  const cube = new THREE.Mesh(boxGeometry, material);
  scene.add(cube);
}

const uiState = {
  showStats: true,
  showSpotLightHelper: true,
  axesHelper: 0,
};

function showStatisctics() {
  if (uiState.showStats == false) {
    if (document.body.getElementsByTagName(stats.dom.tagName) !== undefined) {
      document.body.removeChild(stats.dom);
    }
  } else {
    document.body.appendChild(stats.dom);
  }
}

function showSpotLightHelper() {
  if (uiState.showSpotLightHelper) {
    scene.add(spotLightHelper);
  } else {
    scene.remove(spotLightHelper);
  }
}

function showAxesHelper() {
  if (axesHelper !== undefined) {
    scene.remove(axesHelper);
  }
  if (uiState.axesHelper > 0) {
    scene.add((axesHelper = new THREE.AxesHelper(uiState.axesHelper)));
  }
}

function createUI() {
  showStatisctics();
  showSpotLightHelper();

  const gui = new GUI();
  const ui = gui.addFolder("UI");
  ui.add(uiState, "showStats").onChange(() => {
    showStatisctics();
  });
  ui.add(uiState, "showSpotLightHelper").onChange(() => {
    showSpotLightHelper();
  });
  ui.add(uiState, "axesHelper", 0, 2).onChange(() => {
    showAxesHelper();
  });
}

createUI();
animate();
