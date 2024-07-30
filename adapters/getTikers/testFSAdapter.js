import config from "../config.json" assert {"type": "json"};
//import getTickersByNameFSAdapter from "../getTickersByNameFSAdapter.js";

async function importAdapter(adapterPath) {
	return await import(adapterPath);
}


export default async function returnData() {
	const adapterModule = await importAdapter(config.tickers.adapter);
	const Itickers = adapterModule.default;
	const tickers = new Itickers(config.tickers.path);
	let Data = tickers.getSymbols();
	return Data;
}