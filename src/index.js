import './style/main.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



/**
 * Sizes 
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener("resize", () => {

    // Save sizes on resize
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})


/**
 * Environment
 */
//Scene
const scene = new THREE.Scene()

// Camera 
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 10, 20)
scene.add(camera)


// Orbit Controls
const controls = new OrbitControls(camera, document.querySelector(".webgl"))
controls.target.set(0,5,0)
controls.update()


// Plane Texture
const planeSize = 40

const loader = new THREE.TextureLoader() 
const texture = loader.load("../assets/checkerboard.png")
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.magFilter = THREE.NearestFilter
const repeats = planeSize / 2
texture.repeat.set(repeats, repeats)


// Plane
const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
})

const planeMesh = new THREE.Mesh(planeGeo, planeMat)
planeMesh.rotation.x = Math.PI * -0.5
scene.add(planeMesh)

// Cube


// Sphere


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(".webgl")
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)

/**
 * Animation loop
 */
const main = (time) => {
    // Ms to seconds
    time *= 0.001

    // Renderer needs to render these
    renderer.render(scene, camera)

    // Create infinite loop
    window.requestAnimationFrame(main)
}

main()


// /**
//  * Sizes
//  */
// const sizes = {}
// sizes.width = window.innerWidth
// sizes.height = window.innerHeight

// window.addEventListener('resize', () =>
// {
//     // Save sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
// })

// /**
//  * Environnements
//  */
// // Scene
// const scene = new THREE.Scene()

// // Camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.z = 5
// scene.add(camera)

// // Test
// const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshNormalMaterial())
// scene.add(cube)

// // Renderer
// const renderer = new THREE.WebGLRenderer({
//     canvas: document.querySelector('.webgl')
// })
// renderer.setPixelRatio(window.devicePixelRatio)
// renderer.setSize(sizes.width, sizes.height)

// /**
//  * Loop
//  */
// const loop = () =>
// {
//     // Update
//     cube.rotation.y += 0.01
//     cube.rotation.x += 0.01

//     // Render
//     renderer.render(scene, camera)

//     // Keep looping
//     window.requestAnimationFrame(loop)
// }
// loop()