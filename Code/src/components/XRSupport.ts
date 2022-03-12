import {PhysicsImpostor, WebXRFeatureName} from "@babylonjs/core";

/*
*   Author: Kyle Dick
*   Date of Last Edit: 08/03/2022
*
*   This file handles all interactions with xr
*
*   This was created as a part of a 4th Year Disseration Project in Software Engineering with Heriot-Watt University.
*/

/**
 * required set up for XR to function within the scene
 * @param scene the scene which the xr functions are being created in
 * @param floor a mesh which represents the ground of the environment 
 */
export async function XRSetup(scene, floor) {
    
    try{

        const xr = await scene.createDefaultXRExperienceAsync({
            floorMeshes: [floor]
        });        

        // observable for repositioning camera when xr session is started
        xr.baseExperience.onInitialXRPoseSetObservable.add((param) => {
            // currently does nothing, kept for future purpose after testing done
            console.log(param);
        });

        return new Promise((res) => {
            
            res(xr);
        });
    } catch (e) {
        console.log(e);
        alert("Your browser does not support XR content. Please enable to use the XR functionality.");
    }
}

/**
 * Allows for physics interactions using the xr devices, assumed to be a headset with two controllers.
 * This creates physics impostors for the controller and headset, allowing for them to interact with the physics
 * of the scene.
 * @param xrHelper the xr helper containing all data related to current xr experience
 */
export function EnableXRPhysics(xrHelper) {
    const xrPhysics = xrHelper.baseExperience.featuresManager.enableFeature(WebXRFeatureName.PHYSICS_CONTROLLERS, "latest", {
        xrInput: xrHelper.input,
        physicsProperties: {
            restitution: 0.5,
            impostorSize: 0.1,
            impostorType: PhysicsImpostor.BoxImpostor
        },
        enableHeadsetImpostor: true
    });
}