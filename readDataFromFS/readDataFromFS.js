import fs from 'fs';

import getSymbolAndPath from './getSymbolAndPath.js';


let dataArr = [];

export default function getDataOfSymbols(pathFile) {
	let symbolsArr = getSymbolAndPath(pathFile);
	symbolsArr.forEach(symbol => {
		let data = readCSVFileSync(symbol.path);
		let result={symbol:symbol.name,data}
		dataArr.push(result);
	})
	
	return dataArr;
}
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