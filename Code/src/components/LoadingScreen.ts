/*
*   Author: Kyle Dick
*   Date of Last Edit: 08/03/2022
*
*   This file manages the loading screen which is displayed while a scene is loading
*
*   This was created as a part of a 4th Year Disseration Project in Software Engineering with Heriot-Watt University.
*/

interface ILoadingScreen {
    // while loading in process
    DisplayLoadingScreen: () => void;
    // when loading is done
    HideLoadingScreen: () => void;
}

export class LoadingScreen implements ILoadingScreen {

    constructor(public LoadingUIText: string) {}

    public DisplayLoadingScreen() {
        alert(this.LoadingUIText);
    }

    public HideLoadingScreen() {
        alert("loaded");
    }
}