import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// In ES6 modules, you don't have direct access to '__filename' and '__dirname'
// (which are available in CommonJS modules using 'require').
// Instead, you use 'import.meta.url' to get the current module’s URL, and then convert it to a file path using 'fileURLToPath'.

const __filename = fileURLToPath(import.meta.url);        // save the URL of this file as a standard file path string 
const __dirname = path.dirname(__filename);               // get directory name of this file
const pluginsDir = path.join(__dirname, '../services/plugins');



export async function createPluginsInstances() {
    try {
        const directories = fs.readdirSync(pluginsDir, { withFileTypes: true })// save all the sub-directories name
            .filter(dir => dir.isDirectory())
            .map(dirent => dirent.name);

        const pluginsInfo = []; // initilize arr to the js files imports

        for (const dir of directories) {
            const jsFile = fs.readdirSync(path.join(pluginsDir, dir)) // save the js file of the current plugin
                .find(file => path.extname(file) === '.js');

            const filePath = path.join(pluginsDir, dir, jsFile); //save the path to the current js-plugin-file
            const plugin = await import(pathToFileURL(filePath)); //import the js file

            let newPlugin = {
                name: dir,
                instance: new plugin.default()
            }
            pluginsInfo.push(newPlugin);

        }
        console.log(pluginsInfo, "pluginInfo");
        return pluginsInfo;

    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}


