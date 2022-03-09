window.CANNON = require('cannon');      // physics plugin from the window
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { BasicScene } from "./components/BasicScene";
import { CreateController } from "./components/FirstPersonController";
import { LoadingScreen } from "./components/LoadingScreen";
import { CreateBox, CreateSphere } from "./components/Shapes";

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
        var initialLoadScreen = this.StartLoading("Generating World");
        // create a new canvas which will hold the scene
        this.canvas = this.createCanvas();
        // create the scene
        this.basicScene = new BasicScene(this.canvas);
        // create camera controller for first person
        CreateController(this.basicScene.scene);
        // create some objects to test physics
        this.CreateObjectsInScene();
        // loading finished
        initialLoadScreen.HideLoadingScreen();
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
    private StartLoading(text : string) : LoadingScreen {
        var loadingscreen = new LoadingScreen(text);
        loadingscreen.DisplayLoadingScreen();
        return loadingscreen;
    }

    private CreateObjectsInScene() {
        CreateBox(this.basicScene.scene);
        CreateSphere(this.basicScene.scene);
    }
}

new App();