import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-laptop-map',
  templateUrl: './laptop-map.component.html',
  styleUrls: ['./laptop-map.component.scss']
})
export class LaptopMapComponent implements OnInit {
  textureLoader!: THREE.TextureLoader;
  oldX: any = window.innerWidth / 2;
  oldY: any = window.innerHeight / 2;
  enableMouseInteractions: boolean = true;
  mac!: THREE.Group<THREE.Object3DEventMap>;
  elementRef: any;


  constructor() { }
  @Input() public containerElement: any;
  @Input() public mapConfig: any;

  public isMobile: boolean = false;
  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public renderer!: THREE.WebGLRenderer;
  public width = window.innerWidth;
  public height = window.innerHeight;


  ngOnInit(): void {
    this.addRenderer();
    this.addCamera();
    this.addAmbientLight();
    this.loadModel();
    this.render();
    this.addMouseListener();
  }

  addRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.elementRef = document.getElementById(this.containerElement) || window as any;
    this.width = this.elementRef.clientWidth;
    this.height = this.elementRef.clientHeight;
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.renderer.setClearColor(0x000000);
    this.elementRef?.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();
  }
  addCamera() {
    this.camera = new THREE.PerspectiveCamera(
      this.isMobile ? 140 : 80,
      this.width / this.height,
      0.001,
      1000
    );
    this.camera.position.set(0, 0, 2.4);
  }
  addAmbientLight() {
    const ambient = new THREE.AmbientLight(0xcccccc, 4);
    this.scene.add(ambient);
  }

  render() {
    //renderMethod
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
  loadModel() {
    const loader = new GLTFLoader();
    this.textureLoader = new THREE.TextureLoader();
    loader.load('assets/three/imac/scene.gltf', (model) => {
      const modelScale = 0.032;
      model.scene.position.y = -1.6;
      model.scene.rotation.y = -Math.PI / 2 + (Math.random() * 0.1);
      model.scene.rotation.x = Math.PI / 36;
      const texture = this.textureLoader.load(this.mapConfig.imgUrl);
      texture.repeat.x = this.mapConfig.repeat.x;
      texture.repeat.y = this.mapConfig.repeat.y;
      model.scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material.map = texture;
          child.material.map.needsUpdate = true;
        }
      })
      model.scene.scale.set(modelScale, modelScale, modelScale);
      this.mac = model.scene;
      this.scene.add(model.scene);
    });
  }

  addMouseListener() {
    window.addEventListener('mousemove', (e) => {

      if (!this.enableMouseInteractions) return;
      let changeX = e.clientX - this.oldX,
        changeY = e.clientY - this.oldY;
      this.mac.rotation.y += this.mapConfig.inverse * changeX / 10000;

      this.mac.rotation.x += changeY / 10000;
      this.oldX = e.clientX;
      this.oldY = e.clientY;
    });

    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.width = this.elementRef.innerWidth;
    this.height = this.elementRef.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.render(this.scene, this.camera);
  }
}
