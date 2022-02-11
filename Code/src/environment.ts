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
    }

    /**
     * loads the ground mesh.
     */
    public loadGround() {
        let groundMaterial = new BABYLON.StandardMaterial("ground", this._scene);

        // create a ground using a stock heightmap from BabylonJS assets (to be replaced by original heightmap)
        this._ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground","https://assets.babylonjs.com/environments/villageheightmap.png", 
            {width: 200, height: 200, subdivisions: 10, minHeight: -10, maxHeight: 10});
        this._ground.material = groundMaterial;
        // this._ground.physicsImpostor = new BABYLON.PhysicsImpostor(this._ground, BABYLON.PhysicsImpostor.HeightmapImpostor,
        //     {
        //         mass: 0, restitution: 0.9
        //     }, this._scene);
    }
}