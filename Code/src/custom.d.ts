/*
*   Author: Kyle Dick
*   Date of Last Edit: 02/03/2022
*
*   This file allows for file extensions to be processed by the rest of the application
*
*   This was created as a part of a 4th Year Disseration Project in Software Engineering with Heriot-Watt University.
*/

declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.ico";
declare module "*.geojson" {
    const value: any;
    export default value;
}