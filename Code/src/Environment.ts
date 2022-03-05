// import * as BABYLON from "@babylonjs/core";
// dynamic terrain extension used to generate the ground mesh
import heightMap from "./assets/images/MarsHeightMap.jpg";
import texture from "./assets/images/red.png";
import DynamicTerrain from './Terrain';
//const geoDataURL = 'https://opmbuilder.carto.com:443/api/v2/sql?q=select * from opmbuilder.opm_499_mars_quadrangles';
/*
*   Author: Kyle Dick
*   Date of Last Edit: 0/03/2022
*
*   This file manages the environment of the application.
*   This includes the processing of the information from real world data
*
*   This was created as a part of a 4th Year Disseration Project in Software Engineering with Heriot-Watt University.
*/



/**
 * Creates a floor mesh using data from a selected heightmap
 * @param scene , the scene to render in
 * @returns a ground mesh
 */

export async function createEnvironment(scene){
    var terrainTexture = new BABYLON['Texture'](texture, scene);
    
    var terrainMaterial = new BABYLON['StandardMaterial']("tm", scene);
    terrainMaterial.diffuseTexture = terrainTexture;

    console.log(BABYLON);
    let terrain;

    let createTerrain = function(mapData, subX, subZ){
        let options = {
            terrainSub: 500,        // how many quads on each axis (100 x 100)
            mapData: mapData,       // the data of each points
            mapSubX: subX, mapSubZ: subZ    // points per dimension
        };
    
        terrain = new DynamicTerrain("terrain", options, scene);
        terrain.createUVMap();
        terrain.LODLimits = [4];    // set the level of detail to be higher for quads closer to camera

        terrain.mesh.material = terrainMaterial;
    
        console.log(terrain);
    };

    // create the data map
    let mapWidth = 12288;
    let mapHeight = 6144;
    let nbPointsX = 6000;
    let nbPointsY = 3000;
    let hmOptions = {
        width: mapWidth, height: mapHeight,     // map size as rendered in world
        subX: nbPointsX, subZ: nbPointsY,       // number of points on map width (subX) and map height (subZ)
        minHeight: -100, maxHeight: 100,
        onReady: createTerrain           // callback function to render the map
    };

    let mapData = new Float32Array(nbPointsX * nbPointsY * 3);    // create array big enough to hold all the points
                                                        // * 3 as this is a flat terrain holding x, y and z point
DynamicTerrain.CreateMapFromHeightMapToRef(heightMap, hmOptions,
        mapData, scene);
}


// gets the locational data of each quadrangle of mars
// export async function getGeoData(){
//     // get data from url
//     const geoData = await fetch(geoDataURL)
//         // try to catch any errors
//         .catch(err => {throw err});
    
//     return geoData.json();
// }