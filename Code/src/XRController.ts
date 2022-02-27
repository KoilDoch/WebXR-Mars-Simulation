import * as BABYLON from "@babylonjs/core";

/**
 * This file handles all interactions with xr
 */
export async function initialiseXR(scene) {
    // set up xr support
    var xr = await scene.createDefaultXRExperienceAsync({
        floorMeshes: [this.env]
    });

    // warning for no browser support
    if(!xr.baseExperience){
        alert("Your browser does not support XR content. Please enable to use the XR functionality.");
    }

    const xrCamera = new BABYLON.WebXRCamera("xrCamera", scene, xr);
    xrCamera.setTransformationFromNonVRCamera();
}