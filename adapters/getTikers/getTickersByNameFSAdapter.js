import getDataOfSymbols from "../../readDataFromFS/readDataFromFS.js";

export default function getTickersByNameFSAdapter(config){

	this.getSymbols=()=>{
		let data=getDataOfSymbols(config);
		return data;
	}
}