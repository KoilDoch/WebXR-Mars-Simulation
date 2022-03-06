/**
 * This file is used to configure the webpack dependency.
 * Configuration taken from https://doc.babylonjs.com/guidedLearning/createAGame/gettingSetUp#creating-a-project
 */

const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    // path to the main typescript file
    entry: path.resolve(appDirectory, "src/app.ts"),
    // name for js file created/compiled in the memory
    output: {
        filename: "js/bundleName.js",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devServer: {
        host: "0.0.0.0",
        port: 8080, // port for local host (localhost:8080)
        static: path.resolve(appDirectory, "public"),   // tell webpack to serve from the public folder
        hot: true,
        devMiddleware: {
            publicPath: "/",
        }
    },
    module: {
        rules: [
            {   // import for the typescript files
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            },
            {   // import for the image files
                test: /\.(png|svg|jpg|jpeg|gif|ico|geojson)$/i,
                use: ['file-loader']
            },
            {   // import for the json files
                test: /\.(json|geojson)$/i,
                use: ['json-loader']
            }
        ]
    },
    plugins: [
        // injects the favicon import into final web page
        new HtmlWebpackPlugin({
            favicon: "src/assets/images/favicon.ico",
            inject: true,
            template: path.resolve(appDirectory,
                "public/index.html")
        }),
        new CopyWebpackPlugin({
            patterns: [
                // copies the required babylon extension into the production folder
              { from: "public/babylon.dynamicTerrain.min.js", to: "../dist" },
            ],
          })
    ],
    mode: "development"
};