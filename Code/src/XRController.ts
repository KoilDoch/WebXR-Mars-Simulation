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
    // set up xr support
    try{
        // create the helper and session manager
        // const xrHelper = await BABYLON.WebXRExperienceHelper.CreateAsync(scene);
        // const sessionManager = new BABYLON.WebXRSessionManager(scene); 

        // // initialise vr session
        // sessionManager.initializeSessionAsync('immersive-vr');

        // // position the camera within the session manager
        // const xrCamera = new BABYLON.WebXRCamera("userView", scene, sessionManager);
        // xrCamera.position = new BABYLON.Vector3(0,10,0);
        // console.log(xrHelper);  // debug

        const xr = await scene.createDefaultXRExperienceAsync({
            floorMeshes: [floor],
        });

        console.log(xr);
    } catch (e) {
        console.log(e);
        alert("Your browser does not support XR content. Please enable to use the XR functionality.");
    }
}