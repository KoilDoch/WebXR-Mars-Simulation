import * as BABYLON from "@babylonjs/core";

export function createController(scene) {
    // create a camera for the first person view
    const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0,30,0), this.scene);

    // give control to the inputs to this camera
    camera.attachControl();

    camera.ellipsoid = new BABYLON.Vector3(1,1,1);
    camera.applyGravity = true;
    camera.checkCollisions = true;
    
    // controller inputs
    camera.keysUp.push(87);     // forward [W]
    camera.keysDown.push(83);   // backwards [S}]
    camera.keysLeft.push(65);   // left [A]
    camera.keysRight.push(68);  // right [D]

    var box = BABYLON.Mesh.CreateBox("box1", 4, scene);
    box.position = new BABYLON.Vector3(0,30,0);
    box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor,
        {
            mass: 0.1, restitution: 0.2
        }, scene);

    camera.parent = box;

    return camera;
}