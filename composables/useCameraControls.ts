import { Camera, Scene } from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ArcballControls } from "three/examples/jsm/controls/ArcballControls";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import { MapControls } from "three/examples/jsm/controls/MapControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

export default function() {
    let orbitControls: OrbitControls
    let arcballControls: ArcballControls
    let FPSControls: FirstPersonControls
    let flyControls: FlyControls
    let mapControls: MapControls
    let trackballControls: TrackballControls

    // Orbit Controls
    function initOrbitControls(camera: Camera, domElement: HTMLElement) {
        orbitControls = new OrbitControls(camera, domElement)
        orbitControls.enableDamping = true
        // add custom settings here
    }

    // Arcball Controls
    function initArcballControls(camera: Camera, domElement: HTMLElement, scene: Scene) {
        arcballControls = new ArcballControls(camera, domElement, scene)
        // add custom settings here
    }

    // First Person Controls
    function initFirstPersonControls(camera: Camera, domElement: HTMLElement) {
        FPSControls = new FirstPersonControls(camera, domElement)
        // add custom settings here
    }

    // Fly Controls
    function initFlyControls(camera: Camera, domElement: HTMLElement) {
        flyControls = new FlyControls(camera, domElement)
        // add custom settings here
    }

    // Map Controls
    function initMapControls(camera: Camera, domElement: HTMLElement) {
        mapControls = new MapControls(camera, domElement)
        mapControls.enableDamping = true
        // add custom settings here
    }

    // Trackball Controls
    function initTrackballControls(camera: Camera, domElement: HTMLElement) {
        trackballControls = new TrackballControls(camera, domElement)
        // add custom settings here
    }

    // Update Functions
    function updateCameraControls() {
        if (orbitControls) orbitControls.update()
        if (arcballControls) arcballControls.update()
        if (mapControls) mapControls.update()
        if (trackballControls) trackballControls.update()
    }
    
    function updateCameraControlsDelta(delta: number) {
        if (FPSControls) FPSControls.update(delta)
        if (flyControls) flyControls.update(delta)
    }

    return {
        initOrbitControls,
        initArcballControls,
        initFirstPersonControls,
        initFlyControls,
        initMapControls,
        initTrackballControls,
        updateCameraControls,
        updateCameraControlsDelta
    }
}