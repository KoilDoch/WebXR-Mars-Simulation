import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {ArcRotateCamera, Color3, Color4, Engine, HemisphericLight, MeshBuilder, Scene, Vector3} from "@babylonjs/core";
import { Environment } from "./environment";

/**
 * This file sets up the scene for development
 */

class App {
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _scene: Scene;
    private _viewport: ArcRotateCamera;
    private _lightSource: HemisphericLight;
    private _xr;
    private _environment;

    constructor() {
    
        // create a new canvas which will hold the scene
        this._canvas = this.createCanvas();

        // initialize babylon scene and engine
        this._engine = new Engine(this._canvas, true);
        this._scene = this.createScene();
        this._lightSource = this.createHemiLight();

        var box = this.createBox();

        // run the render loop
        this._engine.runRenderLoop( () => {
            this._scene.render();
        })
    }

    /**
     * Sets up a new arc camera which is attached to the current scene
     */
     private createArcCamera() {
        var camera = new ArcRotateCamera("ViewPort", Math.PI/4, Math.PI/3, 8, new Vector3(0, 0, 0), this._scene);
        camera.attachControl(this._canvas, true);

        return camera;
    }

    /**
     * Creates a box mesh 
     */
    private createBox() {
        var box = MeshBuilder.CreateBox("box", {});
        box.position.x = 0.5;
        box.position.y = 1;

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
        var light = new HemisphericLight("light", new Vector3(10, 1, 0), this._scene);

        return light;
    }

    /**
     * Creates a scecne object based on the current engine
     * @returns new scene
     */
    private createScene() {
        var scene = new Scene(this._engine);
        scene.clearColor = new Color4(0, 0, 0, 1);  // set scene color to black
        this._viewport = this.createArcCamera();    // set up a camera for user to view

        // set up xr support
        this._xr = scene.createDefaultXRExperienceAsync({});

        // set up the environment
        this._environment = new Environment(this._scene);
        this._environment.loadGround();   // waits for a promise to return once the ground is loaded
        // this._environment = scene.createDefaultEnvironment({
        //     createGround: false,
        //     // enableGroundMirror: true,
        //     // groundSize: 225,   // create a large environment
        //     // groundColor: new Color3(0.8, 0.5, 0.8), // sets the ground color to differentiate between skybox
        //     skyboxSize: 225,
        // });

        return scene;
    }
}

new App();