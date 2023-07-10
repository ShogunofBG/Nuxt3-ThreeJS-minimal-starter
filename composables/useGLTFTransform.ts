import { WebIO } from "@gltf-transform/core";
import { KHRONOS_EXTENSIONS } from "@gltf-transform/extensions";
import { metalRough } from "@gltf-transform/functions";

export default async function(url: string) {
    const io = new WebIO().registerExtensions(KHRONOS_EXTENSIONS)
    const document = await io.read(url)

    await document.transform(metalRough())

    const glb = await io.writeBinary(document)

    return {
        glb
    }
}