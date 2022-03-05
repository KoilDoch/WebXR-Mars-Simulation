window.CANNON = require('cannon');      // physics plugin from the window
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";
import * as ENVIRONMENT from "./Environment";
import * as SHAPEFACTORY from "./Shapes";
import * as XRSUPPORT from "./XRController";
import * as CONTROLLER from "./FirstPersonController";

/*
*   Author: Kyle Dick
*   Date of Last Edit: 04/03/2022
*
*   This is the file which initiates the application and compiles the 
*   functions from the rest of the project
*
*   This was created as a part of a 4th Year Disseration Project in Software Engineering with Heriot-Watt University.
*/

class App {
    private _canvas: HTMLCanvasElement;     // 
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _viewport: BABYLON.FreeCamera;
    private _lightSource: BABYLON.HemisphericLight;
    private _environment: BABYLON.EnvironmentHelper;
    private _ground: BABYLON.GroundMesh;

    constructor() {
        // create a new canvas which will hold the scene
        this._canvas = this.createCanvas();

        // initialize babylon scene and engine
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._scene = this.createScene();
        // create the environment
        this.createEnvironment(this._scene);

        this._lightSource = this.createHemiLight();

        // run the render loop
        this._engine.runRenderLoop( () => {
            this._scene.render();
        })
    }

    /**
     * Creates a canvas html element then appends it to the scene.
     * @returns new canvas object
     */
    private createCanvas() {
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";    // make the canvas fit the entire screen
        canvas.style.height = "100%";
        canvas.id = "mainCanvas";
        document.body.appendChild(canvas);

        return canvas;
    }

     /**
     * Adds a hemispheric light to the scene
     */
    private createHemiLight() {
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(10, 1, 0), this._scene);

        return light;
    }

    private async createEnvironment(scene) {
        ENVIRONMENT.createEnvironment(scene).then(res => {
            XRSUPPORT.initialiseXR(scene, this._environment);
        });
        // create objects requiring a physics imposter
        var box = SHAPEFACTORY.createBox(scene);
        var ball = SHAPEFACTORY.createSphere(scene);
    }

    /**
     * Creates a scecne object based on the current engine
     * @returns new scene
     */
    private createScene(): BABYLON.Scene {
        // create the scene 
        var scene = new BABYLON.Scene(this._engine);
        scene.debugLayer.show({
            embedMode: true,
          });
        
        scene.clearColor = new BABYLON.Color4(0,0,0,1);

        // enable collisions
        scene.collisionsEnabled = true;
        // create the non-vr controller
        this._viewport = CONTROLLER.createController(scene);

        // implement ability to lock pointer so first person view is easier to move
        scene.onPointerDown = (event) => {
            switch(event.button){
                case 0:
                    console.log("click");
                    this._engine.enterPointerlock();
                    break;
                case 1:
                    this._engine.exitPointerlock();
                    break;
                default:
                    break;
            }
        }

        // create the physics components
        var gravityVector = new BABYLON.Vector3(0, -3.71, 0); // mars gravity is 3.71m/s to surface, earth is 9.81
        var physicsPlugin = new BABYLON.CannonJSPlugin();
        
        // gravity is set to a value that accounts for the desired frame rate
        // this allows smooth head movement
        scene.gravity = new BABYLON.Vector3(0, -3.71 / 60 , 0);
        scene.enablePhysics(gravityVector, physicsPlugin);

        return scene;
    }
}

new App();