import express from 'express';
import { config } from "dotenv";
import { createPluginsInstances } from './controllers/createPluginsIntances.js'
import runPlugins from './controllers/executePlugins.js';
import cron from 'node-cron';
import returnData from './adapters/getTikers/testFSAdapter.js';
import tickerRouter from './routes/tickers.js';
import cors from 'cors';


config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/tickers",tickerRouter);


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
