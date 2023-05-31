import { AmbientLight, DirectionalLight } from "three";

export default function() {
    // Directional Light
    const directionalLight = new DirectionalLight(0xB5A00B, 1)
    directionalLight.position.set(0, 500, 1000)

    // Ambient Light
    const ambientLight = new AmbientLight(0xFFFFFF, 1)

    return {
        directionalLight,
        ambientLight
    }
}