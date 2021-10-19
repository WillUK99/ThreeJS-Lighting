import './style/main.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'dat.gui'

console.log("https://threejsfundamentals.org/threejs/lessons/threejs-lights.html")


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
scene.background = new THREE.Color("black")

// Camera 
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 10, 20)
scene.add(camera)


// Orbit Controls
const controls = new OrbitControls(camera, document.querySelector(".webgl"))
controls.target.set(0, 5, 0)
controls.update()


// Plane Texture
const planeSize = 256

const loader = new THREE.TextureLoader()
const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png')
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

const cubeSize = 4
const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
const cubeMat = new THREE.MeshPhongMaterial({ color: 0xf6f6 })
const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat)
cubeMesh.position.set(cubeSize + 1, cubeSize, 0)
scene.add(cubeMesh)



// Sphere
{
    const sphereR = 3
    const sphereWidthDivisions = 32
    const sphereHeightDivisions = 16
    const sphereGeo = new THREE.SphereGeometry(sphereR, sphereWidthDivisions, sphereHeightDivisions)
    const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" })
    const mesh = new THREE.Mesh(sphereGeo, sphereMat)
    mesh.position.set(-sphereR - 1, sphereR + 2, 0)
    scene.add(mesh)
}


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(".webgl")
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)


/**
 * Lighting
 */

// Point Light
const pointLight = new THREE.PointLight(0xBA7FFF, 1)
pointLight.position.set(0, 5, 0)
scene.add(pointLight)
const pointLightHelper = new THREE.PointLightHelper(pointLight) // Dont forget to pass the helper the light you wish it to "help"
scene.add(pointLightHelper)

// Lighting updating
const updateLight = () => {
    // If the Light be using doesnt have/need a target then you dont need below
    // dirLight.target.updateMatrixWorld() 
    pointLightHelper.update()
}
updateLight()


/**
 * GUI
 */
// Color
class ColorGUIHelper {
    constructor(object, prop) {
        this.object = object
        this.prop = prop
    }
    get value() {
        // Getting the color property/key from light object
        return `#${this.object[this.prop].getHexString()}`
    }
    set value(hexString) {
        // Setting the color propety/key for the light object
        this.object[this.prop].set(hexString)
    }
}

// Creating GUI
const gui = new GUI()
// Adding new color controller to GUI - Point Light
gui.addColor(new ColorGUIHelper(pointLight, "color"), "value").name("color")
gui.add(pointLight, "intensity", 0, 2, 0.01)
gui.add(pointLight, "distance", 0, 40).onChange(updateLight)




// Function to allow us to make a controller folder within dat.gui
const makeXYZGUI = (gui, vector3, name, onChangeFn) => {
    const folder = gui.addFolder(name)
    folder.add(vector3, "x", -10, 10).onChange(onChangeFn)
    folder.add(vector3, "y", 0, 10).onChange(onChangeFn)
    folder.add(vector3, "z", -10, 10).onChange(onChangeFn)
    folder.open()
}



// makeXYZGUI(gui, dirLight.position, "position", updateLight)
// makeXYZGUI(gui, dirLight.target.position, "target", updateLight)

makeXYZGUI(gui, pointLight.position, "position", updateLight)



/**
 * Animation loop
 */

let distance = 0.05
const main = (time) => {
    // Ms to seconds
    time *= 0.001

    cubeMesh.rotation.x = time / 2
    cubeMesh.rotation.y = time / 2

    // Renderer needs to render these
    renderer.render(scene, camera)

    // Create infinite loop
    window.requestAnimationFrame(main)
}

main()
