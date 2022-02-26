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
export async function createGround(scene){
    // build the ground mesh from the Syrtis Major Map (3600x2500)
    var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground",heightMap, 
    {width: 1000, height: 1000, subdivisions: 1000, minHeight: 0, maxHeight: 20, updatable: false, onReady: () => {
        // call back once the mesh is constructed to create an imposter
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.HeightmapImpostor, { mass: 0 });
    }}, scene);

    ground.checkCollisions = true;

    return ground;
}