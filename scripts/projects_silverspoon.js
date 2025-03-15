import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.2, 10);
const renderer = new THREE.WebGLRenderer({antialias: true});
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();

controls.enableDamping = true;
controls.dampingFactor = 0.03;

renderer.setClearColor(0x000000, 0);
renderer.setSize( window.innerWidth / 4, window.innerHeight / 4 );
document.getElementById('silverspoon_model').appendChild(renderer.domElement);

loader.load( '/silverspoon.glb', function ( gltf ) {
    const model = gltf.scene;
    scene.add(model);
    camera.position.z = 1.3;
    camera.position.y = 0.8;
    camera.position.x = -1;
}, undefined, function ( error ) {
    console.error( error );
});

function animate() {
    renderer.render(scene, camera);
    controls.update();
}

renderer.setAnimationLoop(animate);