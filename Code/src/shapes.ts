import * as BABYLON from "@babylonjs/core";

/**
 * Creates a box mesh 
 */
export function createBox(scene) {
var box = BABYLON.Mesh.CreateBox("box1", 4, scene);
box.position.y = 10;
box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor,
    {
        mass: 0.1, restitution: 0.2
    }, scene);

return box;
}

/**
 * Creates a sphere mesh 
 */
export function  createSphere(scene) {
var ball = BABYLON.Mesh.CreateSphere("sphere", 10, 10, scene);
ball.position.y = 20;
ball.position.x = 50;
ball.physicsImpostor = new BABYLON.PhysicsImpostor(ball, BABYLON.PhysicsImpostor.SphereImpostor,
    {
        mass: 0.1, restitution: 0.2
    }, scene);

return ball;
}
