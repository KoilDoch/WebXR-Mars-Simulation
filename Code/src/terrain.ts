import * as BABYLON from "@babylonjs/core";
// dynamic terrain extension used to generate the ground mesh
import * as DYNAMIC_TERRAIN from "./js/babylon.dynamicTerrain.min.js";
import heightMap from "./assets/SyrtisMajorHeightmap.png";



/**
 * This file manages the environment of the application.
 * This includes features such as
 *  - Skybox
 *  - Ground (height maps and such included)
 */
export function createGround(scene){
    this._scene = scene;
    // build the ground mesh from the Syrtis Major Map (3600x2500)
    this._ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground",heightMap, 
    {width: 3800, height: 2500, subdivisions: 1000, minHeight: -10, maxHeight: 10, onReady: () => {
        // call back once the mesh is constructed to create an imposter
        this._ground.physicsImpostor = new BABYLON.PhysicsImpostor(this._ground, BABYLON.PhysicsImpostor.HeightmapImpostor);
    }}, this._scene, );

}