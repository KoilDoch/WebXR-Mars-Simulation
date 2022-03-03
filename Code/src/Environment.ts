import * as BABYLON from "@babylonjs/core";
// dynamic terrain extension used to generate the ground mesh
import * as DYNAMIC_TERRAIN from "./js/babylon.dynamicTerrain.min.js";
import heightMap from "./assets/images/SyrtisMajorHeightmap.png";
const geoDataURL = 'https://opmbuilder.carto.com:443/api/v2/sql?q=select * from opmbuilder.opm_499_mars_quadrangles';
/*
*   Author: Kyle Dick
*   Date of Last Edit: 02/03/2022
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
export async function createGround(scene){
    // build the ground mesh from the Syrtis Major Map (3600x2500)
    var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("ground",heightMap, 
    {width: 1000, height: 1000, subdivisions: 1000, minHeight: 0, maxHeight: 20, updatable: false, onReady: () => {
        // call back once the mesh is constructed to create an imposter
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.HeightmapImpostor, { mass: 0 });
    }}, scene);

    ground.checkCollisions = true;

    console.log(await getGeoData());
    return ground;
}

// gets the locational data of each quadrangle of mars
export async function getGeoData(){
    // get data from url
    const geoData = await fetch(geoDataURL)
        // try to catch any errors
        .catch(err => {throw err});
    
    return geoData.json();
}