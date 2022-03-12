import {CannonJSPlugin, Color4, Engine, HemisphericLight, Mesh, PhysicsImpostor, Scene, Vector3, WebXRDefaultExperience} from "@babylonjs/core";
import { CreateEnvironment } from "./Environment";
import { LoadingScreen } from "./LoadingScreen";
import { XRSetup } from "./XRSupport";
import { CreateController } from "./FirstPersonController";

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
    terrain;
    ground : Mesh;
    initialLoadScreen : LoadingScreen;
    xrSupport;

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
        // display load screen while the app loads
        this.initialLoadScreen = this.StartLoading("Generating World");

        // local var to hold new scene object
        this.scene = new Scene(this.engine);
        // create camera controller for first person
        CreateController(this.scene);
        // add light to scene
        this.CreateHemiLight();
        // assign options
        this.SceneOptions();
        // add physics
        this.InitialisePhysics(new CannonJSPlugin());
        // create the terrain
        this.CreateGround();
        // set up the xr capabilities
        this.SetupXR();
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
        this.terrain = await CreateEnvironment(this.scene);
        console.log(this.terrain);
        this.ground = this.terrain['mesh'];
        // loading finished
        this.initialLoadScreen.HideLoadingScreen();
    }

    /**
     * @description Initialises physics in the scene
     * @param gravityVector The direction and velocity of gravity
     * @param physicsPlugin cannonjs physics plugin
     */
    private InitialisePhysics(physicsPlugin : CannonJSPlugin) {
        // gravity is set to a value that accounts for the desired frame rate
        let framesPerSecond = 60;
        let gravity = -3.71;
        // this allows smooth head movement
        this.scene.gravity = new Vector3(0, gravity / framesPerSecond, 0);
        this.scene.collisionsEnabled = true;
        //this.scene.enablePhysics(new Vector3(0,-3.71 / 60, 0), physicsPlugin);
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

    private async SetupXR() {
        // initialise XR support
        this.xrSupport = await XRSetup(this.scene, this.ground);
        
    }

    /**
     * Creates a new loading screen with the desired text
     * @param text 
     * @returns 
     */
     private StartLoading(text : string) : LoadingScreen {
        var loadingscreen = new LoadingScreen(text);
        loadingscreen.DisplayLoadingScreen();
        return loadingscreen;
    }
}