import * as BABYLON from "@babylonjs/core";

/*
*   Author: Kyle Dick
*   Date of Last Edit: 02/03/2022
*
*   This file handles all interactions with xr
*
*   This was created as a part of a 4th Year Disseration Project in Software Engineering with Heriot-Watt University.
*/

export async function initialiseXR(scene, floor) {
    try{
        const xr = await scene.createDefaultXRExperienceAsync({
            floorMeshes: [floor],
        });

        console.log(xr);
    } catch (e) {
        console.log(e);
        alert("Your browser does not support XR content. Please enable to use the XR functionality.");
    }
}