import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


export class Wireframe{

    htmlElement: any ;
    wireframeData: any;
    renderer: any;
    scene!: THREE.Scene;
    width: any = 800;
    height: any= 450;
    camera!: THREE.PerspectiveCamera;
    controls: any;
    constructor(htmlElement: any, wireframeData: any){
        this.htmlElement = htmlElement;
        this.wireframeData = wireframeData;
        this.addRenderer();
        this.addCamera();
        this.render();  
        this.addAmbientLight();
        this.addBox();

    }

    addRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0xffffff, 1);
        this.htmlElement.appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
      }
      addCamera() {
        this.camera = new THREE.PerspectiveCamera(
          70,
          this.width / this.height,
          0.001,
          5000
        );
        this.addOrbitControls();
        this.camera.position.set(0, 0, 10);
        this.controls.update();
      }
      addOrbitControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      }

      render(){

        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);

      }


  addAmbientLight() {
    const ambient = new THREE.AmbientLight(0x555555, 16);
    this.scene.add(ambient);
  }

      addBox(){
        const g = new THREE.BoxGeometry(1,1);
        const m = new THREE.MeshNormalMaterial({ side : THREE.DoubleSide, });
        const mesh = new THREE.Mesh(g,m);
        this.scene.add(mesh);
      }
      
}