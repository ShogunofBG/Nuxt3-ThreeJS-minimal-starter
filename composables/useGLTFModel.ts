import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function() {
    const gltfLoader = new GLTFLoader()
    interface model {
        scene?: any,
        asset?: any,
        animations?: any
    }

    function load(url: string) {
        return new Promise<model>((resolve, reject) => {
            gltfLoader.load(url, resolve, undefined, reject)
        })
    }

    function parse(buffer: ArrayBufferLike) {
        return new Promise<model>((resolve, reject) => {
            gltfLoader.parse(buffer, '', resolve, reject)
        })
    }

    return {
        load,
        parse
    }
}