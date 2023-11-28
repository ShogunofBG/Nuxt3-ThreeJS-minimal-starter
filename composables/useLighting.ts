import { type ColorRepresentation, AmbientLight, DirectionalLight, PointLight } from "three";

export default function() {
    // Directional Light
    function initDirectionalLight(x: number, y: number, z: number, color?: ColorRepresentation | undefined, intensity?: number | undefined) {
        const directionalLight = new DirectionalLight(color, intensity)
        directionalLight.position.set(x, y, z)
        // add custom settings

        return directionalLight
    }

    // Ambient Light
    function initAmbientLight(color?: ColorRepresentation | undefined, intensity?: number | undefined) {
        const ambientLight = new AmbientLight(color, intensity)
        // add custom settings

        return ambientLight
    }

    // Point Light
    function initPointLight(x: number, y: number, z: number, color?: ColorRepresentation | undefined, intensity?: number | undefined, distance?: number | undefined, decay?: number | undefined) {
        const pointLight = new PointLight(color, intensity, distance, decay)
        pointLight.position.set(x, y, z)
        // add custom settings

        return pointLight
    }

    return {
        initDirectionalLight,
        initAmbientLight,
        initPointLight
    }
}