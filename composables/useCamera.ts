import { PerspectiveCamera, OrthographicCamera, CameraHelper } from "three";

export default function() {
    // Perspective Camera
    function initPerspectiveCamera(x: number, y: number, z: number, fov?: number | undefined, aspect?: number | undefined, near?: number | undefined, far?: number | undefined) {
        const camera = new PerspectiveCamera(fov, aspect , near, far)
        camera.position.set(x, y, z)

        const camHelper = new CameraHelper(camera)
        // add custom settings

        return { camera, camHelper }
    }
    
    // Orthographic Camera
    function initOrthographicCamera(left?: number | undefined, right?: number | undefined, top?: number | undefined, bottom?: number | undefined, near?: number | undefined, far?: number | undefined,) {
        const camera = new OrthographicCamera(left, right, top, bottom, near, far)

        const camHelper = new CameraHelper(camera)
        // add custom settings

        return { camera, camHelper }
    }
 
    return {
        initPerspectiveCamera,
        initOrthographicCamera
    }
}