import {PhysicsImpostor} from "@babylonjs/core";
import heightMap from "../assets/images/SyrtisMajorHeightMap.png";
import texture from "../assets/images/marsSurface.png";
import DynamicTerrain from './Terrain';
/*
*   Author: Kyle Dick
*   Date of Last Edit: 09/03/2022
*
*   This file manages the environment of the application.
*   This includes the processing of the information from real world data
*
*   This was created as a part of a 4th Year Disseration Project in Software Engineering with Heriot-Watt University.
*/

/**
 * Creates a floor mesh using data from a selected heightmap
 * @param scene , the scene to render in
 * @returns promise containing a ground mesh
 */

export async function CreateEnvironment(scene){
    return new Promise((resolve) => {
        let terrain;

        let createTerrain = function(mapData, subX, subZ){
            let options = {
                terrainSub: 100,        // how many quads on each axis (100 x 100)
                mapData: mapData,       // the data of each points
                mapSubX: subX, mapSubZ: subZ    // points per dimension
            };
        
            terrain = new DynamicTerrain("terrain", options, scene);
            terrain.createUVMap();

            // terrain texture and material
            var terrainTexture = new BABYLON['Texture'](texture, scene);
            terrainTexture.uScale = 100.0;
            terrainTexture.vScale = terrainTexture.uScale;

            var terrainMaterial = new BABYLON['StandardMaterial']("material", scene);
            terrainMaterial.diffuseTexture = terrainTexture;
            terrain.mesh.material = terrainMaterial;

            // create physics imposter
            terrain.mesh.checkCollisions = true;
            // update how the camera LOD is calculated
            // using the camera height, more of the terrain is shown as higher altitudes but at a lower quality
            terrain.updateCameraLOD = (terrainCam) => {
                return  Math.abs((terrainCam.globalPosition.y / 16.0) | 0);
            }

            resolve(terrain);
        };

        // create the data map
        let mapWidth = 3600;
        let mapHeight = 2500;
        let nbPointsX = 3600;
        let nbPointsY = 2500;
        let hmOptions = {
            width: mapWidth, height: mapHeight,     // map size as rendered in world
            subX: nbPointsX, subZ: nbPointsY,       // number of points on map width (subX) and map height (subZ)
            minHeight: -125, maxHeight: 125,
            onReady: createTerrain           // callback function to render the map
        };

        let mapData = new Float32Array(nbPointsX * nbPointsY * 3);    // create array big enough to hold all the points
                                                            // * 3 as this is a flat terrain holding x, y and z point
        DynamicTerrain.CreateMapFromHeightMapToRef(heightMap, hmOptions,
            mapData, scene);
        });
}