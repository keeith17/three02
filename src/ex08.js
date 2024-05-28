import * as THREE from "three";
import gsap from "gsap";

export default function example() {
    const canvas = document.querySelector("#three-canvas");

    //renderer
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    //scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("black", 3, 7);

    //camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.x = 1;
    camera.position.y = 1;
    camera.position.z = 5;
    // camera.position.y = 2;
    // camera.position.x = 2;
    // camera.lookAt(0, 0, 0);
    // camera.zoom = 0.5;
    // camera.updateProjectionMatrix();
    scene.add(camera);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.x = 1;
    light.position.y = 3;
    light.position.z = 10;
    scene.add(light);

    //Mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0xff0000,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    //그리기
    // const clock = new THREE.Clock();
    let oldTime = Date.now();

    function draw() {
        const newTime = Date.now();
        const deltaTime = newTime - oldTime;
        oldTime = newTime;

        renderer.render(scene, camera);

        // window.requestAnimationFrame(draw);
        renderer.setAnimationLoop(draw);
    }

    //gsap
    gsap.to(mesh.position, {
        duration: 1,
        y: 2,
        z: 2,
    });

    function setSize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    }

    //이벤트
    window.addEventListener("resize", setSize);

    draw();
}
