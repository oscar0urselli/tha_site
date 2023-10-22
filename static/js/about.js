import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer, Pass } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { GLTFLoader  } from 'three/examples/jsm/loaders/GLTFLoader';

import { StarsGenerator } from '/static/js/stars.js';
import { Planet } from '/static/js/planet.js';
import { onDOMContentLoaded, after_onClickPreviousPlanet, after_onClickNextPlanet, before_onClickPreviousPlanet, before_onClickNextPlanet } from '/static/js/scroll-text.js';



// DEV vars
const DEBUG = false;

// Global vars
let pauseMotion = false;
let focusedPlanet = 0;
const previous_planet = $('#previous-planet');
const next_planet = $('#next-planet');


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
camera.position.set(-200, 0, 200);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.querySelector('#bg'),
    powerPreference: 'high-performance',
    stencil: false
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.setClearColor(0x000000, 0);
renderer.autoClear = false;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enableRotate = false;
controls.enablePan = false;


//#region Events
document.addEventListener('DOMContentLoaded', () => {
    previous_planet.hide();
    isVisible();
    onDOMContentLoaded();
});
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
}, false);
window.addEventListener('mousedown', () => {
    pauseMotion = true;
})
window.addEventListener('mouseup', () => {
    pauseMotion = false;
});


previous_planet.click(() => {
    previousPlanet({start: before_onClickPreviousPlanet, end: after_onClickPreviousPlanet});
});
next_planet.click(() => {
    nextPlanet({start: before_onClickNextPlanet, end: after_onClickNextPlanet});
});
//#endregion



//#region Planets
// Sun
const rendererScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 2;
bloomPass.radius = 0;

const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(rendererScene);
bloomComposer.addPass(bloomPass);

const sun = new Planet({ radius: 140, widthSegments: 64, heightSegments: 64 }, new THREE.Vector3(0, 0, 0), 6, {texture: '/static/textures/sun.jpg'}, 1).createPlanet();
scene.add(sun);


// Stars
const starsGenerator = new StarsGenerator(1500, [[0x50a82a, 0xd15824], [0x223070, 0x56cfd1], [0x8b1691, 0xad1347], [0x10a352, 0xcad624]], {X: {min: 200, max: 5500}, Y: {min: 200, max: 5500}, Z: {min: 200, max: 5500}}, {radius: { min: 0.5, max: 2.5 }, widthSegments: 16, heightSegments: 16}, 1);
starsGenerator.addStars(scene, (star) => scene.add(star));


// Mercury
const mercury = new Planet({ radius: 0.49, widthSegments: 24, heightSegments: 24 }, new THREE.Vector3(0, 0, 58 * 3), 0.1, {texture: '/static/textures/mercury.jpg'}).createPlanet();
scene.add(mercury);


// Venus
const venus = new Planet({ radius: 1.2, widthSegments: 36, heightSegments: 36 }, new THREE.Vector3(0, 0, 108 * 2), 177, {texture: '/static/textures/venus_surface.jpg'}).createPlanet();
// Venus's atmosphere
const venusAtmosphere = new Planet({radius: 1.21, widthSegments: 36, heightSegments: 36}, new THREE.Vector3(0, 0, 0), 177, {texture: '/static/textures/venus_atmosphere.jpg', transparent: true, blending: THREE.MultiplyBlending}).createPlanet();
venus.add(venusAtmosphere);
scene.add(venus);


// Earth
const earth = new Planet({radius: 1.27, widthSegments: 48, heightSegments: 48}, new THREE.Vector3(0, 0, 149.5 * 2), 23, {texture: '/static/textures/earth_daymap.jpg', bumpMap: '/static/textures/earth_bump.jpg', bumpScale: 0.3, roughness: 1, metalness: 0}).createPlanet();
// Earth's clouds
const earthClouds = new Planet({radius: 1.29, widthSegments: 48, heightSegments: 48}, new THREE.Vector3(0, 0, 0), 23, {texture: '/static/textures/earth_clouds.jpg', transparent: true, blending: THREE.AdditiveBlending}).createPlanet();
// Moon
const moonPivot = new THREE.Object3D(), moon = new Planet({radius: 0.348, widthSegments: 20, heightSegments: 20}, new THREE.Vector3(0, 0, 0.384 * 40), 6.7, {texture: '/static/textures/moon.jpg'}).createPlanet();
moonPivot.rotation.set(THREE.MathUtils.degToRad(5.14), 0, 0);
moonPivot.add(moon);
earth.add(earthClouds, moonPivot);
scene.add(earth);


// Mars
const mars = new Planet({ radius: 0.7, widthSegments: 48, heightSegments: 48 }, new THREE.Vector3(0, 0, 227.8 * 1.5), 25, {texture: '/static/textures/mars.jpg'}).createPlanet('lambert');
scene.add(mars);


