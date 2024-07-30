import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


export default function getSymbolAndPath(pathFile) {
	const __filename = fileURLToPath(import.meta.url);        // save the URL of this file as a standard file path string 
	const __dirname = path.dirname(__filename);               // get directory name of this file
	const dataDir = path.join(__dirname, pathFile);
	

	const files = fs.readdirSync(dataDir, { withFileTypes: true })
	let symbolsArr=[];
	for (const file of files){
		const filePath = path.join(dataDir, file.name);
		const fileName = path.parse(file.name).name;
		let symbolObj={name:fileName,path:filePath};
		symbolsArr.push(symbolObj);
	}
	return symbolsArr;
}