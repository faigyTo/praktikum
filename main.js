import express from 'express';
import { config } from "dotenv";
import { createPluginsInstances } from './controllers/createPluginsIntances.js'
import runPlugins from './controllers/executePlugins.js';
import cron from 'node-cron';
import returnData from './adapters/getTikers/testFSAdapter.js';



config();
const app = express();
app.use(express.json());
// connectToDB('select * from Pokemons_tbl');




// createPluginsInstances();
let instanes = await createPluginsInstances();
// console.log(instanes);
// cron.schedule("0 0 * * *",()=>{
//     runPlugins(instanes);
// })
let data =await returnData();
data.forEach(item=>{
	let {symbol,data}=item;
	runPlugins(symbol,data, instanes);
})




app.listen(5000, () => {
	console.log("App is listening on port 5000");
});
