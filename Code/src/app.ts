import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {Color4, Engine, MeshBuilder, Scene} from "@babylonjs/core";

/**
 * This file sets up the scene for development
 */

class App {
    constructor() {
        // create a new canvas which will hold the scene
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";    // make the canvas fit the entire screen
        canvas.style.height = "100%";
        canvas.id = "mainCanvas";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);
        scene.clearColor = new Color4(0, 0, 0, 1);

        var box = this.createBox();

        // run the render loop
        engine.runRenderLoop( () => {
            scene.render();
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
}

new App();