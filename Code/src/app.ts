window.CANNON = require('cannon');      // physics plugin from the window
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { BasicScene } from "./components/BasicScene";
import * as BABYLON from "@babylonjs/core";
import { createController } from "./components/FirstPersonController";
import * as LOADINGSCREEN from "./components/LoadingScreen";

/*
*   Author: Kyle Dick
*   Date of Last Edit: 09/03/2022
*
*   This is the file which initiates the application and compiles the 
*   functions from the rest of the project
*
*   This was created as a part of a 4th Year Disseration Project in Software Engineering with Heriot-Watt University.
*/

class App {
    canvas: HTMLCanvasElement;
    basicScene: BasicScene;

    constructor() {
        // start loading while the app loads
        var initialLoadScreen = this.startLoading("Generating World");
        // create a new canvas which will hold the scene
        this.canvas = this.createCanvas();
        // create the scene
        this.basicScene = new BasicScene(this.canvas);
        // create camera controller for first person
        createController(this.basicScene.scene);
        // loading finished
        initialLoadScreen.hideLoadingScreen();
    }

    /**
     * Creates a canvas html element then appends it to the scene.
     * @returns new canvas object
     */
    private createCanvas() {
        var canvas = document.createElement("canvas");
        canvas.style.width = "50%";    // make the canvas fit the entire screen
        canvas.style.height = "50%";
        canvas.id = "mainCanvas";
        document.body.appendChild(canvas);
        return canvas;
    }

    /**
     * Creates a new loading screen with the desired text
     * @param text 
     * @returns 
     */
    private startLoading(text : string) : LOADINGSCREEN.LoadingScreen {
        var loadingscreen = new LOADINGSCREEN.LoadingScreen(text);
        loadingscreen.displayLoadingScreen();
        return loadingscreen;
    }
}

new App();