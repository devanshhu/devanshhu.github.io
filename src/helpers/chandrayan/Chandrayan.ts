// import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Rocket } from './Rocket';
import gsap from 'gsap';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
// import { VertexShader } from './vParticleFlower.glsl';
// import { FragmentShader } from './fParticleFlower.glsl';

export class Chandrayan {
  public scene!: THREE.Scene;
  public camera!: THREE.PerspectiveCamera;
  public renderer!: THREE.WebGLRenderer;
  public width = window.innerWidth;
  public height = window.innerHeight;
  public settings: any;
  public controls!: OrbitControls;
  // public gui!: dat.GUI;
  public time = 0;
  public isPlaying = true;
  public geometry!: THREE.SphereGeometry;
  material!: THREE.Material;
  planet!: THREE.Mesh<THREE.SphereGeometry, THREE.Material>;
  point!: THREE.Mesh<THREE.SphereGeometry, any>;
  group!: THREE.Group;
  // textureLoader: GLTFLoader;
  rocket: Rocket;
  showRotation: any = false;
  renderScene!: RenderPass;
  composer!: EffectComposer;
  bloomPass: any;
  smokeGeometry!: THREE.SphereGeometry;
  smokeMaterial!: THREE.MeshLambertMaterial;
  smokeMesh!: THREE.Mesh<THREE.SphereGeometry, THREE.Material>;
  progress: number = 10 * Math.PI;
  group2!: THREE.Group;
  rotatePlanet: any;
  moon!: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  moonGroup!: THREE.Group;
  rotateAroundMoon: boolean = false;
  planetRotationSpeed: number = 0.01;
  enableRocketShake: boolean = false;
  public service: any;

  oldX: any = window.innerWidth / 2;
  oldY: any = window.innerHeight / 2;
  enableMouseInteractions: boolean = true;
  isMobile: boolean = false;
  globeTexture: any = new THREE.TextureLoader().load('assets/three/earth.jpg');

  constructor(serviceInstance: any) {
    this.service = serviceInstance;
    this.isMobile = this.service.isMobile;
    // this.textureLoader = new GLTFLoader();

    this.rocket = new Rocket();

    this.addRenderer();
    this.addCamera();
    this.addSettings();
    // this.addPost();
    this.addOrbitControls();
    this.addAmbientLight();
    this.addPoint();
    this.addBackground();
    this.addEarth();
    this.createGroup();
    this.setupResize();
    this.animateEarthFirst();
    this.addMouseListener();

    setTimeout(() => {
      // this.addAxes();
      this.locatePoint();
      this.setRocket();
      this.addMoon();
    }, 3000);
    this.render();
  }

  addRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000);
    document.getElementById('canvas')?.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();
  }
  addCamera() {
    this.camera = new THREE.PerspectiveCamera(
      this.isMobile ? 140 : 80,
      this.width / this.height,
      0.001,
      1000
    );
  }
  addOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.zoomSpeed = 0.01;
    this.controls.panSpeed = 0.00001;
    this.camera.position.set(0, 0, 10);
    this.controls.update();
  }

  addAxes() {
    const axes = new THREE.AxesHelper(10);
    this.scene.add(axes);
  }

  addSettings() {
    // this.gui = new dat.GUI();
    // this.settings = {
    //   progress: 0,
    // };
    // this.gui.add(this.settings, 'progress', 0, 100, 0.01);
  }
  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.render(this.scene, this.camera);
    // this.composer.setSize(this.width, this.height);
    // this.composer.render();
  }
  render() {
    //renderMethod
    this.renderer.render(this.scene, this.camera);
    // this.composer.render();
    this.time += 1;
    if (this.rotatePlanet) {
      this.planet.rotation.y += this.planetRotationSpeed;
    }
    if (this.enableRocketShake) {
      this.rocket.shake(this.time);
    }
    if (this.rotateAroundMoon) {
      this.moonGroup.rotation.y -= 0.01;
      this.moonGroup.rotation.x -= 0.0004;
      if (
        this.moonGroup.rotation.x < 0.78 &&
        this.moonGroup.rotation.y < -19.5
      ) {
        this.rotateAroundMoon = false;
        this.phase5();
      }
      //   this.moonGroup.rotation.x = -0.78;
      //   this.moonGroup.rotation.y = -19.0;

      //   console.log(this.moonGroup.rotation.x, this.moonGroup.rotation.y);
    }
    if (this.rocket && this.rocket.mesh && this.showRotation) {
      //   this.rocket.mesh.position.x = 1.5 * Math.cos(this.progress);
      //   this.rocket.mesh.position.z = 1.5 * Math.sin(this.progress);
      if (this.progress > 36.6) {
        this.group2.remove(this.rocket.mesh);
        this.showRotation = false;
        this.rocket.mesh.position.set(-1.3, -0.15, 0.74813);
        this.rocket.mesh.rotation.z = 0.0041;
        this.rocket.mesh.rotation.y = 2;
        this.scene.add(this.rocket.mesh);
        gsap.to(this.camera.position, {
          x: this.rocket.mesh.position.x,
          y: this.rocket.mesh.position.y + 0.05,
          z: this.rocket.mesh.position.z + 0.132,
          delay: 0,
          duration: 1,
          ease: 'power.easein',
        });
        gsap.to(this.camera.rotation, {
          //   x: this.rocket.mesh.rotation.x,
          //   y: this.rocket.mesh.rotation.y,
          z: this.rocket.mesh.rotation.z,
          delay: 2,
          duration: 2,
          ease: 'power.ease',
        });
        // gsap.to(this.rocket.mesh.position, {
        //   z: 2,
        //   delay: 4,
        //   duration: 1,
        // });
        (window as any).r = this.camera.rotation;
        setTimeout(() => {
          this.rotatePlanet = true;
          setTimeout(() => {
            this.increaseRocketBoost();
          }, 2000);
        }, 800);
      }
      this.group2.rotation.y -= 0.02;
      this.progress += 0.01;
      //   console.log(this.progress);
    }

    this.rocket.animateSmoke(this.rotatePlanet);
    // this.camera.position.set(0, 0, 2 + 2 * Math.sin(this.time));
    // if (this.controls) this.controls.update();
    window.requestAnimationFrame(this.render.bind(this));
  }
  addObjects() { }
  setupResize() {
    window.addEventListener('resize', this.resize.bind(this));
  }
  animateEarthFirst() {
    gsap.to(this.group.rotation, {
      y: Math.PI + Math.PI / 8,
      x: Math.PI / 8,
      duration: 3.8,
      ease: 'power4.easeInOut',
    });
    gsap.to(this.camera.position, {
      z: 2,
      x: 0,
      duration: 3.8,
      ease: 'power4.easeInOut',
    });
  }
  addEarth() {
    this.geometry = new THREE.SphereGeometry(1, 32, 32);
    const vertexShader = `
    varying vec3 vNormal;
    uniform sampler2D globeTexture;
    varying vec2 vertexUV;
    void main() 
    {
        vertexUV = uv;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
    `;
    const fragmentShader = `
    uniform sampler2D globeTexture;
    varying vec3 vNormal;
    varying vec2 vertexUV;
    void main() 
    {

        float intensity = pow( 0.7 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 10000.0 ); 
        gl_FragColor = vec4( texture2D(globeTexture, vertexUV).xyz, 1.0 ) * 1.3;
    }
    `;
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        globeTexture: {
          value: this.globeTexture,
        },
      },
      //   map: new THREE.TextureLoader().load('assets/three/earth.jpg'),
    });
    this.planet = new THREE.Mesh(this.geometry, this.material);

    // this.scene.add(this.planet);
  }
  addPoint() {
    this.point = new THREE.Mesh(
      new THREE.SphereGeometry(0.0001, 16, 16),
      new THREE.MeshNormalMaterial({
        opacity: 0,
      })
    );
    this.point.position.set(1, 0, 0);
    // this.scene.add(this.point);
  }
  addAmbientLight() {
    const ambient = new THREE.AmbientLight(0x555555, 24);
    this.scene.add(ambient);
  }

  locatePoint() {
    let lat = (13.729040973251037 * Math.PI) / 180,
      lng = (80.22803593917075 * Math.PI) / 180;
    const y = Math.sin(lng) * Math.sin(lat);
    const z = -Math.cos(lat);
    this.point.position.set(0.17238843865042808, y, z);
  }
  createGroup() {
    this.group = new THREE.Group();
    this.group.add(this.planet, this.point);
    this.scene.add(this.group);
  }

  setRocket() {
    // this.group.rotation.y = Math.PI + Math.PI / 8;
    // this.group.rotation.x = Math.PI / 8;
    // this.textureLoader.load("assets/three/models/rocket/scene.gltf", (model) => {
    //   const mesh = model.scene;
    //   mesh.scale.set(0.005, 0.005, 0.005);
    //   mesh.position.set(0, 0, 1);
    //   mesh.rotation.x = Math.PI / 2;
    //   mesh.rotation.z = -Math.PI / 6;
    //   // mesh.position.z = 0.8;
    //   this.scene.add(mesh);
    // })
    this.rocket.mesh.scale.set(0.0001, 0.0001, 0.0001);
    // rotation y = 0.04 & z = pi/2 for rotating rocket
    // this.rocket.mesh.rotation.y = 0.04;
    // this.rocket.mesh.rotation.z = Math.PI / 2;
    this.rocket.mesh.rotation.z = Math.PI;
    this.rocket.mesh.position.z = 0.8;
    this.rocket.mesh.position.x = this.point.position.x + 0.06;
    this.rocket.mesh.position.y = -0.15;

    this.scene.add(this.rocket.mesh);
    gsap.to(this.rocket.mesh.position, {
      z: 1.5,
      duration: 3,
      ease: 'power.ease',
      delay: 1,
    });

    gsap.to(this.rocket.mesh.position, {
      x: this.point.position.x - 0.01,
      duration: 2,
      ease: 'power.ease',
      delay: 3,
    });
    gsap.to(this.rocket.mesh.rotation, {
      z: Math.PI / 2,
      duration: 2,
      delay: 3,
      ease: 'power2.ease',
    });
    setTimeout(() => {
      this.progress = 10 * Math.PI + Math.PI / 2 - 0.1;
      this.showRotation = true;

      //   this.camera.position.z = this.rocket.mesh.position.z + 0.1;
      //   this.camera.rotation.x = -2 * Math.PI;
      //   this.controls.update();
      setTimeout(() => {
        this.service.stateChange.next(
          'July 15: Orbit Maneuver To Raise The Spacecraft Into 41762 KM x 173 KM Orbit '
        );
      }, 2000);
      this.addTransparentSphere();
      //   this.group2.add(this.camera);
    }, 4900);
  }
  //   addSmokeToRocket() {
  //     var scale = 0.01 + Math.random() * 0.001;
  //     var nLines = 3 + Math.floor(Math.random() * 5);
  //     var nRows = 3 + Math.floor(Math.random() * 5);
  //     this.smokeGeometry = new THREE.SphereGeometry(scale, nLines, nRows);

  //     this.smokeMaterial = new THREE.MeshLambertMaterial({
  //       color: 0xffe3e3,
  //       //   shading: FlatShading,
  //       //   wireframe: true,
  //       //   transparent: true,
  //     });

  //     this.smokeMesh = new THREE.Mesh(this.smokeGeometry, this.smokeMaterial);
  //     this.smokeMesh.position.z = 1.5;
  //     this.scene.add(this.smokeMesh);
  //   }

  addTransparentSphere() {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 0, 0),
      new THREE.MeshLambertMaterial({
        wireframe: true,
        transparent: true,
        opacity: 0,
        color: 0x000000,
      })
    );
    // this.scene.add(sphere);
    this.group2 = new THREE.Group();
    this.group2.add(sphere);
    this.group2.add(this.rocket.mesh);
    this.scene.add(this.group2);
  }

  addPost() {
    this.renderScene = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    this.bloomPass.threshold = 0;
    this.bloomPass.strength = 0.01;
    this.bloomPass.radius = 0;
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(this.renderScene);
    this.composer.addPass(this.bloomPass);
    this.composer.setSize(this.width, this.height);
  }

  increaseRocketBoost() {
    this.service.stateChange.next(
      "August 1: Enters The Translunar Orbit To Start It's Journey To The Moon "
    );
    this.rocket.changeFlameColor();
    gsap.to(this.rocket.mesh.position.z, {
      z: this.rocket.mesh.position.z - 0.06,
      duration: 0.1,
      ease: 'power4.in',
    });
    gsap.to(this.camera.position, {
      z: this.camera.position.z + 0.01,
      duration: 1,
    });

    gsap.to(this.rocket.mesh.position, {
      x: this.rocket.mesh.position.x - 1,
      z: this.rocket.mesh.position.z - 1,
      duration: 4,
      delay: 1,
    });
    gsap.to(this.camera.position, {
      x: this.camera.position.x - 1,
      z: this.camera.position.z - 1,
      duration: 4,
      delay: 1,
    });
    setTimeout(() => {
      gsap.to(this.camera.position, {
        z: this.camera.position.z - 0.03,
        duration: 1,
      });
      gsap.to(this.rocket.mesh.position, {
        z: -10,
        duration: 6,
        ease: 'power4.easeIn',
      });
      gsap.to(this.camera.position, {
        z: -8.0,
        duration: 6,
        delay: 0.5,
        ease: 'power4.easeOut',
      });
      gsap.to(this.moon.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 4,
        delay: 1,
        ease: 'power4.easeOut',
      });
      gsap.to(this.moon.position, {
        x: -1.2,
        duration: 2,
        delay: 1,
        ease: 'power4.easeOut',
      });
      setTimeout(() => {
        this.service.stateChange.next(
          'August 5: Enters The 164 KM x 18074 KM Lunar Orbit '
        );
      }, 3000);
      setTimeout(() => {
        this.phase4();
      }, 6000);
    }, 5000);
  }
  addBackground() {
    for (let i = 0; i < 400; i++) {
      const star = new THREE.Mesh(
        new THREE.SphereGeometry(0.02, 1, 1),
        new THREE.PointsMaterial({ color: 0xffffff })
      );
      star.position.set(
        -40 + Math.random() * 80,
        -30 + Math.random() * 60,
        -16 + Math.random() * 3
      );
      this.scene.add(star);
    }
    // const spG = new THREE.SphereGeometry(14);
    // const spM = new THREE.PointsMaterial({
    //   color: 0xffffff,
    //   size: 0.05,
    // });
    // const sphere = new THREE.Points(spG, spM);
    // sphere.position.set(0, 0, -5);
    // this.scene.add(sphere);
  }
  addMoon() {
    const moonGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const moonMat = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('assets/three/moon.jpeg'),
    });
    this.moon = new THREE.Mesh(moonGeo, moonMat);
    this.moon.position.set(-2.2, 0, -10);
    this.moon.scale.set(0.09, 0.09, 0.09);
    this.scene.add(this.moon);
  }

  phase4() {
    gsap.to(this.camera.rotation, {
      y: -0.4,
      duration: 2,
      //   delay: 4,
    });
    gsap.to(this.camera.position, {
      z: this.camera.position.z + 0.3,
      duration: 2,
      //   delay: 1,
    });
    gsap.to(this.rocket.mesh.position, {
      x: this.rocket.mesh.position.x + 0.4,
      duration: 1,
      delay: 1,
    });
    setTimeout(() => {
      this.addToMoonGroup();
    }, 3000);
    // setTimeout(() => {
    //   this.service.stateChange.next(
    //     'August 6: The orbit is lowered to 174 km x 1437 km '
    //   );
    // }, 4000);
    setTimeout(() => {
      this.service.stateChange.next(
        'August 18: The Orbit Is Lowered To 113 KM x 157 KM '
      );
    }, 14000);
    setTimeout(() => {
      this.service.stateChange.next(
        'August 20: The Orbit Is Lowered To 25 KM x 134 KM '
      );
    }, 25000);
  }
  addToMoonGroup() {
    this.moonGroup = new THREE.Group();
    this.moonGroup.position.copy(this.moon.position);
    this.moonGroup.add(this.rocket.mesh);
    this.rocket.mesh.scale.set(0.0008, 0.0008, 0.0008);
    this.moonGroup.scale.set(0.2, 0.2, 0.2);
    // this.scene.remove(this.rocket.mesh);
    this.scene.add(this.moonGroup);
    this.rotateAroundMoon = true;
    this.rocket.mesh.rotation.set(Math.PI / 2, Math.PI, Math.PI / 2);
  }

  phase5() {
    this.planetRotationSpeed = 0.004;
    (window as any).p = this.camera.position;
    (window as any).a = this.rocket.mesh;
    gsap.to(this.camera.position, {
      x: -0.30077961798344577,
      y: -1.3061880047447605,
      z: -11.293482595560787,
      duration: 2,
      delay: 0.8,
      ease: 'power2.in',
    });
    gsap.to(this.camera.rotation, {
      x: 3.0264457051215685,
      y: -0.026450489729555774,
      z: 3.138533794119551,
      duration: 3,
      delay: 2,
      ease: 'power2.out',
    });
    gsap.to(this.rocket.mesh.scale, {
      x: 0.0001,
      y: 0.0001,
      z: 0.0001,
      duration: 2,
      delay: 0.8,
      ease: 'power2.in',
    });
    gsap.to(this.rocket.mesh.rotation, {
      x: 1.4707963267948965,
      y: 2.941592653589793,
      z: 0.5707963267948962,
      duration: 2,
      delay: 0.8,
      ease: 'power2.in',
    });

    this.enableRocketShake = true;
    setTimeout(() => {
      //   this.controls.update();
      this.phase6();
    }, 4500);
  }

  phase6() {
    // setTimeout(() => {
    // }, 0);

    this.service.stateChange.next(
      "August 23: Chandrayaan III Will Start It's Journey To The Lunar Surface "
    );
    gsap.to(this.rocket.mesh.position, {
      z: -9,
      duration: 3,
      delay: 1,
      ease: 'power.in',
    });
    gsap.to(this.camera.position, {
      x: -0.5090557701889801,
      y: -1.1795701931396365,
      z: -11.253075299665385,
      duration: 3,
      delay: 1,
      ease: 'power.in',
    });
    gsap.to(this.camera.rotation, {
      x: 3.0371520287951856,
      y: -0.04496022168036155,
      z: 3.1368814543600774,
      duration: 5,
      delay: 1,
      ease: 'power.in',
    });

    setTimeout(() => {
      this.rocket.fireEngine();
    }, 3500);

    // Post animation

    gsap.to(this.rocket.mesh.position, {
      z: -7.4,
      duration: 2,
      delay: 4,
      ease: 'power.in',
    });

    gsap.to(this.camera.rotation, {
      x: 2.360053160310296,
      y: 0.3778517778503777,
      duration: 3,
      delay: 6,
      ease: 'power.out',
    });

    gsap.to(this.rocket.mesh.rotation, {
      z: Math.PI,
      duration: 2,
      delay: 8,
    });

    gsap.to(this.rocket.mesh.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.8,
      delay: 10,
    });

    setTimeout(() => {
      this.rocket.removeSmoke();
      this.service.stateChange.next(
        'August 23: Chandrayaan III Will Land On The Surface Around 18:00 IST Near Lunar South Pole'
      );
      setTimeout(() => {
        this.service.stateChange.complete();
      }, 3000);
    }, 9000);
  }

  addMouseListener() {
    // return;
    window.addEventListener('mousemove', (e) => {
      if (!this.enableMouseInteractions) return;
      let changeX = e.clientX - this.oldX,
        changeY = e.clientY - this.oldY;
      this.camera.rotation.y += -changeX / 10000;
      this.camera.rotation.x += -changeY / 10000;
      this.oldX = e.clientX;
      this.oldY = e.clientY;
    });
  }
}
