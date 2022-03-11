import { FreeCamera , Vector3 } from "@babylonjs/core";

/*
*   Author: Kyle Dick
*   Date of Last Edit: 08/03/2022
*
*   This file handles the functions which control the non-vr first person camera
*
*   This was created as a part of a 4th Year Disseration Project in Software Engineering with Heriot-Watt University.
*/

export function CreateController(scene) {
    // create a camera for the first person view
    const camera = new FreeCamera("FreeCamera", new Vector3(0,30,0), scene);

    camera.applyGravity = true;
    camera.checkCollisions = true;
    //camera.ellipsoid = new Vector3(1,1,1);
    
    // controller inputs
    camera.keysUp.push(87);     // forward [W]
    camera.keysDown.push(83);   // backwards [S}]
    camera.keysLeft.push(65);   // left [A]
    camera.keysRight.push(68);  // right [D]

    // give control to the inputs to this camera
    camera.attachControl(true);

    return camera;
}