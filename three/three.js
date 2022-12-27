import * as THREE from "three";
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Sketch {
  constructor(selector) {
    this.scene = new THREE.Scene();
    // this.scene.background = "white";
    this.container = selector;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    const SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

    let container, stats;
    let camera, scene, renderer;

    let particles, count = 0;

    let mouseX = 0, mouseY = 0;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    // const pointLight = new THREE.PointLight(0xffffff, 1.2);
    // pointLight.position.x = -20;
    // pointLight.position.y = 20;
    // pointLight.position.z = 20;
    // this.scene.add(pointLight);

    this.camera.position.set(-2, 8, 5);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // my code
    const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
    // Materials
    const material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(0xff0000);
    this.sphere = new THREE.Mesh(geometry, material);

    // setup XXXXXX
    const numParticles = (50 * 50);

    // this.addDog();
    this.resize();
    this.render();
    this.setupResize();
  }

  init() {

  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  render() {

    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}
