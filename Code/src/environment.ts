import { Scene, MeshBuilder } from "@babylonjs/core";

/**
 * This file manages the environment of the application.
 * This includes features such as
 *  - Skybox
 *  - Ground (height maps and such included)
 */

export class Environment {
    private _scene: Scene;
    private _ground;

    constructor(scene: Scene){
        this._scene = scene;
    }

    /**
     * loads the ground mesh.
     * releases promise with return
     */
    public loadGround() {
        // create a ground using a stock heightmap from BabylonJS assets (to be replaced by original heightmap)
        this._ground = MeshBuilder.CreateGroundFromHeightMap("ground","https://assets.babylonjs.com/environments/villageheightmap.png", 
            {width: 200, height: 200, subdivisions: 10, minHeight: 0, maxHeight: 10});
    }
}