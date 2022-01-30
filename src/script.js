import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'

// Loading

const textureLoader = new THREE.TextureLoader()
const golfTexture = textureLoader.load('/texture/some.png')
golfTexture.flipY = false

const testMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Groupe

const mainGroup = new THREE.Group()

// Loading models

const loader = new GLTFLoader()
loader.load('/Models/cube0.gltf', function (gltf) {
  const cube1 = gltf.scene
  const testMaterial = new THREE.MeshDistanceMaterial()
  cube1.position.x = -6;
  cube1.traverse ( ( o ) => {
    if ( o.isMesh ) {
    
      o.material = testMaterial;
    }
  } );
  mainGroup.add(cube1);

}, undefined, function (error) {

  console.error(error);

});



loader.load('/Models/cube1.gltf', function (gltf) {

  const cube2 = gltf.scene
  cube2.position.x = -6;
  cube2.traverse ( ( o ) => {
    if ( o.isMesh ) {
      // note: for a multi-material mesh, `o.material` may be an array,
      // in which case you'd need to set `.map` on each value.
      o.material.map = golfTexture;
    }
  } );
  mainGroup.add(cube2);

}, undefined, function (error) {

  console.error(error);

});


scene.add(mainGroup)
console.log(scene);

console.log(scene.children);
console.log(mainGroup.children);

// Objects
// const geometry = new THREE.SphereBufferGeometry(.5, 64, 64);

// // Materials

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.7
// material.roughness = 0.2
// material.normalMap = normalTexture;

// material.color = new THREE.Color(0x292929)

// // Mesh
// const sphere = new THREE.Mesh(geometry, material)
// scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// gui.add(pointLight, 'intensity').min(0).max(16).step(0.01)

// Light2

const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.x = -6
pointLight2.position.y = -6
pointLight2.position.z = 8
scene.add(pointLight2)

// gui.add(pointLight2.position, 'y').min(-8).max(8).step(0.01)
// gui.add(pointLight2.position, 'x').min(-8).max(8).step(0.01)
// gui.add(pointLight2.position, 'z').min(-8).max(8).step(0.01)

// gui.add(pointLight2, 'intensity').min(0).max(16).step(0.01)

// Light 3

const light3 = gui.addFolder('Light 3')

const pointLight3 = new THREE.PointLight(0xff0000, 2)
pointLight3.position.x = -6
pointLight3.position.y = -6
pointLight3.position.z = 8
scene.add(pointLight3)

light3.add(pointLight3.position, 'y').min(-8).max(8).step(0.01)
light3.add(pointLight3.position, 'x').min(-8).max(8).step(0.01)
light3.add(pointLight3.position, 'z').min(-8).max(8).step(0.01)
light3.add(pointLight3, 'intensity').min(0).max(16).step(0.01)


// const light3Color = {
//   color: 0xff0000
// }

// light3.addColor(light3Color, 'color')
//   .onChange(() => {
//     pointLight3.color.set(light3Color.color)
//   })
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 2
camera.position.z = 15
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {

  const elapsedTime = clock.getElapsedTime()

  // Update Orbital Controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
