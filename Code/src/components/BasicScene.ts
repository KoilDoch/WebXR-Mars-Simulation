import {CannonJSPlugin, Color4, Engine, HemisphericLight, Mesh, Scene, Vector3} from "@babylonjs/core";
import { CreateEnvironment } from "./Environment";
import { InitialiseXR } from "./XRController";

/*
*   Author: Kyle Dick
*   Date of Last Edit: 09/03/2022
*
*   This file holds a class for creating the basic scene
*
*   This was created as a part of a 4th Year Disseration Project in Software Engineering with Heriot-Watt University.
*/

export class BasicScene {
    // fields
    scene : Scene;
    engine: Engine;
    light: HemisphericLight;
    terrain: Mesh

   /**
    * Constructor for the BasicScene class
    */
    constructor(private canvas:HTMLCanvasElement) {
        // true param == antialiasing for smooth edges
        this.engine = new Engine(canvas, true);
        this.CreateScene();

        // render loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        })
    }

    /**
     * @description Creates and returns a new scene object using the engine field
     * @returns Newly created Scene object
     */
    private CreateScene() {
        // local var to hold new scene object
        this.scene = new Scene(this.engine);
        // add light to scene
        this.CreateHemiLight();
        // assign options
        this.SceneOptions();
        // add physics
        this.InitialisePhysics(new Vector3(0,-3.71, 0), new CannonJSPlugin());
        // create the terrain
        this.CreateGround();
        // create XR default experience
        //InitialiseXR(this.scene);
    }

    /**
     * @description Creates a hemispheric light object.
     * The light points straight downwards
     * @param scene 
     */
    private CreateHemiLight() {
        this.light = new HemisphericLight(
            "hemiLight", 
            new Vector3(0,1,0), 
            this.scene
        )

        // light brightness
        this.light.intensity = 0.5;
    }

    private async CreateGround() {
        const dynamicTerrain = await CreateEnvironment(this.scene);
        console.log(dynamicTerrain);
        //this.terrain = dynamicTerrain.mesh;
    }

    /**
     * @description Initialises physics in the scene
     * @param gravityVector The direction and velocity of gravity
     * @param physicsPlugin cannonjs physics plugin
     */
    private InitialisePhysics(gravityVector : Vector3, physicsPlugin : CannonJSPlugin) {
        // gravity is set to a value that accounts for the desired frame rate
        // this allows smooth head movement
        this.scene.gravity = gravityVector;
        this.scene.enablePhysics(gravityVector, physicsPlugin);
    }

    /**
     * @description This configures options for the scene
     * @param scene 
     */
    private SceneOptions() {
        // set background to black
        this.scene.clearColor = new Color4(0,0,0,1);
        this.scene.collisionsEnabled = true;
        // set the screen lock
        this.ScreenLock();
    }

    /**
     * @description Locks the cursor when the scene is clicked on.
     * Results in first person view being easier to move
     * @param scene 
     */
    private ScreenLock() {
        this.scene.onPointerDown = (event) => {
            switch(event.button){
                case 0:     // left click, lock
                    this.engine.enterPointerlock();
                    break;
                case 1:     // right click, unlock
                    this.engine.exitPointerlock();
                    break;
                default:
                    break;
            }
        }
    }
}