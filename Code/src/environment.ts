import * as BABYLON from "@babylonjs/core";

/**
 * This file manages the environment of the application.
 * This includes features such as
 *  - Skybox
 *  - Ground (height maps and such included)
 */

export class Environment {
    private _scene: BABYLON.Scene;
    private _ground;

    constructor(scene: BABYLON.Scene){
        this._scene = scene;
        this._ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground","https://assets.babylonjs.com/environments/villageheightmap.png", 
        {width: 200, height: 200, subdivisions: 10, minHeight: -10, maxHeight: 10, onReady: () => {
            this._ground.physicsImpostor = new BABYLON.PhysicsImpostor(this._ground, BABYLON.PhysicsImpostor.HeightmapImpostor, { mass: 0 });
        }}, this._scene, );
    }
}