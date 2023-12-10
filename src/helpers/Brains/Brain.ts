import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { HelperService } from "src/app/helper.service";
import { from, of } from "rxjs";
import { concatMap, delay } from "rxjs/operators";

export class Wireframe {

  htmlElement: any;
  wireframeData: any;
  renderer: any;
  scene!: THREE.Scene;
  width: any = 0;
  height: any = 0;
  camera!: THREE.PerspectiveCamera;
  controls: any;
  curves: any;
  time = 0;
  matArr: THREE.ShaderMaterial[] = [];
  brainCurves: any[] = [];
  gArr: any = [];
  oldX: any = window.innerWidth / 2;
  oldY: any = window.innerHeight / 2;
  brainGroup: any = new THREE.Group();
  appService: HelperService;
  constructor(htmlElement: any, wireframeData: any, appService: HelperService) {
    this.htmlElement = htmlElement;
    this.wireframeData = wireframeData;
    this.appService = appService;
    this.addRenderer();
    this.addCamera();
    this.render();
    this.addAmbientLight();
    this.data();
    this.addEventListener();
    appService.isLightTheme.subscribe(isLight => {
      if (isLight) {

        from(this.matArr)
          .pipe(concatMap(val => of(val).pipe(delay(50))))
          .subscribe(e => e.uniforms.color.value = new THREE.Color(0.4, 0.7, 0.3))
      } else {

        from(this.matArr)
          .pipe(concatMap(val => of(val).pipe(delay(50))))
          .subscribe(e => e.uniforms.color.value = new THREE.Color(0.1, 0.3, 0.6));
      }
    })
    // this.createTube();
    this.createTubes();
    // this.createBrain();

  }

  addRenderer() {
    this.width = this.htmlElement.clientWidth;
    this.height = this.htmlElement.clientHeight || 780;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    if (this.appService.isMobile) {
      this.height = this.width;
    }
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
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
    this.camera.position.set(0, 0.01, 0.36);
    this.camera.rotation.x = -0.3;
    this.camera.rotation.y = this.appService.isMobile ? 0 : 0.3;
    (window as any).c = this.camera.rotation;
    // this.addOrbitControls();
    // this.controls.update();
  }
  addOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  render() {
    this.time += 0.01;

    if (this.matArr.length) this.matArr.forEach(e => e.uniforms.time.value = this.time);
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);

  }


  addAmbientLight() {
    const ambient = new THREE.AmbientLight(0x555555, 16);
    this.scene.add(ambient);
  }

  addBox() {
    const g = new THREE.BoxGeometry(1, 1);
    const m = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide, });
    const mesh = new THREE.Mesh(g, m);
    this.scene.add(mesh);
  }

  data() {


    this.brainCurves = [];
    this.wireframeData.forEach((paths: any) => {
      let points = [];
      for (let i = 0; i < paths.length; i += 3) {
        points.push(new THREE.Vector3(paths[i], paths[i + 1], paths[i + 2]));
      }
      const tempCurve = new THREE.CatmullRomCurve3(points);
      this.brainCurves.push(tempCurve);
    })
  }



  createTubes() {
    this.brainCurves
      // .slice(0, 1)
      .forEach((curve: any) => {
        this.createTube(curve);
      });
    this.scene.add(this.brainGroup);
    this.gArr.forEach((e: any) => {
      gsap.to(e.position, {
        z: 0,
        duration: 2,
        ease: 'power4.easeIn'
      });
      gsap.to(e.rotation, {
        y: 0,
        duration: 2.4,
        ease: 'power3.easeIn'
      })
    }
    )


  }
  createTube(curve: any) {

    let g = new THREE.TubeGeometry(curve, 32, 0.001, 3, false);
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0.1, 0.3, 0.6) },
      },
      // vertex shader
      /*glsl*/
      vertexShader: `
            varying vec2 vUv;
            varying float vProgress;
            uniform float time;
            void main() {
                vUv = uv;
                vProgress = smoothstep(-1.,1.,sin(vUv.x * 8. + time * 2.));
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
            `,
      // fragment shader
      /*glsl*/
      fragmentShader: `
            uniform float time;
            uniform vec3 color;
            varying vec2 vUv;
            varying float vProgress;

            void main() {
              vec3 finalColor = mix(color, color * 0.25, vProgress);
              float hideCorner1 = smoothstep(0.,0.1, vUv.x);
              float hideCorner2 = smoothstep(1.,.9, vUv.x);
                gl_FragColor.rgba = vec4(finalColor,.8);
            }
            `
    }
    );
    this.matArr.push(mat);
    const mesh = new THREE.Mesh(g, mat);
    mesh.position.z = 0.2;
    mesh.rotation.y = -Math.PI;
    this.gArr.push(mesh);
    this.brainGroup.add(mesh);

  }

  randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

  addEventListener() {
    window.addEventListener('mousemove', (e) => {

      let changeX = e.clientX - this.oldX,
        changeY = e.clientY - this.oldY;
      this.brainGroup.rotation.y += -changeX / 10000;

      this.brainGroup.rotation.x += -changeY / 10000;

      this.oldX = e.clientX;
      this.oldY = e.clientY;
    });
  }
}