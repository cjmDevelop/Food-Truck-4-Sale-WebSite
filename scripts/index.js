import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.2, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x000000, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

let model;
let animationStart = null;
let animationDuration = 2000;
let rotating = true;

document.getElementById('three-d').appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load('/foodtruck.glb', function (gltf) {
    model = gltf.scene;

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    scene.add(model);
    camera.position.set(-1.05, 0.1, 1);
}, undefined, function (error) {
    console.error(error);
});

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

const scaleFactor = 2.5;
renderer.setSize(window.innerWidth / scaleFactor, window.innerHeight / scaleFactor);


function animate(time) {
    if (rotating && model) {
        if (!animationStart) animationStart = time;
        const elapsed = time - animationStart;
        const t = Math.min(elapsed / animationDuration, 1); // normalized 0 to 1

        const easedT = easeOutCubic(t);
        model.rotation.y = easedT * Math.PI * 2; // Full 360 rotation

        if (t >= 1) {
            rotating = false;
            model.rotation.y = 0; // Snap to original position
        }
    }

    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);


window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / scaleFactor, window.innerHeight / scaleFactor);
}