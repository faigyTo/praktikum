
import pluginsArr from '../services/plugins/config.json' assert {'type':"json"};
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// In ES6 modules, you don't have direct access to '__filename' and '__dirname'
// (which are available in CommonJS modules using 'require').
// Instead, you use 'import.meta.url' to get the current module’s URL, and then convert it to a file path using 'fileURLToPath'.

const __filename = fileURLToPath(import.meta.url);        // save the URL of this file as a standard file path string 
const __dirname = path.dirname(__filename);               // get directory name of this file
const pluginsDir = path.join(__dirname, '../services/plugins');
export default function tryFunc() {                       // Read all files in the plugins directory
    createPluginsInstances().then(pluginsInfo => console.log(pluginsInfo));
    // try {
    //     let pluginsFiles = fs.readdirSync(pluginsDir);
    //     pluginsFiles.forEach(async (fileName) => {       // Loop through all the files
    //         if (path.extname(fileName) === '.js') {      // Make sure we only require JavaScript files
    //             let notification = await importAndRunExecuteFunction(fileName);
    //             console.log(notification);
    //         } else {
    //             // להעביר את הקובץ לתיקייה של פלאגינים לא תקינים
    //         }
    //     });
    // } catch (err) {
    //     console.log(`Error: ${err.message}`);
    // }
}

async function importAndRunExecuteFunction(fileName) {
    try {
        let pathToPlugin = path.join(pluginsDir, fileName);
        let classFile = await import(pathToFileURL(pathToPlugin));
        let baseName = path.parse(pathToPlugin).name;        // Get the base name of the file (without extension)
        console.log(classFile.default);                      // Print the default export
        if (typeof classFile.default === 'function' && classFile.default.name === baseName) {// Check if the default export is a class and if it has the expected name
            console.log('Class found:', classFile.default.name);
            const instance = new classFile.default(data, params);// Create an instance of the class

            // Check if the instance has a method named 'execute'
            if (typeof instance.execute === 'function') {
                console.log('The class contains an execute method.');
                // You can run the execute method if you want
                instance.execute();
            } else {
                console.error(`Class ${baseName} does not have an execute method.`);
                // להעביר את הקובץ לתיקייה של פלאגינים לא תקינים

            }
        } else {
            console.error(`Plugin ${fileName} does not export a class named ${baseName}.`);
            // להעביר את הקובץ לתיקייה של פלאגינים לא תקינים
        }
    } catch (err) {
        console.error(`Error loading plugin ${fileName}:`, err);
    }
}

// function getAllDirectories() {
//     try {

//         let allDirectories = fs.readdirSync(pluginsDir);  //get all the items from pluinsDir 
//         let pluginsDirectories = allDirectories.filter((dirName) => {  // filter only for directories
//             let fullPath = path.join(pluginsDir, dirName);
//             return fs.lstatSync(fullPath).isDirectory();
//         });

//         let imports = pluginsDirectories.map(async (dirName) => { // iterable on the plugins folders
//             let fullPath = path.join(pluginsDir, dirName);        // create the full path to the current plugin folder
//             let currentDirItems = fs.readdirSync(fullPath);       // save all the items from the current plugin folder
//             let pluginJs = currentDirItems.find(file => path.extname(file) === '.js')  // find from the items only the js file 
//             let pluginJsPath = path.join(fullPath, pluginJs)     //save the path for the js plugin-file
//             let x = await import(pathToFileURL(pluginJsPath))    // import the js file
//             // console.log(x);
//             return x;
//         })

//         imports.forEach((dirName) => {
//             console.log(dirName);
//         });
//     }

//     catch (err) {
//         console.log(`error in readDir : ${err.message}`);
//     }
// }


async function createPluginsInstances() {
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
            let i=pluginsArr.findIndex(item=>Object.keys(item)==dir)
            let item=i!=-1?pluginsArr[i]:undefined;
            let pluginkey=Object.keys(item);
            let pluginValue=item[Object.keys(item)];
            console.log(i);
            console.log(item,"xxxxx");
            console.log(pluginValue[Object.keys(pluginValue)]);
            let newPlugin = {
                name: dir,
                instance: new plugin.default(pluginValue[Object.keys(pluginValue)])
            }

            pluginsInfo.push(newPlugin);
        }
        return pluginsInfo;
        // const pluginsInfoPromises = directories.map(async (dir) => {
        //     const files = fs.readdirSync(path.join(pluginsDir, dir))
        //         .filter(file => path.extname(file) === '.js');

        //     const importPromises = files.map(async (file) => {
        //         const filePath = path.join(pluginsDir, dir, file);
        //         const plugin = await import(pathToFileURL(filePath));

        //         return {
        //             name: dir,
        //             import: plugin
        //         };
        //     });
        //     console.log(importPromises);

        //     return Promise.all(importPromises);
        // });
        // const pluginsInfo = await Promise.all(pluginsInfoPromises);
        // return pluginsInfo; // Flatten the array of arrays


    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
}