// Jupiter
const jupiter = new Planet({ radius: 14.3, widthSegments: 64, heightSegments: 64 }, new THREE.Vector3(0, 0, 778.5), 3, {texture: '/static/textures/jupiter.jpg'}).createPlanet('lambert');
// Io
const ioPivot = new THREE.Object3D(), io = new Planet({radius: 0.364, widthSegments: 20, heightSegments: 20}, new THREE.Vector3(0, 0, 0.422 * 75), 0, {texture: '/static/textures/io.jpg'}).createPlanet();
ioPivot.rotation.set(THREE.MathUtils.degToRad(2.21), 0, 0);
ioPivot.add(io);
// Europa
const europaPivot = new THREE.Object3D(), europa = new Planet({radius: 0.312, widthSegments: 18, heightSegments: 18}, new THREE.Vector3(0, 0, -0.671 * 65), 0, {texture: '/static/textures/europa.jpg'}).createPlanet();
europaPivot.rotation.set(THREE.MathUtils.degToRad(1.781), 0, 0);
europaPivot.add(europa);
// Ganymede
const ganymedePivot = new THREE.Object3D(), ganymede = new Planet({radius: 0.527, widthSegments: 26, heightSegments: 26}, new THREE.Vector3(0, 0, 1.07 * 70), 0, {texture: '/static/textures/ganymede.jpg'}).createPlanet();
ganymedePivot.rotation.set(THREE.MathUtils.degToRad(2.214), 0, 0);
ganymedePivot.add(ganymede);
// Callisto
const callistoPivot = new THREE.Object3D(), callisto = new Planet({radius: 0.482, widthSegments: 22, heightSegments: 22}, new THREE.Vector3(0, 0, -1.88 * 70), 0, {texture: '/static/textures/callisto.jpg'}).createPlanet();
callistoPivot.rotation.set(THREE.MathUtils.degToRad(2.017), 0, 0);
callistoPivot.add(callisto);
jupiter.add(ioPivot, europaPivot, ganymedePivot, callisto);
scene.add(jupiter);


// Saturn
const saturn = new Planet({ radius: 12, widthSegments: 48, heightSegments: 48 }, new THREE.Vector3(0, 0, 1433), -27, {texture: '/static/textures/saturn.jpg'}).createPlanet('lambert');
let titanPivot, titan;
new GLTFLoader().load('/static/3D-Models/Saturn.glb', (gltf) => {
    const saturnRing1 = gltf.scene.children[0].clone();
    saturnRing1.scale.set(0.025, 0.025, 0.025);
    saturn.add(saturnRing1);
    
    // Titan
    titanPivot = new THREE.Object3D();
    titan = new Planet({radius: 0.514, widthSegments: 24, heightSegments: 24}, new THREE.Vector3(0, 0, 1.222 * 60), 0, {texture: '/static/textures/titan.jpg'}).createPlanet();
    titanPivot.rotation.set(THREE.MathUtils.degToRad(-1 * (27 + 0.35)), 0, 0);
    titanPivot.add(titan);
    saturn.add(titanPivot);
    scene.add(saturn);
}, undefined, (err) => {
    console.log(err);
});


// Uranus
//const uranus = new Planet({ radius: 5, widthSegments: 36, heightSegments: 36 }, new THREE.Vector3(0, 0, 2900), 98, {texture: '/static/textures/uranus.jpg'}).createPlanet('lambert');
//scene.add(uranus);


// Neptune
//const neptune = new Planet({ radius: 5, widthSegments: 36, heightSegments: 36 }, new THREE.Vector3(0, 0, 4500), 30, {texture: '/static/textures/neptune.jpg'}).createPlanet();
//scene.add(neptune);


const exploration = [
    {name: 'Sun', obj: sun, dPos: new THREE.Vector3(-200, 0, 200), expSpeed: 2},
    {name: 'Mercury', obj: mercury, dPos: new THREE.Vector3(-2, 0, -0.5), expSpeed: 2},
    {name: 'Venus', obj: venus, dPos: new THREE.Vector3(-2, 2, -3), expSpeed: 2},
    {name: 'Earth', obj: earth, dPos: new THREE.Vector3(5, 0, 1), expSpeed: 2.5},
    {name: 'Mars', obj: mars, dPos: new THREE.Vector3(0, 0, -1.5), expSpeed: 2.25},
    {name: 'Jupiter', obj: jupiter, dPos: new THREE.Vector3(25, 0, -40), expSpeed: 2},
    {name: 'Saturn', obj: saturn, dPos: new THREE.Vector3(-30, 5, -50), expSpeed: 2},
    //{name: 'Uranus', obj: uranus, dPos: new THREE.Vector3(10, 10, 20), expSpeed: 3},
    //{name: 'Neptune', obj: neptune, dPos: new THREE.Vector3(10, 4, -5), expSpeed: 3}
]
//#endregion



