import config from "../adapterConfig.json" assert {"type": "json"};

async function importAdapter(adapterPath) {
	return await import(adapterPath);
}


export default async function connectAndSave(type, symbol, date, high, low,open, close, volume) {
	const adapterModule = await importAdapter(config.connection.adapter);
	const IConnection = adapterModule.default;
	const connection = new IConnection(config.connection.connectionString);
	connection.saveNotification(type, symbol, date, high, low,open, close, volume);
}