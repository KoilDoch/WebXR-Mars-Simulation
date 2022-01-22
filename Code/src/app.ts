import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {Color4, Engine, MeshBuilder, Scene} from "@babylonjs/core";

/**
 * This file sets up the scene for development
 */

class App {
    private _canvas: HTMLCanvasElement;
    private _engine: Engine;
    private _scene: Scene;

    constructor() {
    
        // create a new canvas which will hold the scene
        this._canvas = this.createCanvas();

        // initialize babylon scene and engine
        this._engine = new Engine(this._canvas, true);
        this._scene = this.createScene();

        var box = this.createBox();

        // run the render loop
        this._engine.runRenderLoop( () => {
            this._scene.render();
        })
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

    private createScene() {
        var scene = new Scene(this._engine);
        scene.clearColor = new Color4(0, 0, 0, 1);

        return scene;
    }
}

new App();