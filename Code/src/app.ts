window.CANNON = require('cannon');      // without this line it will not compile ¯\_(ツ)_/¯
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";
import * as ENVIRONMENT from "./Environment";
import * as SHAPEFACTORY from "./Shapes";
import * as XRSUPPORT from "./XRController";
import * as CONTROLLER from "./FirstPersonController";

/**
 * This file sets up the scene for development
 */

class App {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _viewport: BABYLON.FreeCamera;
    private _lightSource: BABYLON.HemisphericLight;

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

    /**
     * Create physics in the current scene
     * @param scene 
     */
    private createPhysics(scene) {
        var gravityVector = new BABYLON.Vector3(0, -3.71, 0); // mars gravity is 3.71m/s to surface, earth is 9.81
        var physicsPlugin = new BABYLON.CannonJSPlugin();
        
        scene.gravity = gravityVector;
        scene.enablePhysics(scene.gravity, physicsPlugin);

        scene.collisionsEnabled = true;
        scene.workerCollisions = true;
    }

    private async createEnvironment(scene) {
        ENVIRONMENT.createGround(scene);

        // create objects requiring a physics imposter
        var box = SHAPEFACTORY.createBox(scene);
        var ball = SHAPEFACTORY.createSphere(scene);
    }

    /**
     * Creates a scecne object based on the current engine
     * @returns new scene
     */
    private createScene(): BABYLON.Scene {
        var scene = new BABYLON.Scene(this._engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);  // set scene color to black
        this.createPhysics(scene);
        this._viewport = CONTROLLER.createController();
        XRSUPPORT.initialiseXR(scene);

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
        
        

        return scene;
    }
}

new App();