import * as BABYLON from "@babylonjs/core";
/**
 * This file handles all interactions with xr
 */
export function initialiseXR(scene) {
    // set up xr support
    this._xr = scene.createDefaultXRExperienceAsync({});

    // create camera
    var camera = new BABYLON.WebVRFreeCamera("userView", new BABYLON.Vector3(0,0,0), scene);
}