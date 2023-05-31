<template>
    <div>
        <canvas ref="exp" />
    </div>
</template>

<script setup lang="ts">
import { Scene, WebGL1Renderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


let renderer: WebGL1Renderer
let controls: OrbitControls
const exp = ref<HTMLCanvasElement | null>(null)

// Scene
const scene = new Scene()

// Camera
const { perspectiveCamera: camera, perspCamHelper: camHelper } = useCamera()
scene.add(camera)
scene.add(camHelper)

// Lighting
const { ambientLight, directionalLight } = useLighting()
scene.add(ambientLight)
scene.add(directionalLight)

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
        controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
    }
}

// Camera Functions
const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)

function updateRenderer() {
    renderer.setSize(width.value, height.value)
    renderer.render(scene, camera)
}

function updateCamera() {
    if (camera.type === "PerspectiveCamera") {
        camera.aspect = aspectRatio.value
    }
    if (camera.type === "OrthographicCamera") {
        const frustumSize = camera.userData?.frustumSize
        camera.left = frustumSize * aspectRatio.value / -2
        camera.right = frustumSize * aspectRatio.value / 2
    }
    camera.updateProjectionMatrix()
    camHelper.update()
}

// Loop
const loop = () => {
    controls.update()
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
    console.log(camera)
})

</script>