import * as THREE from "three";
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const canvas = document.querySelector("#three-canvas");

//renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

//scene
const scene = new THREE.Scene();

//camera
//perspective camera ( 원근 카메라 )
// const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
// );
// camera.position.z = 5;
// camera.position.y = 2;
// camera.position.x = 1;

//Orthographic Camera( 직교 카메라 )
const camera = new THREE.OrthographicCamera(
    -(window.innerWidth / window.innerHeight), //left
    window.innerWidth / window.innerHeight, //right
    1,
    -1,
    0.1,
    1000
);
camera.position.z = 6;
camera.position.y = 2;
camera.position.x = 1;
camera.lookAt(0, 0, 0);
// camera.zoom = 0.5;
// camera.updateProjectionMatrix();
scene.add(camera);

//Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//그리기
renderer.render(scene, camera);
