import express from 'express';
import tryFunc from './controllers/createPluginsIntances.js';
// import {connectToDB} from './config/DBConfig.js'
import {config} from "dotenv";
import createPluginsInstances from './controllers/createPluginsIntances.js'
import { runPlugins } from './controllers/executePlugins.js';



config();
const app = express();
app.use(express.json());
// connectToDB('select * from Pokemons_tbl');

// runPlugins();
// createPluginsInstances();
tryFunc();

app.listen(5000, () => {
    console.log("App is listening on port 5000");
});
