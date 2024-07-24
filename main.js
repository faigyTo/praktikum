import express from 'express';
import {config} from "dotenv";
import {createPluginsInstances} from './controllers/createPluginsIntances.js'
import  runPlugins  from './controllers/executePlugins.js';
import cron from 'node-cron';
import csvRead from 'csv-parser';
import fs from 'fs';


config();
const app = express();
app.use(express.json());
// connectToDB('select * from Pokemons_tbl');


function readCSVFileSync(filePath) {
	try {
		let first = "Date,Open,Low,High,Close,AdjClose,Volume";
		const fileData = fs.readFileSync(filePath, 'utf8');
		let data = fileData.split("\n").filter(row => row != "");
		let ret = data.map(row => row.split(",")
			.reduce((acc, field, index) => {
				return {
					...acc, [first.split(",")[index]]: index == 0 ?
						new Date(field) : parseFloat(field)
				}
			}, {}))
		return ret;


	} catch (error) {
		console.error('Error reading CSV file synchronously:', error);
		throw error;
	}
}

// createPluginsInstances();
let instanes=await createPluginsInstances();
// console.log(instanes);
// cron.schedule("0 0 * * *",()=>{
//     runPlugins(instanes);
// })
let data=readCSVFileSync('./A.csv');
runPlugins(data,instanes);



app.listen(5000, () => {
    console.log("App is listening on port 5000");
});
