import * as BABYLON from "@babylonjs/core";

/**
 * This file manages the environment of the application.
 * This includes features such as
 *  - Skybox
 *  - Ground (height maps and such included)
 */
export function createGround(scene){
    this._scene = scene;
    // build the ground mesh from the Syrtis Major Map (3600x2500)
    this._ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground","./assets/SyrtisMajorHeightmap.png", 
    {width: 300, height: 200, subdivisions: 10, minHeight: -10, maxHeight: 10, onReady: () => {
        // call back once the mesh is constructed to create an imposter
        this._ground.physicsImpostor = new BABYLON.PhysicsImpostor(this._ground, BABYLON.PhysicsImpostor.HeightmapImpostor, { mass: 0 });
    }}, this._scene, );
}