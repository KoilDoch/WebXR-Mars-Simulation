import * as BABYLON from "@babylonjs/core";

/*
*   Author: Kyle Dick
*   Date of Last Edit: 08/03/2022
*
*   This file holds function for basic shape creation
*
*   This was created as a part of a 4th Year Disseration Project in Software Engineering with Heriot-Watt University.
*/

/**
 * Creates a box mesh 
 */
export function CreateBox(scene) {
var box = BABYLON.Mesh.CreateBox("box1", 4, scene);
box.position = new BABYLON.Vector3(10,50,10);
box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor,
    {
        mass: 0.1, restitution: 0.2
    }, scene);

return box;
}

/**
 * Creates a sphere mesh 
 */
export function CreateSphere(scene) {
    var ball = BABYLON.Mesh.CreateSphere("sphere", 10, 10, scene);
    ball.position.y = 50;
    ball.position.x = 50;
    ball.physicsImpostor = new BABYLON.PhysicsImpostor(ball, BABYLON.PhysicsImpostor.SphereImpostor,
        {
            mass: 0.1, restitution: 0.2
        }, scene);

    return ball;
}
