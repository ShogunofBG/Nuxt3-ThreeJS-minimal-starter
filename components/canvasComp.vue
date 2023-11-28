<template>
    <div>
        <canvas ref="exp" />
    </div>
</template>

<script setup lang="ts">
import { Scene, WebGL1Renderer } from "three";


let renderer: WebGL1Renderer
const exp = ref<HTMLCanvasElement | null>(null)

// Scene
const scene = new Scene()

// Camera
const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)

const { initPerspectiveCamera } = useCamera()
const { camera, camHelper } = initPerspectiveCamera(0, 100, 250, 75, aspectRatio.value, 0.1, 1000)
scene.add(camera, camHelper)

// Camera Controls
const { initOrbitControls, updateCameraControls } = useCameraControls()

// Lighting
const { initPointLight, initAmbientLight, initDirectionalLight } = useLighting()
const DL1 = initDirectionalLight(0, 500, 1000, 0xB5A00B, .5)
const DL2 = initDirectionalLight(0, -500, -1000, 0x9420A3, .5)
const ambientLight = initAmbientLight(0xFFFFFF, .05)
const PL1 = initPointLight(0, -50, 0, 0x9420A3, 1, 1200, 2)
const PL2 = initPointLight(0, 50, 0, 0xB5A00B, 1, 1200, 2)
scene.add(DL1, DL2, PL1, PL2, ambientLight)

// GLTF Model
const { load } = useGLTFModel()
const { scene: model, asset: credits } = await load("/models/beautiful_sphere/scene.gltf")
console.log(`3D Model by: ${credits.extras.author}`)
scene.add(model)

// Render Functions
function setRenderer() {
    if (exp.value) {
        renderer = new WebGL1Renderer({
            canvas: exp.value,
            alpha: true
        })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)
        initOrbitControls(camera, renderer.domElement)
    }
}

// Camera Functions

function updateRenderer() {
    renderer.setSize(width.value, height.value)
    renderer.render(scene, camera)
}

function updateCamera() {
    if (camera.type === "PerspectiveCamera") {
        camera.aspect = aspectRatio.value
    }
    // if (camera.type === "OrthographicCamera") {
    //     const frustumSize = camera.userData?.frustumSize
    //     camera.left = frustumSize * aspectRatio.value / -2
    //     camera.right = frustumSize * aspectRatio.value / 2
    // }
    camera.updateProjectionMatrix()
    camHelper.update()
}

// Loop
const loop = () => {
    updateCameraControls()
    requestAnimationFrame(loop)
    renderer.render(scene, camera)
}

watch(aspectRatio, () => {
    updateCamera()
    updateRenderer()
})

onMounted(() => {
    setRenderer()
    loop()
})

</script>