import { PerspectiveCamera, OrthographicCamera, CameraHelper } from "three";

export default function() {
    let screenWidth = window.innerWidth
    let screenHeight = window.innerHeight
    let aspectRatio = screenWidth / screenHeight
    const frustumSize = 400

    // Perspective Camera
    const perspectiveCamera = new PerspectiveCamera(75, aspectRatio , 0.1, 1000)
    perspectiveCamera.position.set(0, 100, 250)

    const perspCamHelper = new CameraHelper(perspectiveCamera)

    // Orthographic Camera
    const orthographicCamera = new OrthographicCamera(frustumSize * aspectRatio / -2, frustumSize * aspectRatio / 2, frustumSize / 2, frustumSize / -2, -100, 1000)
    orthographicCamera.userData.frustumSize = frustumSize

    const orthoCamHelper = new CameraHelper(orthographicCamera)

    return {
        perspectiveCamera,
        perspCamHelper,
        orthographicCamera,
        orthoCamHelper,
    }
}