//#region Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1, 0, 1);
ambientLight.layers.set(1);
scene.add(ambientLight);
const planetAmbientLight = new THREE.AmbientLight(0xffffff, 0.1);
planetAmbientLight.layers.enableAll();
planetAmbientLight.layers.disable(1);
scene.add(planetAmbientLight);

// Sunlight
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.castShadow = true;
directionalLight.shadow.bias = 0.0001;
directionalLight.shadowDarkness = 0.2;
directionalLight.shadow.camera.visible = true;
directionalLight.position.set(0, 0, 0);
scene.add(directionalLight);
//#endregion


if (DEBUG) {
    const gridHelper = new THREE.GridHelper(200, 200);
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
    const axisHelper = new THREE.AxesHelper(400);
    scene.add(gridHelper);
    scene.add(pointLightHelper);
    scene.add(directionalLightHelper);
    scene.add(axisHelper);
}


//#region Functions
function previousPlanet(callback = {start: undefined, end: undefined}) {
    if (focusedPlanet === 0) {
        return;
    }

    focusedPlanet--;
    
    if (focusedPlanet === exploration.length - 2) {
        gsap.fromTo('#next-planet', {opacity: 0}, {opacity: 1, duration: 1, onStart: () => next_planet.show()});
    }
    if (focusedPlanet === 0) {
        gsap.fromTo('#previous-planet', {opacity: 1}, {opacity: 0, duration: 1, onComplete: () => previous_planet.hide()});
    }


    let realWorldPos = new THREE.Vector3();
    exploration[focusedPlanet].obj.getWorldPosition(realWorldPos);
    gsap.to(camera.position, {
        duration: exploration[focusedPlanet].expSpeed,
        x: realWorldPos.x + exploration[focusedPlanet].dPos.x,
        y: realWorldPos.y + exploration[focusedPlanet].dPos.y,
        z: realWorldPos.z + exploration[focusedPlanet].dPos.z,
        onStart: () => {isVisible(); controls.target = realWorldPos; callback.start();},
        onComplete: callback.end
    });
}

function nextPlanet(callback = {start: undefined, end: undefined}) {
    if (focusedPlanet === exploration.length - 1) {
        return;
    }

    focusedPlanet++;
    
    if (focusedPlanet === 1) {
        gsap.fromTo('#previous-planet', {opacity: 0}, {opacity: 1, duration: 1, onStart: () => previous_planet.show()});
    }
    if (focusedPlanet === exploration.length - 1) {
        gsap.fromTo('#next-planet', {opacity: 1}, {opacity: 0, duration: 1, onComplete: () => next_planet.hide()});
    }


    let realWorldPos = new THREE.Vector3();
    exploration[focusedPlanet].obj.getWorldPosition(realWorldPos);
    gsap.to(camera.position, {
        duration: exploration[focusedPlanet].expSpeed,
        x:  realWorldPos.x + exploration[focusedPlanet].dPos.x,
        y:  realWorldPos.y + exploration[focusedPlanet].dPos.y,
        z:  realWorldPos.z + exploration[focusedPlanet].dPos.z,
        onStart: () => {isVisible(); controls.target = realWorldPos; callback.start();},
        onComplete: callback.end
    });
}

function planetRotation() {
    sun.rotation.y += 0.0001;
    mercury.rotation.y += 0.00025;
    venus.rotation.y += 0.0001;
    earth.rotation.y += 0.000075;
    earthClouds.rotation.y += 0.00001;
    earthClouds.rotation.x -= 0.000025;
    earthClouds.rotation.z += 0.000025;
    moon.rotation.y += 0.0005;
    mars.rotation.y += 0.0001;
    jupiter.rotation.y += 0.00015;
    io.rotation.y += 0.0005;
    europa.rotation.y += 0.0005;
    ganymede.rotation.y += 0.0005;
    callisto.rotation.y += 0.0005;
    //neptune.rotation.y += 0.0005;
}

function planetRevolution() {
    moonPivot.rotation.y += 0.0001;
    ioPivot.rotation.y += 0.0001;
    europaPivot.rotation.y += 0.0002;
    ganymedePivot.rotation.y += 0.0004;
    callistoPivot.rotation.y += 0.0007;
    if (titanPivot) {
        titanPivot.rotation.y += 0.0003;
    }
}

function isVisible() {
    exploration.forEach(p => {
        if (p.name === exploration[focusedPlanet].name || p.name === 'Sun') {
            p.obj.visible = true;
            directionalLight.target = p.obj;
        }
        else {
            p.obj.visible = false;
        }
    });
}

function animate() {
    requestAnimationFrame(animate);

    if (!pauseMotion) {
        planetRotation();
        planetRevolution();
    }

    controls.update();
    
    renderer.render(scene, camera);
    camera.layers.set(1);
    bloomComposer.render();

    renderer.clearDepth();
    camera.layers.set(0);
    renderer.render(scene, camera);
}
//#endregion

animate();