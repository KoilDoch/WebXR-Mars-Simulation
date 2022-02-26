window.CANNON = require('cannon');      // without this line it will not compile ¯\_(ツ)_/¯
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import * as BABYLON from "@babylonjs/core";
import * as Enviroment from "./terrain";
import * as ShapeFactory from "./shapes";

/**
 * This file sets up the scene for development
 */

class App {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _viewport: BABYLON.ArcRotateCamera;
    private _lightSource: BABYLON.HemisphericLight;

    constructor() {
        // create a new canvas which will hold the scene
        this._canvas = this.createCanvas();

        // initialize babylon scene and engine
        this._engine = new BABYLON.Engine(this._canvas, true);
        this.createScene();
        this._lightSource = this.createHemiLight();

        // create a box to test the physics
        var box = ShapeFactory.createBox(this._scene);
        var ball = ShapeFactory.createSphere(this._scene);

        // run the render loop
        this._engine.runRenderLoop( () => {
            this._scene.render();
        })
    }

    /**
     * Sets up a new arc camera which is attached to the current scene
     */
     private createArcCamera() {
        var camera = new BABYLON.ArcRotateCamera("ViewPort", Math.PI/4, Math.PI/3, 8, new BABYLON.Vector3(50, 50, 50), this._scene);
        camera.attachControl(this._canvas, true);

        return camera;
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
     * Creates a scecne object based on the current engine
     * @returns new scene
     */
    private async createScene() {
        this._scene = new BABYLON.Scene(this._engine);
        this._scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);  // set scene color to black
        this._viewport = this.createArcCamera();    // set up a camera for user to view

        // set up the physics 
        //var gravityVector = new BABYLON.Vector3(0, -9.81, 0); // mars gravity is 3.71m/s to surface, earth is 9.81
        //var physicsPlugin = new BABYLON.CannonJSPlugin();

        //this._scene.enablePhysics(gravityVector, physicsPlugin);

        // create the ground
        Enviroment.createGround(this._scene);
    }
}

new App();