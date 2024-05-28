import * as THREE from "three";

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

    const meshes = [];
    let mesh;
    for (let i = 0; i < 10; i++) {
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 5 - 2.5;
        mesh.position.z = Math.random() * 5 - 2.5;
        scene.add(mesh);
        meshes.push(mesh);
    }
    // const mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);

    //그리기
    // const clock = new THREE.Clock();
    let oldTime = Date.now();

    function draw() {
        const newTime = Date.now();
        const deltaTime = newTime - oldTime;
        oldTime = newTime;

        meshes.forEach((item) => {
            item.rotation.y += deltaTime * 0.001;
        });
        // mesh.rotation.y += deltaTime * 0.001;
        // mesh.position.y += deltaTime * 0.001;
        // if (mesh.position.y > 3) {
        //     mesh.position.y = 0;
        // }
        renderer.render(scene, camera);

        // window.requestAnimationFrame(draw);
        renderer.setAnimationLoop(draw);
    }

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
